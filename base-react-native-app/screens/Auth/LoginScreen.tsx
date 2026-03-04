import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from "@/hooks/useAppTheme";
import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

export default function LoginScreen() {
    const router = useRouter();
    const { isDark } = useAppTheme();

    return (
        <AuthLayout title="Welcome">
            <CustomInput
                label="Email"
                placeholder="example@example.com"
                autoCapitalize="none"
            />
            <CustomInput label="Password" placeholder="••••••••" isPassword />

            <View className="items-center w-full mt-4">
                <PrimaryButton title="Log In" onPress={() => router.replace('/onBoarding')} />

                <TouchableOpacity className="mb-6">
                    <Text className="font-spartan-semibold text-[13px] text-[#093030] dark:text-[#DFF7E2]">
                        Forgot Password?
                    </Text>
                </TouchableOpacity>

                <PrimaryButton
                    title="Sign Up"
                    variant="secondary"
                    onPress={() => router.replace('/(auth)/register')}
                />

                <TouchableOpacity className="mb-8 flex-row items-center">
                    <Text className="font-poppins-semibold text-[14px] text-[#0E3E3E] dark:text-[#DFF7E2]">
                        Use <Text className="text-[#00D09E]">Fingerprint</Text> To Access
                    </Text>
                </TouchableOpacity>

                <Text className="font-spartan-light text-[12px] text-[#093030] dark:text-[#DFF7E2] mb-4">
                    or sign up with
                </Text>

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
        </AuthLayout>
    );
}