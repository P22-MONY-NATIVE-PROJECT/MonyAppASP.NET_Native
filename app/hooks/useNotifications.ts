import { useEffect, useState } from 'react';
import { startSignalRConnection, stopSignalRConnection, setOnNotificationReceived } from '@/services/signalRService';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Alert } from 'react-native';
import { storage } from '@/utilities/storage';

export const useNotifications = () => {
    const [lastNotification, setLastNotification] = useState<any | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        if (!user) {
            stopSignalRConnection();
            return;
        }

        const initSignalR = async () => {
            const token = await storage.getAccessToken();
            if (!token) {
                console.log('[useNotifications] No token found in storage, skipping SignalR init');
                return;
            }
            await startSignalRConnection();
            
            setOnNotificationReceived((data: { title: string; message: string }) => {
                console.log('[useNotifications] SignalR Notification received:', data);
                Alert.alert(data.title, data.message);
                setLastNotification(data);
            });
        };

        initSignalR();

        return () => {
        };

    }, [user]);

    return { lastNotification };
};




