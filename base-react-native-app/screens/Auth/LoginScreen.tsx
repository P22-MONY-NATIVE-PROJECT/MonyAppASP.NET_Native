import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Platform, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView
            className="flex-1 bg-[#00D09E] dark:bg-[#052224]"
            edges={['top', 'left', 'right']}
        >
            <KeyboardAwareScrollView
                className="flex-1"
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: insets.bottom - 100
                }}
                bounces={false}
                overScrollMode="never"
                alwaysBounceVertical={false}
                extraScrollHeight={20}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
            >
                <View className="h-[180px] items-center justify-center">
                    <Text className="font-poppins-semibold text-[35px] text-[#093030] dark:text-[#DFF7E2]">
                        Welcome
                    </Text>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(600)}
                    className="flex-1 bg-[#F1FFF3] dark:bg-[#093030] rounded-t-[50px] px-10 pt-12"
                    style={{ minHeight: 650 }}
                >
                    <View className="mb-5">
                        <Text className="font-poppins-medium text-[15px] text-[#093030] dark:text-[#DFF7E2] mb-2 ml-1">
                            Username Or Email
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 justify-center">
                            <TextInput
                                placeholder="example@example.com"
                                placeholderTextColor="rgba(9, 48, 48, 0.45)"
                                className="font-poppins-regular text-[14px] text-[#093030]"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="font-poppins-medium text-[15px] text-[#093030] dark:text-[#DFF7E2] mb-2 ml-1">
                            Password
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 flex-row items-center justify-between">
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="rgba(9, 48, 48, 0.45)"
                                secureTextEntry={!showPassword}
                                className="font-poppins-regular text-[14px] text-[#093030] flex-1"
                                style={{ letterSpacing: 3 }}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#093030" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="items-center w-full">
                        <TouchableOpacity
                            activeOpacity={0.8}
                            className="bg-[#00D09E] w-[220px] h-[50px] rounded-full items-center justify-center shadow-sm"
                            onPress={() => router.replace('/onBoarding')}
                        >
                            <Text className="font-poppins-semibold text-[20px] text-[#093030]">Log In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="my-4">
                            <Text className="font-spartan-semibold text-[13px] text-[#093030] dark:text-[#DFF7E2]">Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-[#DFF7E2] w-[220px] h-[50px] rounded-full items-center justify-center shadow-sm mb-6"
                            onPress={() => router.replace('/(auth)/register')}
                        >
                            <Text className="font-poppins-semibold text-[20px] text-[#0E3E3E]">Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="mb-8 flex-row items-center">
                            <Text className="font-poppins-semibold text-[14px] text-[#0E3E3E] dark:text-[#DFF7E2]">
                                Use <Text className="text-[#00D09E]">Fingerprint</Text> To Access
                            </Text>
                        </TouchableOpacity>

                        <Text className="font-spartan-light text-[12px] text-[#093030] dark:text-[#DFF7E2] mb-4">or sign up with</Text>

                        <View className="flex-row gap-5 mb-8">
                            <TouchableOpacity className="w-[40px] h-[40px] border border-[#0E3E3E] dark:border-[#DFF7E2] rounded-full items-center justify-center">
                                <Ionicons name="logo-facebook" size={22} color={isDark ? "#DFF7E2" : "#0E3E3E"} />
                            </TouchableOpacity>
                            <TouchableOpacity className="w-[40px] h-[40px] border border-[#0E3E3E] dark:border-[#DFF7E2] rounded-full items-center justify-center">
                                <Ionicons name="logo-google" size={22} color={isDark ? "#DFF7E2" : "#0E3E3E"} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => router.push('/register')}>
                            <Text className="font-spartan-light text-[12px] text-[#093030] dark:text-[#DFF7E2]">
                                Don&#39;t have an account? <Text className="text-[#00D09E] font-spartan-bold">Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}