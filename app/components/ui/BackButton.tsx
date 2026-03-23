import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/use-theme-color";

interface BackButtonProps {
    onPress?: () => void;
    className?: string;
}

export const BackButton = ({ onPress, className }: BackButtonProps) => {
    const router = useRouter();
    const iconColor = useThemeColor({}, "text");

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-gray-100 dark:bg-gray-800 p-2 rounded-full ${className}`}
        >
            <MaterialIcons
                name="arrow-back"
                size={24}
                color={iconColor}
            />
        </TouchableOpacity>
    );
};
