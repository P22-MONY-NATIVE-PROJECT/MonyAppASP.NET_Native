import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery,
} from "@/services/categoriesService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoryModal() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const isEdit = !!id;

    const { data, isLoading } = useGetCategoryByIdQuery(
        { id: Number(id) },
        { skip: !isEdit }
    );

    const [name, setName] = useState("");
    const [icon, setIcon] = useState<any>(null);

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (data) {
            setName(data.name);
        }
    }, [data]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.7,
        });

        if (!result.canceled) {
            setIcon({
                uri: result.assets[0].uri,
                type: "image/jpeg",
                name: "icon.jpg",
            });
        }
    };

    const onSubmit = async () => {
        if (isEdit) {
            await updateCategory({
                id: Number(id),
                name,
                icon,
            });
        } else {
            await createCategory({
                name,
                icon,
            });
        }

        router.back();
    };

    if (isEdit && isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <Text className="text-white">Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 p-6 gap-6 bg-black">
            <Text className="text-2xl font-bold text-white">
                {isEdit ? "Редагувати" : "Створити"}
            </Text>

            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Назва"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-600 p-4 rounded-xl text-white"
            />

            <TouchableOpacity
                onPress={pickImage}
                className="border border-gray-500 p-4 rounded-xl items-center"
            >
                <Text className="text-white opacity-80">
                    Обрати іконку
                </Text>
            </TouchableOpacity>

            {icon && (
                <Image
                    source={{ uri: icon.uri }}
                    className="w-20 h-20 rounded-full"
                />
            )}

            <TouchableOpacity
                onPress={onSubmit}
                className="bg-white p-4 rounded-xl items-center"
            >
                <Text className="text-black font-semibold">
                    {isEdit ? "Зберегти" : "Створити"}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}