import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SquareImagePicker } from "@/components/form/SquareImagePicker";
import {
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useGetCategoryByIdQuery,
} from "@/services/categoriesService";
import { SafeAreaView } from "react-native-safe-area-context";
import {ICreateCategoryRequest} from "@/types/category/ICreateCategoryRequest";
import {IEditCategoryRequest} from "@/types/category/IEditCategoryRequest";

export default function CategoryModal() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const isEdit = !!id;

    const { data, isLoading } = useGetCategoryByIdQuery(
        { id: Number(id) },
        { skip: !isEdit }
    );

    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const [form, setForm] = useState<ICreateCategoryRequest>({
        name: data?.name ?? "",
        icon: undefined as any,
    });

    const onSubmit = async () => {
        if (isEdit) {
            const payload: IEditCategoryRequest = {
                id: Number(id),
                name: form.name,
                icon: form.icon,
            };

            await updateCategory(payload);
        } else {
            await createCategory(form);
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
                value={form.name}
                onChangeText={(value) =>
                    setForm((prev) => ({
                        ...prev,
                        name: value,
                    }))
                }
                placeholder="Назва"
                placeholderTextColor="#9CA3AF"
                className="border border-gray-600 p-4 rounded-xl text-white"
            />

            <SquareImagePicker
                imageUri={form.icon?.uri ?? null}
                onChange={(file) =>
                    setForm((prev) => ({
                        ...prev,
                        icon: file,
                    }))
                }
                size={160}
                label="Обрати іконку"
            />

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