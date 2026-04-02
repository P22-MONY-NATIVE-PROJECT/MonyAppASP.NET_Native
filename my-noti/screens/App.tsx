import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Platform, PermissionsAndroid, Alert } from 'react-native';
import notifee, {
    AndroidImportance,
    AndroidGroupAlertBehavior,
} from '@notifee/react-native';

// ID каналів — аналог CHANNEL_GENERAL / CHANNEL_MESSAGES з Kotlin
const CHANNEL_GENERAL = 'general_channel';
const CHANNEL_MESSAGES = 'messages_channel';

// Ключ групи для групованих сповіщень
const GROUP_KEY_MESSAGES = 'com.example.notification.MESSAGES';

export default function App() {

    useEffect(() => {
        // Аналог createNotificationChannels() у onCreate()
        // useEffect з [] викликається один раз при монтуванні компонента
        createNotificationChannels();
        requestPermission();
    }, []);

    // Створює канали сповіщень.
    // На Android без каналу сповіщення не відображаються (Android 8+).
    // На iOS канали не потрібні — notifee їх ігнорує.
    async function createNotificationChannels() {
        if (Platform.OS !== 'android') return;

        // Загальний канал: IMPORTANCE_DEFAULT — звук є, без heads-up
        await notifee.createChannel({
            id: CHANNEL_GENERAL,
            name: 'Загальні',
            importance: AndroidImportance.DEFAULT,
        });

        // Канал для повідомлень: IMPORTANCE_HIGH — heads-up сповіщення
        await notifee.createChannel({
            id: CHANNEL_MESSAGES,
            name: 'Повідомлення',
            importance: AndroidImportance.HIGH,
        });
    }

    // Аналог notifyWithPermission() — запитує дозвіл.
    // На Android 13+ потрібен явний дозвіл POST_NOTIFICATIONS.
    // На iOS notifee.requestPermission() показує системний діалог.
    async function requestPermission() {
        if (Platform.OS === 'ios') {
            await notifee.requestPermission();
        } else if (Platform.OS === 'android' && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert('Дозвіл відхилено', 'Сповіщення не працюватимуть');
            }
        }
    }

    // Аналог showSimpleNotification().
    // ID = 'static-1' — фіксований рядок замість числа 1.
    // Повторний виклик оновить це ж сповіщення, а не створить нове.
    async function showSimpleNotification() {
        await notifee.displayNotification({
            id: 'static-1',                   // Фіксований ID → завжди одне сповіщення
            title: 'Статичне сповіщення',
            body: 'Я завжди маю ID static-1, тому я одне',
            android: {
                channelId: CHANNEL_GENERAL,
                smallIcon: 'ic_launcher',        // Іконка з res/drawable
                pressAction: { id: 'default' }, // Дія при натисканні
            },
        });
    }

    // Аналог showMultipleNotification().
    // Date.now().toString() — унікальний ID щоразу,
    // тому сповіщення накопичуються у шторці.
    async function showMultipleNotification() {
        const uniqueId = Date.now().toString(); // Аналог System.currentTimeMillis().toInt()
        await notifee.displayNotification({
            id: uniqueId,
            title: 'Окреме сповіщення',
            body: `Мій ID: ${uniqueId}`,
            android: {
                channelId: CHANNEL_GENERAL,
                smallIcon: 'ic_launcher',
                pressAction: { id: 'default' },
            },
        });
    }

    // Аналог showGroupedNotification().
    // Надсилає 4 сповіщення + 1 summary у одну групу.
    async function showGroupedNotification() {

        // Summary — "заголовне" сповіщення групи (аналог .setGroupSummary(true)).
        // Надсилається першим, щоб група вже існувала до дочірніх сповіщень.
        await notifee.displayNotification({
            id: 'group-summary',               // Фіксований ID для summary
            title: 'Чат',
            body: 'Нові повідомлення',
            android: {
                channelId: CHANNEL_MESSAGES,
                smallIcon: 'ic_launcher',
                groupId: GROUP_KEY_MESSAGES,     // Прив'язуємо до групи
                groupSummary: true,              // Позначаємо як summary
                groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY, // Звук тільки у summary
            },
        });

        // Надсилаємо 4 дочірніх сповіщення з унікальними ID
        for (let i = 0; i < 4; i++) {
            // Невелика затримка, щоб ID на основі часу не збіглися
            await new Promise(r => setTimeout(r, 10));
            const uniqueId = Date.now().toString();

            await notifee.displayNotification({
                id: uniqueId,
                title: 'Чат',
                body: `Нове повідомлення ${uniqueId}`,
                android: {
                    channelId: CHANNEL_MESSAGES,
                    smallIcon: 'ic_launcher',
                    groupId: GROUP_KEY_MESSAGES,   // Всі належать до одної групи
                    autoCancel: true,              // Аналог .setAutoCancel(true)
                    pressAction: { id: 'default' },
                },
            });
        }
    }

    return (
        <View style={styles.container}>
            {/* Кнопка 1: Одне статичне сповіщення */}
            <View style={styles.button}>
                <Button title="Звичайне (ID: static-1)" onPress={showSimpleNotification} />
            </View>

            {/* Кнопка 2: Нове окреме сповіщення щоразу */}
            <View style={styles.button}>
                <Button title="Окреме (Новий ID щоразу)" onPress={showMultipleNotification} />
            </View>

            {/* Кнопка 3: Група сповіщень */}
            <View style={styles.button}>
                <Button title="У групу (Messages)" onPress={showGroupedNotification} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginVertical: 8,
        width: 260,
    },
});