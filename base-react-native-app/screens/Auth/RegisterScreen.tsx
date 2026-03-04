import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import AvatarPicker from "@/components/form/AvatarPicker";
import {useAppTheme} from "@/hooks/useAppTheme";

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const {isDark} = useAppTheme();

    const [imageUri, setImageUri] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <SafeAreaView
            className="flex-1 bg-[#00D09E] dark:bg-[#052224]"
            edges={['top', 'left', 'right']}
        >
            <KeyboardAwareScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1 }}
                bounces={false}
                overScrollMode="never"
                alwaysBounceVertical={false}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                style={{ backgroundColor: isDark ? '#052224' : '#00D09E' }}
            >
                <View className="h-[150px] items-center justify-center">
                    <Text className="font-poppins-semibold text-[30px] text-[#093030] dark:text-[#DFF7E2]">
                        Create Account
                    </Text>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(600)}
                    className="flex-1 bg-[#F1FFF3] dark:bg-[#093030] rounded-t-[50px] px-8 pt-10"
                    style={{
                        minHeight: height - 150,
                        paddingBottom: insets.bottom + 40
                    }}
                >
                    <AvatarPicker image={imageUri} onChange={setImageUri} />

                    <View className="mb-4">
                        <Text className="font-poppins-medium text-[15px] text-[#363130] dark:text-[#DFF7E2] mb-1 ml-1">
                            First name
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 justify-center">
                            <TextInput
                                placeholder="John"
                                placeholderTextColor="rgba(14, 62, 62, 0.45)"
                                className="font-poppins-regular text-[16px] text-[#0E3E3E]"
                            />
                        </View>
                    </View>

                    <View className="mb-4">
                        <Text className="font-poppins-medium text-[15px] text-[#363130] dark:text-[#DFF7E2] mb-1 ml-1">
                            Last name
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 justify-center">
                            <TextInput
                                placeholder="Doe"
                                placeholderTextColor="rgba(14, 62, 62, 0.45)"
                                className="font-poppins-regular text-[14px] text-[#0E3E3E]"
                            />
                        </View>
                    </View>

                    <View className="mb-4">
                        <Text className="font-poppins-medium text-[15px] text-[#363130] dark:text-[#DFF7E2] mb-1 ml-1">
                            Email
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 justify-center">
                            <TextInput
                                placeholder="example@example.com"
                                placeholderTextColor="rgba(14, 62, 62, 0.45)"
                                className="font-poppins-regular text-[14px] text-[#0E3E3E]"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View className="mb-4">
                        <Text className="font-poppins-medium text-[15px] text-[#363130] dark:text-[#DFF7E2] mb-1 ml-1">
                            Password
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 flex-row items-center justify-between">
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="rgba(14, 62, 62, 0.45)"
                                secureTextEntry={!showPassword}
                                className="font-poppins-regular text-[14px] text-[#0E3E3E] flex-1"
                                style={{ letterSpacing: 3 }}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#0E3E3E" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="font-poppins-medium text-[15px] text-[#363130] dark:text-[#DFF7E2] mb-1 ml-1">
                            Confirm Password
                        </Text>
                        <View className="w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 flex-row items-center justify-between">
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="rgba(14, 62, 62, 0.45)"
                                secureTextEntry={!showConfirmPassword}
                                className="font-poppins-regular text-[14px] text-[#0E3E3E] flex-1"
                                style={{ letterSpacing: 3 }}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#0E3E3E" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="items-center w-full mt-2">
                        <Text className="font-spartan-light text-[13px] text-center text-[#4B4544] dark:text-[#DFF7E2] mb-6 px-4">
                            By continuing, you agree to {"\n"}
                            <Text className="text-[#00D09E] font-spartan-light">Terms of Use and Privacy Policy.</Text>
                        </Text>

                        <TouchableOpacity
                            onPress={() => router.push('/onBoarding')}
                            activeOpacity={0.8}
                            className="bg-[#00D09E] w-[220px] h-[50px] rounded-full items-center justify-center shadow-sm mb-6"
                        >
                            <Text className="font-poppins-semibold text-[20px] text-[#093030]">Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push('/login')}>
                            <Text className="font-spartan-light text-[13px] text-[#093030] dark:text-[#DFF7E2]">
                                Already have an account? <Text className="text-[#00D09E] font-spartan-bold">Log In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}