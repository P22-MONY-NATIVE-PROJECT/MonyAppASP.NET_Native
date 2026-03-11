import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
}

export default function PrimaryButton({ title, variant = 'primary', className = '', ...props }: PrimaryButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            className={`w-[220px] h-[50px] rounded-full items-center justify-center shadow-sm mb-6 ${
                isPrimary ? 'bg-[#00D09E]' : 'bg-[#DFF7E2]'
            } ${className}`}
            {...props}
        >
            <Text className={`font-poppins-semibold text-[20px] ${
                isPrimary ? 'text-[#093030]' : 'text-[#0E3E3E]'
            }`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}