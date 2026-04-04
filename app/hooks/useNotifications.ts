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

    const userId = user?.id;

    useEffect(() => {
        if (!user) {
            console.log('[useNotifications] User NOT set, stopping SignalR if active.');
            stopSignalRConnection();
            return;
        }

        console.log('[useNotifications] User is AUTHENTICATED. Initializing SignalR/Notifications logic for User ID:', user.id);

        const init = async () => {
            try {
                // Configure expo-notifications and request permissions
                await NotificationService.configureNotifications();
                console.log('[useNotifications] Notifications configured successfully');
            } catch (e) {
                console.warn('[useNotifications] Error configuring notifications:', e);
            }

            // Set the SignalR callback BEFORE starting the connection
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

            // Start the connection
            await startSignalRConnection();
        };

        init();
    }, [user?.id]);


    return { lastNotification };
};




