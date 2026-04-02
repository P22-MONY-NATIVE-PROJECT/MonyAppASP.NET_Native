import { useEffect, useState } from 'react';
import { startSignalRConnection, stopSignalRConnection, setOnNotificationReceived } from '@/services/signalRService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Alert } from 'react-native';
import { storage } from '@/utilities/storage';
import NotificationGenerator from "@/utilities/notificationGenerator";

export const useNotifications = () => {
    const [lastNotification, setLastNotification] = useState<any | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user) {
            stopSignalRConnection();
            return;
        }

        const _ = async () => {
            try {
                await NotificationGenerator.configureNotifications();
            } catch (e) {
                Alert.alert('Потрібен дозвіл', 'Будь ласка, дозвольте сповіщення у налаштуваннях.');
            }
        };

        const initSignalR = async () => {
            const token = await storage.getAccessToken();
            if (!token) {
                console.log('[useNotifications] No token found in storage, skipping SignalR init');
                return;
            }
            await startSignalRConnection();
            
            setOnNotificationReceived((data: { title: string; message: string }) => {
                console.log('[useNotifications] SignalR Notification received:', data);
                NotificationGenerator.createNotification(data.title, data.message, 'general', 'base_notification');
                setLastNotification(data);
            });
        };

        initSignalR();

        return () => {
        };

    }, [user]);

    return { lastNotification };
};




