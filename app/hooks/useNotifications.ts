import { useEffect, useState } from 'react';
import { startSignalRConnection, stopSignalRConnection, setOnNotificationReceived } from '@/services/signalRService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Alert } from 'react-native';
import { storage } from '@/utilities/storage';
import NotificationService from "@/services/notificationService";
import {ICreateNotification} from "@/types/notifications/ICreateNotification";
import {NOTIFICATION_BASE_ID, NOTIFICATION_GENERAL_CHANNEL_ID} from "@/constants/notification";

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
                await NotificationService.configureNotifications();
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

                const notiModel : ICreateNotification = {
                    title: data.title,
                    body: data.message,
                    channelId: NOTIFICATION_GENERAL_CHANNEL_ID,
                    id: NOTIFICATION_BASE_ID
                }

                NotificationService.createNotification(notiModel);
                setLastNotification(data);
            });
        };

        initSignalR();

        return () => {
        };

    }, [user]);

    return { lastNotification };
};




