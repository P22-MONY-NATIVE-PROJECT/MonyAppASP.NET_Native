import * as signalR from "@microsoft/signalr";
import { APP_URLS } from "@/constants/Urls";
import { storage } from "@/utilities/storage";
import { store } from "@/store";
import { logout } from "@/store/authSlice";

let connection: signalR.HubConnection | null = null;
let onNotificationReceived: ((data: { title: string; message: string }) => void) | null = null;

const getValidToken = async (): Promise<string> => {
    // With eternal tokens, we just get it from storage and return.
    // No expiration checks, no "refresh bullshit".
    const token = storage.getAccessToken();
    return token ?? "";
};

export const startSignalRConnection = async () => {
    const token = await getValidToken();
    // console.log("Connecton get token",token);
    if (!token) {
        console.log("[SignalR] No token found in storage, skipping connection.");
        return;
    }

    if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
        console.log("[SignalR] Connection already active or in progress (State: " + connection.state + ")");
        return;
    }

    if (!connection) {
        connection = new signalR.HubConnectionBuilder()
            .withUrl(`${APP_URLS.BASE_URL}/hubs/notifications`, {
                accessTokenFactory: () => getValidToken()
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on("ReceiveNotification", (data: { title: string; message: string }) => {
            console.log("[SignalR] Notification received:", data);
            if (onNotificationReceived) {
                onNotificationReceived(data);
            }
        });
        
        connection.onclose((error) => {
            console.log("[SignalR] Connection closed. Error:", error);
        });

        connection.onreconnecting((error) => {
            console.log("[SignalR] Connection reconnecting...", error);
        });

        connection.onreconnected((connectionId) => {
            console.log("[SignalR] Connection re-established. Id:", connectionId);
        });
    }

    try {
        console.log("[SignalR] Connected to the connection...");
        await connection.start();
        console.log("[SignalR] Connection started successfully");
    } catch (err: any) {
        console.error("[SignalR]++-- Connection failed: ", err);
    }
};

export const stopSignalRConnection = async () => {
    if (connection) {
        await connection.stop();
        connection = null;
        console.log("[SignalR] Connection stopped");
    }
};

export const setOnNotificationReceived = (callback: ((data: { title: string; message: string }) => void) | null) => {
    onNotificationReceived = callback;
};


