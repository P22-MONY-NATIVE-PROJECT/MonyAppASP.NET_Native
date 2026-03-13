import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/authSlice';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Avatar } from '@/components/avatar';
import { InfoRow } from '@/components/infoRow';
import { APP_URLS } from '@/constants/Urls';
import { profileStyles as s } from '@/styles/profileStyles';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? Colors.dark : Colors.light;
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  if (!user) return null;

  return (
    <View style={[s.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View style={s.headerNav}>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={[s.navButton, { backgroundColor: theme.accentSoft }]}>
              <Text style={[s.backArrow, { color: theme.accent }]}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/edit-profile')} activeOpacity={0.7} style={[s.navButton, { backgroundColor: theme.accentSoft }]}>
              <Text style={[s.backArrow, { color: theme.accent }]}>✎</Text>
            </TouchableOpacity>
          </View>
          <Text style={[s.headerTitle, { color: theme.textSecondary }]}>PROFILE</Text>
          <View style={[s.headerRule, { backgroundColor: theme.accent }]} />
        </View>

        {/* Avatar + Name */}
        <View style={s.heroSection}>
          <Avatar uri={APP_URLS.IMAGES_400_URL + user.image || undefined} name={user.name} theme={theme} />
          <Text style={[s.userName, { color: theme.text }]}>{user.name}</Text>
          <Text style={[s.userEmail, { color: theme.textSecondary }]}>{user.email}</Text>
          <View style={s.dotRow}>
            {[0, 1, 2].map(i => (
              <View key={i} style={[s.dot, { backgroundColor: i === 1 ? theme.accent : theme.border, width: i === 1 ? 8 : 5, height: i === 1 ? 8 : 5 }]} />
            ))}
          </View>
        </View>

        {/* Info Card */}
        <View style={[s.card, { backgroundColor: theme.surface, borderColor: theme.border, shadowColor: theme.shadow }]}>
          <Text style={[s.cardLabel, { color: theme.textSecondary }]}>ACCOUNT DETAILS</Text>
          <InfoRow label="Full name" value={user.name} theme={theme} />
          <InfoRow label="Email" value={user.email} theme={theme} last />
        </View>

        {/* Logout */}
        <TouchableOpacity style={[s.logoutButton, { backgroundColor: theme.logoutBg, borderColor: theme.logoutBorder }]} onPress={() => dispatch(logout())} activeOpacity={0.75}>
          <View style={[s.logoutIcon, { backgroundColor: theme.accentSoft }]}>
            <Text style={{ color: theme.logoutText, fontSize: 14 }}>↪</Text>
          </View>
          <Text style={[s.logoutText, { color: theme.logoutText }]}>Sign out</Text>
        </TouchableOpacity>

        <Text style={[s.footerStamp, { color: theme.border }]}>UID · {user.id}</Text>
      </ScrollView>
    </View>
  );
}
