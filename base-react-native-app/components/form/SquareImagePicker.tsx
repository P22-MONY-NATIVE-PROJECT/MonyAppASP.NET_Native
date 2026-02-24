import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
    imageUri?: string | null;
    onChange: (file: {
        uri: string;
        name: string;
        type: string;
    }) => void;
    size?: number;
    label?: string;
}

export const SquareImagePicker: React.FC<Props> = ({
                                                       imageUri,
                                                       onChange,
                                                       size = 140,
                                                       label = "Обрати зображення",
                                                   }) => {
    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("Потрібен доступ до галереї");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            onChange({
                uri: result.assets[0].uri,
                name: "image.jpg",
                type: "image/jpeg",
            });
        }
    };

    return (
        <View className="items-center gap-3">
            <TouchableOpacity
                activeOpacity={0.85}
                onPress={pickImage}
                style={{
                    width: size,
                    height: size,
                }}
                className="rounded-3xl bg-zinc-800 border border-zinc-700 items-center justify-center overflow-hidden"
            >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={{ width: size, height: size }}
                    />
                ) : (
                    <Text className="text-white opacity-60 text-center px-4">
                        {label}
                    </Text>
                )}
            </TouchableOpacity>

            <Text className="text-zinc-400 text-sm">
                Натисніть, щоб змінити
            </Text>
        </View>
    );
};