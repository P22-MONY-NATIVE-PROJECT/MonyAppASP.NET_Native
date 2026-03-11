import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    label: string;
    isPassword?: boolean;
    error?: string;
}

export default function CustomInput({ label, isPassword, error, ...props }: CustomInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="mb-4">
            <Text className="font-poppins-medium text-[15px] text-[#363130] dark:text-[#DFF7E2] mb-1 ml-1">
                {label}
            </Text>
            <View className={`w-full h-[45px] bg-[#DFF7E2] rounded-[20px] px-5 flex-row items-center justify-between border ${error ? 'border-red-500' : 'border-transparent'}`}>
                <TextInput
                    placeholderTextColor="rgba(14, 62, 62, 0.45)"
                    secureTextEntry={isPassword && !showPassword}
                    className="font-poppins-regular text-[14px] text-[#0E3E3E] flex-1"
                    style={isPassword ? { letterSpacing: 3 } : undefined}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#0E3E3E" />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text className="text-red-500 text-[11px] mt-1 ml-3 font-poppins-regular">{error}</Text>}
        </View>
    );
}