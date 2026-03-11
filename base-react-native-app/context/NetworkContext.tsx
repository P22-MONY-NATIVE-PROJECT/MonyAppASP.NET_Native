import React, { createContext, useContext, ReactNode } from "react";
import { useInternetAvailability } from "../hooks/useInternetAvailability";

type NetworkContextType = {
    isConnected: boolean | null;
    isLoading: boolean;
    recheckConnection: () => Promise<void>;
};

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

type NetworkProviderProps = {
    children: ReactNode;
};

export const NetworkProvider = ({ children }: NetworkProviderProps) => {
    const network = useInternetAvailability();

    return (
        <NetworkContext.Provider value={network}>
            {children}
        </NetworkContext.Provider>
    );
};

export const useNetwork = () => {
    const context = useContext(NetworkContext);

    if (!context) {
        throw new Error("useNetwork error");
    }

    return context;
};