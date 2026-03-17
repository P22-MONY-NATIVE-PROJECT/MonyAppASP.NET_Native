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

export const InfoRow = ({
  label,
  value,
  theme,
  last,
}: {
  label: string;
  value: string;
  theme: typeof lightTheme;
  last?: boolean;
}) => (
  <View
    style={[
      styles.infoRow,
      !last && { borderBottomWidth: 1, borderBottomColor: theme.divider },
    ]}
  >
    <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{label}</Text>
    <Text style={[styles.infoValue, { color: theme.text }]} numberOfLines={1}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
    flexShrink: 0,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
  },
});

