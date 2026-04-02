import { ICreateNotification } from '@/types/notifications/ICreateNotification';
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

class NotificationService {
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

    async createNotification(model : ICreateNotification) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: model.title,
                body: model.body,
                ...( { android: { channelId: model.channelId } } as any),
            },
            trigger: null,
            identifier: model.id,
        });
    }

    async clearAll() {
        await Notifications.dismissAllNotificationsAsync();
    }
}

export default new NotificationService();