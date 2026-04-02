import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

class NotificationGenerator {
    async configureNotifications() {
        const { status } = await Notifications.requestPermissionsAsync();

        if (status !== 'granted') {
           throw new Error('PERMISSION_NOT_GRANTED');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('general_channel', {
                name: 'Загальні',
                importance: Notifications.AndroidImportance.DEFAULT,
            });
        }

        return status;
    }

    async createNotification(title: string, body: string, channel: string, id?: string) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                ...( { android: { channelId: channel } } as any),
            },
            trigger: null,
            identifier: id,
        });
    }

    async clearAll() {
        await Notifications.dismissAllNotificationsAsync();
    }
}

export default new NotificationGenerator();