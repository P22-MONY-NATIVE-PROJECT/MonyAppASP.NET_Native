import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

const createNotification = async (title: string, body: string, channel: string, id: string) => {
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

export { createNotification };