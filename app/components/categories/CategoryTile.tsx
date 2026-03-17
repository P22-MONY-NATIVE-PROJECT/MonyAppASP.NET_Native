import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";
import { APP_URLS } from "@/constants/Urls";

interface Props {
    category?: any;
    isAdd?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
}

const colors = [
    "bg-red-200 dark:bg-red-800",
    "bg-blue-200 dark:bg-blue-800",
    "bg-green-200 dark:bg-green-800",
    "bg-yellow-200 dark:bg-yellow-800",
    "bg-purple-200 dark:bg-purple-800",
    "bg-pink-200 dark:bg-pink-800",
    "bg-indigo-200 dark:bg-indigo-800",
    "bg-teal-200 dark:bg-teal-800",
];

export default function CategoryTile({
                                         category,
                                         isAdd,
                                         onPress,
                                         onLongPress,
                                     }: Props) {

    if (isAdd) {
        return (
            <TouchableOpacity
                onPress={onPress}
                className="w-[47%] h-28 rounded-xl items-center justify-center border-2 border-dashed border-gray-400 dark:border-gray-600"
            >
                <Text className="text-2xl font-semibold text-black dark:text-white">
                    +
                </Text>
            </TouchableOpacity>
        );
    }

    const colorClass = colors[category.id % colors.length];

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.85}
            className={`w-[47%] h-28 rounded-xl px-3 py-2 items-center justify-center ${colorClass}`}
        >
            <Image
                source={{ uri: APP_URLS.IMAGES_400_URL + category.icon }}
                className="w-12 h-12 mb-1"
                resizeMode="contain"
            />

            <Text
                numberOfLines={2}
                className="text-xs font-medium text-center text-black dark:text-white"
            >
                {category.name}
            </Text>
        </TouchableOpacity>
    );
}