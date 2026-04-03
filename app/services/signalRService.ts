import * as signalR from "@microsoft/signalr";
import { APP_URLS } from "@/constants/Urls";
import { storage } from "@/utilities/storage";
import { store } from "@/store";
import { logout } from "@/store/authSlice";

let connection: signalR.HubConnection | null = null;
let onNotificationReceived: ((data: { title: string; message: string }) => void) | null = null;

export const startSignalRConnection = async () => {
  const token = storage.getAccessToken();
  if (!token) {
    console.log("[SignalR] No token found, skipping connection attempt.");
    return;
  }

  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    console.log("[SignalR] Connection is already active or connecting");
    return;
  }

  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl(`${APP_URLS.BASE_URL}/hubs/notifications`, {
        accessTokenFactory: () => storage.getAccessToken() || ""
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
  }

  try {
    await connection.start();
    console.log("[SignalR] Connection started successfully");
  } catch (err: any) {
    console.error("[SignalR] Connection failed: ", err);
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

