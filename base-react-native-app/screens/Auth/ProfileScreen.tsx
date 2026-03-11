import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useColorScheme,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useRouter } from "expo-router";
import { Colors } from '@/constants/theme';
import { Avatar } from '@/components/avatar';
import { InfoRow } from '@/components/infoRow';
import { APP_URLS } from "@/constants/Urls";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (!user) return null;

  return (
    <View style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={[styles.backButton, { backgroundColor: theme.accentSoft }]}
          >
            <Text style={[styles.backArrow, { color: theme.accent }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.textSecondary }]}>
            PROFILE
          </Text>
          <View style={[styles.headerRule, { backgroundColor: theme.accent }]} />
        </View>

        {/* ── Avatar + Name ── */}
        <View style={styles.heroSection}>
          <Avatar uri={ APP_URLS.IMAGES_400_URL + user.image || undefined} name={user.name} theme={theme} />

          <Text style={[styles.userName, { color: theme.text }]}>
            {user.name}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user.email}
          </Text>

          {/* Subtle decorative dot row */}
          <View style={styles.dotRow}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === 1 ? theme.accent : theme.border,
                    width: i === 1 ? 8 : 5,
                    height: i === 1 ? 8 : 5,
                  },
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── Info Card ── */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
              shadowColor: theme.shadow,
            },
          ]}
        >
          <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>
            ACCOUNT DETAILS
          </Text>
          <InfoRow label="Full name" value={user.name} theme={theme} />
          <InfoRow label="Email" value={user.email} theme={theme} last />
        </View>

        {/* ── Logout ── */}
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {
              backgroundColor: theme.logoutBg,
              borderColor: theme.logoutBorder,
            },
          ]}
          onPress={handleLogout}
          activeOpacity={0.75}
        >
          <View style={[styles.logoutIcon, { backgroundColor: theme.accentSoft }]}>
            <Text style={{ color: theme.logoutText, fontSize: 14 }}>↪</Text>
          </View>
          <Text style={[styles.logoutText, { color: theme.logoutText }]}>
            Sign out
          </Text>
        </TouchableOpacity>

        {/* ── Footer stamp ── */}
        <Text style={[styles.footerStamp, { color: theme.border }]}>
          UID · {user.id}
        </Text>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 48,
  },

  // Header
  header: {
    marginBottom: 36,
  },
  backButton: {
    alignSelf: 'flex-start',
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  backArrow: {
    fontSize: 18,
    lineHeight: 20,
  },
  headerTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
    marginBottom: 8,
  },
  headerRule: {
    width: 28,
    height: 2,
    borderRadius: 1,
  },

  // Hero
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 4,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 14,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 16,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    borderRadius: 4,
  },

  // Card
  card: {
    borderRadius: 16,
    borderWidth: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 4,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
    marginBottom: 32,
  },
  logoutIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // Footer
  footerStamp: {
    textAlign: 'center',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '500',
  },
});
