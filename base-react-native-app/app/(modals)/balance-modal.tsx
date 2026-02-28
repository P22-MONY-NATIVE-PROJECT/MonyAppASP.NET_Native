import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { SquareImagePicker } from "@/components/form/SquareImagePicker";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery,
} from "@/services/categoriesService";
import { SafeAreaView } from "react-native-safe-area-context";
import { IEditCategoryRequest } from "@/types/category/IEditCategoryRequest";
import {ThemedView} from "@/components/themed-view";
import {APP_URLS} from "@/constants/Urls";
import { ThemedText } from "@/components/themed-text";

export default function BalanceModal() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const isEdit = !!id;

    const { data, isLoading } = useGetCategoryByIdQuery(
        { id: Number(id) },
        { skip: !isEdit }
    );

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const [form, setForm] = useState({
        name: "",
        categoryTypeId: Number(typeId),
        existingIcon: "" as string | null,
        newIcon: undefined as any,
    });

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name,
                categoryTypeId: data.categoryTypeId,
                existingIcon: data.icon ?? null,
                newIcon: undefined,
            });
        }
    }, [data]);

    const onSubmit = async () => {
        try {
            if (isEdit) {
                const payload: IEditCategoryRequest = {
                    id: Number(id),
                    name: form.name,
                    icon: form.newIcon, // only send if new selected
                };

                await updateCategory(payload).unwrap();
            } else {
                await createCategory({
                    name: form.name,
                    icon: form.newIcon,
                    categoryTypeId: form.categoryTypeId,
                }).unwrap();
            }

            router.back();
        } catch (error) {
            console.error(error);
        }
    };

    if (isEdit && isLoading) {
        return (
            <View className="flex-1 items-center justify-center bg-black">
                <Text className="text-white">Loading...</Text>
            </View>
        );
    }

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 px-6">

                {/* Centered Content */}
                <View className="flex-1 justify-center">

                    {/* Title */}
                    <ThemedText
                        type="title"
                        style={{ textAlign: "center", marginBottom: 40 }}
                    >
                        {isEdit ? "Редагувати категорію" : "Нова категорія"}
                    </ThemedText>

                    {/* Card */}
                    <View className="bg-white dark:bg-gray-900 p-8 rounded-3xl gap-8 shadow-sm">

                        {/* Name Input */}
                        <View className="items-center">
                            <TextInput
                                value={form.name}
                                onChangeText={(value) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        name: value,
                                    }))
                                }
                                placeholder="Назва категорії"
                                placeholderTextColor="#9CA3AF"
                                className="w-full text-center border border-gray-300 dark:border-gray-700
                                           bg-gray-50 dark:bg-gray-800
                                           text-black dark:text-white
                                           p-4 rounded-2xl text-lg"
                            />
                        </View>

                        {/* Image Picker */}
                        <View className="items-center">
                            <SquareImagePicker
                                imageUri={
                                    form.newIcon?.uri ??
                                    (form.existingIcon
                                        ? APP_URLS.IMAGES_400_URL + form.existingIcon
                                        : null)
                                }
                                onChange={(file) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        newIcon: file,
                                    }))
                                }
                                size={150}
                                label="Іконка (необов'язково)"
                            />
                        </View>

                    </View>
                </View>

                {/* Bottom Button */}
                <View className="pb-8">
                    <TouchableOpacity
                        onPress={onSubmit}
                        activeOpacity={0.8}
                        className="bg-emerald-600 p-5 rounded-2xl items-center shadow-lg"
                    >
                        <Text className="text-white font-semibold text-lg">
                            {isEdit ? "Зберегти" : "Створити"}
                        </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ThemedView>
    );
}