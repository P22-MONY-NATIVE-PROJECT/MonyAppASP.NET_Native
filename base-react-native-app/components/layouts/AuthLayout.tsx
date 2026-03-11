import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from "@/hooks/useAppTheme";

const { height } = Dimensions.get('window');

interface AuthLayoutProps {
    title: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, children }: AuthLayoutProps) {
    const insets = useSafeAreaInsets();
    const { isDark } = useAppTheme();

    return (
        <SafeAreaView
            className="flex-1 bg-[#00D09E] dark:bg-[#052224]"
            edges={['top', 'left', 'right']}
        >
            <KeyboardAwareScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom }}
                bounces={false}
                overScrollMode="never"
                alwaysBounceVertical={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                style={{ backgroundColor: isDark ? '#052224' : '#00D09E' }}
            >
                <View className="h-[150px] items-center justify-center">
                    <Text className="font-poppins-semibold text-[30px] text-[#093030] dark:text-[#DFF7E2]">
                        {title}
                    </Text>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(600)}
                    className="flex-1 bg-[#F1FFF3] dark:bg-[#093030] rounded-t-[50px] px-8 pt-10"
                    style={{ minHeight: height - 150, paddingBottom: insets.bottom + 40 }}
                >
                    {children}
                </Animated.View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}