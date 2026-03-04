import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AvatarPicker from "@/components/form/AvatarPicker";
import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";

export default function RegisterScreen() {
    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);

    return (
        <AuthLayout title="Create Account">
            <AvatarPicker image={imageUri} onChange={setImageUri} />

            <CustomInput label="First name" placeholder="John" />
            <CustomInput label="Last name" placeholder="Doe" />
            <CustomInput
                label="Email"
                placeholder="example@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <CustomInput label="Password" placeholder="••••••••" isPassword />
            <CustomInput label="Confirm Password" placeholder="••••••••" isPassword />

            <View className="items-center w-full mt-2">
                <Text className="font-spartan-light text-[13px] text-center text-[#4B4544] dark:text-[#DFF7E2] mb-6 px-4">
                    By continuing, you agree to {"\n"}
                    <Text className="text-[#00D09E] font-spartan-light">Terms of Use and Privacy Policy.</Text>
                </Text>

                <PrimaryButton title="Sign Up" onPress={() => router.push('/onBoarding')} />

                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text className="font-spartan-light text-[13px] text-[#093030] dark:text-[#DFF7E2]">
                        Already have an account? <Text className="text-[#00D09E] font-spartan-bold">Log In</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    );
}