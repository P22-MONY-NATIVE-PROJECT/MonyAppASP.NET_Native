import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, Alert, TouchableOpacity, View, ScrollView } from 'react-native';
import * as Notifications from 'expo-notifications';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Налаштування поведінки сповіщень
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  useEffect(() => {
    configureNotifications();
  }, []);

  const configureNotifications = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    setPermissionStatus(status);
    
    if (status !== 'granted') {
      Alert.alert('Потрібен дозвіл', 'Будь ласка, дозвольте сповіщення у налаштуваннях.');
      return;
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('general_channel', {
        name: 'Загальні',
        importance: Notifications.AndroidImportance.DEFAULT,
      });

      await Notifications.setNotificationChannelAsync('messages_channel', {
        name: 'Повідомлення чату',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
      });
    }
  };

  const showSimpleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Статичне сповіщення",
        body: "Це сповіщення має фіксований ID.",
        ...( { android: { channelId: 'general_channel' } } as any),
      },
      trigger: null,
      identifier: 'fixed_id_001',
    });
  };

  const showUniqueNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Нове сповіщення",
        body: `Створено у ${new Date().toLocaleTimeString()}`,
      },
      trigger: null,
    });
  };

  const showGroupedNotifications = async () => {
    const groupKey = "com.mony.app.MESSAGES_GROUP";
    const channelId = 'messages_channel';

    for (let i = 1; i <= 3; i++) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `📩 Повідомлення #${i}`,
            body: `Текст окремого повідомлення у групі.`,
            ...({ 
              threadId: groupKey,
              android: {
                channelId: channelId,
                groupSummary: false,
                groupKey: groupKey,
              }
            } as any),
          },
          trigger: null,
        });
      }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Нові повідомлення",
        body: "У вас є кілька нових повідомлень",
        ...({ 
          threadId: groupKey,
          android: {
            channelId: channelId,
            groupSummary: true,
            groupKey: groupKey,
          }
        } as any),
      },
      trigger: null,
    });
  };

  const clearAllNotifications = async () => {
    await Notifications.dismissAllNotificationsAsync();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.header}>
          <IconSymbol name="bell.badge.fill" size={60} color={themeColors.tint} />
          <ThemedText type="title" style={styles.title}>Notification Hub</ThemedText>
          <ThemedText style={styles.subtitle}>
            Статус: {permissionStatus === 'granted' ? 'Надано' : 'Немає'}
          </ThemedText>
        </ThemedView>

        <View style={styles.cardContainer}>
          <NotificationButton 
            title="Фіксоване (ID: 1)" 
            description="Завжди замінює попереднє" 
            icon="doc.text.fill"
            onPress={showSimpleNotification}
            color="#5856D6"
          />

          <NotificationButton 
            title="Унікальне (Новий ID)" 
            description="Щоразу новий рядок" 
            icon="plus.app.fill"
            onPress={showUniqueNotification}
            color="#FF9500"
          />

          <NotificationButton 
            title="Групування (3 шт) - не працює :("
            description="Об'єднує 3 повідомлення в блок" 
            icon="square.stack.3d.up.fill"
            onPress={showGroupedNotifications}
            color="#34C759"
          />

          <TouchableOpacity 
            style={[styles.clearButton, { borderColor: themeColors.icon }]}
            onPress={clearAllNotifications}
          >
            <ThemedText style={{ color: themeColors.icon, fontWeight: '600' }}>
              Очистити все
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function NotificationButton({ title, description, icon, onPress, color }: any) {
  const colorScheme = useColorScheme() ?? 'light';
  const isDark = colorScheme === 'dark';

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF' }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <IconSymbol name={icon} size={24} color="#FFF" />
      </View>
      <View style={styles.buttonTextContent}>
        <ThemedText type="defaultSemiBold" style={styles.buttonTitle}>{title}</ThemedText>
        <ThemedText style={styles.buttonDesc}>{description}</ThemedText>
      </View>
      <IconSymbol name="chevron.right" size={18} color="#C7C7CC" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  title: {
    marginTop: 16,
    fontSize: 28,
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.6,
  },
  cardContainer: {
    gap: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  buttonTextContent: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 17,
  },
  buttonDesc: {
    fontSize: 13,
    opacity: 0.5,
    marginTop: 2,
  },
  clearButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    borderStyle: 'dashed',
  }
});