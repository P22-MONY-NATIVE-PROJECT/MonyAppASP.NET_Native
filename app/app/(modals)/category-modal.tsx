import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SquareImagePicker } from "@/components/form/SquareImagePicker";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery,
} from "@/services/categoriesService";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ICreateCategoryRequest } from "@/types/category/ICreateCategoryRequest";
import { IEditCategoryRequest } from "@/types/category/IEditCategoryRequest";
import {ThemedView} from "@/components/themed-view";
import {APP_URLS} from "@/constants/Urls";
import { ThemedText } from "@/components/themed-text";
import {AppLoader} from "@/components/ui/app-loader";
import { BackButton } from "@/components/ui/BackButton";

export default function CategoryModal() {
    const { id, typeId } = useLocalSearchParams();
    const router = useRouter();
    const isEdit = !!id;

    const { data, isLoading: isLoadingCategory } = useGetCategoryByIdQuery(
        { id: Number(id) },
        { skip: !isEdit }
    );

    const [createCategory, {isLoading: isLoadingCreateCategory}] = useCreateCategoryMutation();
    const [updateCategory, {isLoading: isLoadingUpdateCategory}] = useUpdateCategoryMutation();

    const isLoading = isLoadingCategory || isLoadingCreateCategory || isLoadingUpdateCategory;

    // const [form, setForm] = useState<ICreateCategoryRequest>({
    //     name: "",
    //     icon: undefined as any,
    //     categoryTypeId: Number(typeId),
    // });
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

    // if (isEdit && isLoading) {
    //     return (
    //         <View className="flex-1 items-center justify-center bg-black">
    //             <Text className="text-white">Loading...</Text>
    //         </View>
    //     );
    // }

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 px-6">

                <AppLoader
                    visible={isLoading}
                    message="Завантаження категорій..."
                />

                <View className="flex-1 justify-center">

                    <View className="flex-row items-center justify-between mb-6">
                        <BackButton />
                        <ThemedText type="title" style={{ flex: 1, textAlign: "center", marginRight: 40 }}>
                            {isEdit ? "Редагувати категорію" : "Нова категорія"}
                        </ThemedText>
                    </View>

                    <View className="bg-white dark:bg-gray-900 p-8 rounded-3xl gap-8 shadow-sm">

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
                                className="w-full border border-gray-300 dark:border-gray-700
                                           bg-gray-50 dark:bg-gray-800 
                                           text-black dark:text-white 
                                           p-4 rounded-2xl text-lg"
                            />
                        </View>

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
                                size={160}
                                label="Іконка (необов'язково)"
                            />
                        </View>

                    </View>
                </View>

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
