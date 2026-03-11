import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons";

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
        <View className="items-center">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={pickImage}
                style={{
                    width: size,
                    height: size,
                }}
                // Додано border-dashed для порожнього стану
                className={`rounded-[35px] items-center justify-center overflow-hidden bg-zinc-100 border-2 
                    ${imageUri ? 'border-zinc-700' : 'border-dashed border-zinc-600'}`}
            >
                {imageUri ? (
                    <View className="w-full h-full relative">
                        <Image
                            source={{ uri: imageUri }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                        <View className="absolute inset-0 bg-black/30 items-center justify-center">
                            <Ionicons name="camera-reverse" size={25} color="white" />
                        </View>
                    </View>
                ) : (
                    <View className="items-center px-4">
                        <View className="bg-zinc-800 p-3 rounded-full mb-2">
                            <Ionicons name="image-outline" size={32} color="#a1a1aa" />
                        </View>
                        <Text className="text-zinc-800 text-sm font-medium mt-2 text-center">
                            {label}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            <Text className="text-zinc-500 text-[10px] uppercase tracking-[2px] mt-4 font-bold">
                {imageUri ? "Натисніть, щоб змінити" : "Дозволені JPG або PNG"}
            </Text>
        </View>
    );
};