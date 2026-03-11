import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoBlack } from "@/components/ui/logos";
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function LaunchScreenA() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/launch');
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-primary items-center justify-center">
            <Animated.View
                entering={FadeIn.duration(1000).delay(200)}
                className="items-center"
            >
                <LogoBlack size={120} />

                <Animated.View entering={FadeInDown.duration(800).delay(500)}>
                    <Text className="font-poppins-semibold text-white text-4xl mt-4 tracking-wider">
                        F-Track
                    </Text>
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    );
}