import * as signalR from "@microsoft/signalr";
import { APP_URLS } from "@/constants/Urls";
import { storage } from "@/utilities/storage";
import { store } from "@/store";
import { logout } from "@/store/authSlice";

import { jwtDecode } from "jwt-decode";
import { setAuth } from "@/store/authSlice";

let connection: signalR.HubConnection | null = null;
let onNotificationReceived: ((data: { title: string; message: string }) => void) | null = null;

let refreshPromise: Promise<string> | null = null;

const getValidToken = async (): Promise<string> => {
    let token = storage.getAccessToken();
    if (!token) return "";

    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        // Check if token expires in less than 10 seconds
        if (decoded.exp < currentTime + 10) {
            if (refreshPromise) {
                console.log("[SignalR] Refresh already in progress, waiting...");
                return refreshPromise;
            }

            console.log("[SignalR] Token expiring, attempting refresh...");
            const refreshToken = storage.getRefreshToken();
            if (!refreshToken) return "";

            refreshPromise = (async () => {
                try {
                    const response = await fetch(`${APP_URLS.BASE_URL}/api/Auth/refresh`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ refreshToken }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log("[SignalR] Token refreshed successfully");
                        store.dispatch(setAuth(data));
                        return data.accessToken;
                    } else {
                        console.log("[SignalR] Refresh failed during SignalR negotiation");
                        store.dispatch(logout());
                        return "";
                    }
                } finally {
                    refreshPromise = null;
                }
            })();

            return refreshPromise;
        }
    } catch (e) {
        console.error("[SignalR] Token verification error:", e);
    }
    return token;
};

export const startSignalRConnection = async () => {
  const token = await getValidToken();
  if (!token) {
    console.log("[SignalR] No valid token, skipping connection.");
    return;
  }

  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    console.log("[SignalR] Connection already active or in progress");
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

