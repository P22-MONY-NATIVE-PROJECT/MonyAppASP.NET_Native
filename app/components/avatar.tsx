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
import { Colors } from '@/constants/theme';

const getInitials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export const Avatar = ({
  uri,
  name,
  theme,
}: {
  uri?: string;
  name: string;
  theme: typeof lightTheme;
}) => {
  const initials = getInitials(name);

  return (
    <View style={[styles.avatarWrapper, { borderColor: theme.avatarRing }]}>
      <View style={[styles.avatarRingInner, { borderColor: theme.accentSoft }]}>
        {uri ? (
          <Image source={{ uri }} style={styles.avatarImage} />
        ) : (
          <View style={[styles.avatarFallback, { backgroundColor: theme.accentSoft }]}>
            <Text style={[styles.avatarInitials, { color: theme.accent }]}>
              {initials}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarWrapper: {
    width: 108,
    height: 108,
    borderRadius: 54,
    borderWidth: 2,
    padding: 4,
    marginBottom: 20,
  },
  avatarRingInner: {
    flex: 1,
    borderRadius: 50,
    borderWidth: 1,
    overflow: 'hidden',
  },

    avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 30,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

