import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { APP_URLS } from "@/constants/Urls";

interface Props {
    category?: any;
    isAdd?: boolean;
    onPress?: () => void;
    onLongPress?: () => void;
}

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
                className="bg-neutral-800 w-[48%] aspect-square rounded-3xl items-center justify-center"
            >
                <Text className="text-white text-4xl">+</Text>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            activeOpacity={0.8}
            className="bg-neutral-800 w-[48%] aspect-square rounded-3xl p-4 items-center justify-center"
        >
            <Image
                source={{ uri: APP_URLS.IMAGES_100_URL + category.icon }}
                className="w-12 h-12 mb-3"
            />

            <Text className="text-white font-medium text-center">
                {category.name}
            </Text>
        </TouchableOpacity>
    );
}