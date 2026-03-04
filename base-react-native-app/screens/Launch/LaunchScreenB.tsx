import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoGreen } from "@/components/ui/logos";
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function LaunchScreenB() {
    const router = useRouter();

    const handleLogin = () => {
        router.replace('/(auth)/login');
    };

    const handleSignUp = () => {
        router.replace('/(auth)/register');
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F4FFF8] dark:bg-[#052224] px-8">
            <Animated.View
                entering={FadeInDown.duration(800)}
                className="flex-1 items-center justify-center"
            >
                <View className="items-center mb-2">
                    <LogoGreen size={110} />
                    <Text
                        style={{ fontSize: 52, lineHeight: 57 }}
                        className="font-poppins-semibold text-[#00D09E] capitalize mt-2"
                    >
                        F-Track
                    </Text>
                </View>

                <Text
                    style={{ fontSize: 14, lineHeight: 18 }}
                    className="font-spartan-regular text-[#4B4544] dark:text-[#DFF7E2] text-center mb-10 px-8"
                >
                    Smart ways to manage your finances and reach your goals every day.
                </Text>

                <View className="w-full items-center">
                    <TouchableOpacity
                        onPress={handleLogin}
                        activeOpacity={0.8}
                        style={{ width: 207, height: 45 }}
                        className="bg-[#00D09E] rounded-full items-center justify-center mb-4 shadow-sm"
                    >
                        <Text
                            style={{ fontSize: 18 }}
                            className="font-poppins-semibold text-[#093030] capitalize"
                        >
                            Log In
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSignUp}
                        activeOpacity={0.8}
                        style={{ width: 207, height: 45 }}
                        className="bg-[#E5F9F0] dark:bg-[#DFF7E2] rounded-full items-center justify-center mb-6 shadow-sm"
                    >
                        <Text
                            style={{ fontSize: 18 }}
                            className="font-poppins-semibold text-[#0E3E3E] capitalize"
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text
                            style={{ fontSize: 14 }}
                            className="font-spartan-semibold text-[#093030] dark:text-[#DFF7E2]"
                        >
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}