import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { AppLoader } from "@/components/ui/app-loader";

import {
    useCreateOperationMutation,
    useEditOperationMutation,
    useGetOperationByIdQuery
} from "@/services/operationsService";

interface OperationFormState {
    categoryId: number | null;
    amount: number;
    description: string;
}

export default function OperationModal() {

    const router = useRouter();
    const { id, categoryId } = useLocalSearchParams();

    const isEdit = !!id;

    const { data, isLoading: isLoadingOperation } = useGetOperationByIdQuery(
        { id: Number(id) },
        { skip: !isEdit }
    );

    const [createOperation, { isLoading: isCreating }] =
        useCreateOperationMutation();

    const [editOperation, { isLoading: isUpdating }] =
        useEditOperationMutation();

    const isLoading = isLoadingOperation || isCreating || isUpdating;

    const [form, setForm] = useState<OperationFormState>({
        categoryId: categoryId ? Number(categoryId) : null,
        amount: 0,
        description: ""
    });

    useEffect(() => {
        if (data) {
            setForm({
                categoryId: data.categoryId,
                amount: data.amount,
                description: data.description ?? ""
            });
        }
    }, [data]);

    const onSubmit = async () => {

        if (!form.categoryId) return;

        try {

            if (isEdit) {

                await editOperation({
                    id: Number(id),
                    categoryId: form.categoryId,
                    amount: form.amount,
                    description: form.description
                }).unwrap();

            } else {

                await createOperation({
                    categoryId: form.categoryId,
                    amount: form.amount,
                    description: form.description
                }).unwrap();

            }

            router.back();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1">

                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    className="flex-1"
                >

                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        className="px-6"
                    >

                        <AppLoader
                            visible={isLoading}
                            message="Завантаження операції..."
                        />

                        <View className="flex-1 justify-center py-10">

                            <ThemedText
                                type="title"
                                style={{ textAlign: "center", marginBottom: 20 }}
                            >
                                {isEdit ? "Редагувати операцію" : "Нова операція"}
                            </ThemedText>

                            <View className="bg-white dark:bg-gray-900 p-8 rounded-3xl gap-8 shadow-sm">

                                <TextInput
                                    value={form.amount.toString()}
                                    onChangeText={(value) =>
                                        setForm(prev => ({
                                            ...prev,
                                            amount: Number(value.replace(",", ".")) || 0
                                        }))
                                    }
                                    keyboardType="decimal-pad"
                                    placeholder="Сума"
                                    placeholderTextColor="#9CA3AF"
                                    className="w-full text-center border border-gray-300
                                               dark:border-gray-700
                                               bg-gray-50 dark:bg-gray-800
                                               text-black dark:text-white
                                               p-4 rounded-2xl text-lg"
                                />

                                <TextInput
                                    value={form.description}
                                    onChangeText={(value) =>
                                        setForm(prev => ({
                                            ...prev,
                                            description: value
                                        }))
                                    }
                                    placeholder="Опис"
                                    placeholderTextColor="#9CA3AF"
                                    className="w-full border border-gray-300
                                               dark:border-gray-700
                                               bg-gray-50 dark:bg-gray-800
                                               text-black dark:text-white
                                               p-4 rounded-2xl text-lg"
                                />

                            </View>

                            <View className="mt-10">

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

                        </View>

                    </ScrollView>

                </KeyboardAvoidingView>

            </SafeAreaView>
        </ThemedView>
    );
}