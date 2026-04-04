import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import '../global.css';
import { store } from '@/store';
import { setAuth } from '@/store/authSlice';
import { initStorage, storage } from '@/utilities/storage';
import { NetworkProvider } from '@/context/NetworkContext';
import AppContent from "@/components/AppContent";

const RootLayout = () => {
    const [storageReady, setStorageReady] = useState(false);

    useEffect(() => {
        initStorage().then(() => {
            const accessToken  = storage.getAccessToken();
            if (accessToken) {
                store.dispatch(setAuth({ accessToken }));
            }
        }).finally(() => setStorageReady(true));
    }, []);



    if (!storageReady) {
        return null;
    }

    return (
        <Provider store={store}>
            <NetworkProvider>
                <AppContent />
            </NetworkProvider>
        </Provider>
    );
}

export default RootLayout;
