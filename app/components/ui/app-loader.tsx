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
            <View className="flex-1 items-center justify-center bg-black/60">

                <View className="items-center justify-center p-8 rounded-3xl">

                    <LottieView
                        autoPlay
                        loop
                        source={require('../../assets/animations/Growth profit.json')}
                        style={{
                            width: 200,
                            height: 200,
                        }}
                        resizeMode="contain"
                    />

                    {message && (
                        <View className="mt-4">
                            <Text className="text-white text-lg font-semibold text-center tracking-wide">
                                {message}
                            </Text>
                            <Text className="text-gray-200 text-sm text-center mt-1">
                                Будь ласка, зачекайте
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};