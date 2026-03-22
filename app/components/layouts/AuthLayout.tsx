import { useAppTheme } from "@/hooks/useAppTheme";
import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AuthLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
    const { isDark } = useAppTheme();

    return (
        <SafeAreaView
            className="flex-1 bg-[#00D09E] dark:bg-[#052224]"
            edges={['top', 'left', 'right']}
        >
            <View className="h-[100px] items-center justify-center">
                <Text className="font-poppins-semibold text-[30px] text-[#093030] dark:text-[#DFF7E2]">
                    {title}
                </Text>
            </View>

            <Animated.View
                entering={FadeInUp.duration(600)}
                className="flex-1 bg-[#F1FFF3] dark:bg-[#093030] rounded-t-[50px]"
            >
                {children}
            </Animated.View>
        </SafeAreaView>
    );
}
