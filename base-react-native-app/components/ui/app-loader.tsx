import React from 'react';
import { View, Modal, Text } from 'react-native';
import LottieView from "lottie-react-native";

interface AppLoaderProps {
    visible: boolean;
    message?: string;
}

export const AppLoader = ({ visible, message }: AppLoaderProps) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View className="flex-1 items-center justify-center bg-black/80">

                <LottieView
                    autoPlay
                    loop
                    source={require('../../assets/animations/loader.json')}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '60%',
                    }}
                    resizeMode="cover"
                />

                {message && (
                    <View className="absolute bottom-40">
                        <Text className="text-white font-bold text-2xl text-center shadow-lg">
                            {message}
                        </Text>
                    </View>
                )}
            </View>
        </Modal>
    );
};