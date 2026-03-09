import React, { useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm, useFieldArray } from "react-hook-form";

import { useGetBalancesQuery } from "@/services/balancesService";
import { useEditOperationMutation, useGetOperationByIdQuery } from "@/services/operationsService";
import { IEditOperationRequest } from "@/types/operation/IEditOperationRequest";
import { EChargeApplicationType } from "@/types/operation/EChargeApplicationType";
import { EChargeType } from "@/types/operation/EChargeType";

interface Props {
    operationId: number;
    onClose: () => void;
}

export default function OperationEditForm({ operationId, onClose }: Props) {
    // 1. Отримуємо дані
    const { data: operation, isLoading: isDataLoading } = useGetOperationByIdQuery({ id: operationId });
    const { data: balances } = useGetBalancesQuery();
    const [editOperation, { isLoading: isUpdating }] = useEditOperationMutation();

    const { control, handleSubmit, reset, watch, setValue } = useForm<IEditOperationRequest>({
        defaultValues: {
            id: operationId,
            comment: "",
            amount: 0,
            categoryId: 0,
            balanceId: 0,
            charges: [],
        },
    });

    // 2. Використовуємо useFieldArray для керування динамічним списком
    const { fields, append, remove } = useFieldArray({
        control,
        name: "charges",
    });

    const selectedBalanceId = watch("balanceId");

    // 3. Синхронізація даних при отриманні
    useEffect(() => {
        if (operation) {
            console.log("Данні отримано:", operation); // Для дебагу
            reset({
                id: operation.id,
                comment: operation.comment ?? "",
                amount: operation.calcAmount ?? operation.initAmount,
                categoryId: operation.categoryId,
                balanceId: operation.balanceId,
                charges: operation.charges.map((c) => ({
                    id: c.id,
                    amount: c.amount,
                    percentage: c.percentage,
                    type: c.type as unknown as EChargeType,
                    applicationType: c.applicationType as unknown as EChargeApplicationType,
                })),
            });
        }
    }, [operation, reset]);

    const onSubmit = async (data: IEditOperationRequest) => {
        try {
            await editOperation(data).unwrap();
            onClose();
        } catch (error) {
            console.error("Failed to update operation:", error);
        }
    };

    // Якщо дані ще вантажаться — показуємо лоадер
    if (isDataLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900" edges={['bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <Text className="text-2xl font-bold text-center text-black dark:text-white mb-6">
                        Редагувати операцію
                    </Text>

                    {/* Amount */}
                    <Text className="text-black dark:text-white mb-1 font-medium">Сума</Text>
                    <Controller
                        control={control}
                        name="amount"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value ? String(value) : ""}
                                onChangeText={(v) => onChange(Number(v))}
                                keyboardType="decimal-pad"
                                className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl mb-4 border border-gray-300 dark:border-gray-700"
                            />
                        )}
                    />

                    {/* Comment */}
                    <Text className="text-black dark:text-white mb-1 font-medium">Коментар</Text>
                    <Controller
                        control={control}
                        name="comment"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Введіть коментар..."
                                placeholderTextColor="#888"
                                className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl mb-4 border border-gray-300 dark:border-gray-700"
                            />
                        )}
                    />

                    {/* Balance Selection */}
                    <Text className="text-black dark:text-white mb-2 font-medium">Баланс</Text>
                    <View className="flex-row flex-wrap mb-4">
                        {balances?.map((b) => (
                            <TouchableOpacity
                                key={b.id}
                                onPress={() => setValue("balanceId", b.id)}
                                className={`px-4 py-2 mr-2 mb-2 rounded-xl ${
                                    selectedBalanceId === b.id ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
                                }`}
                            >
                                <Text className={selectedBalanceId === b.id ? "text-white" : "text-black dark:text-white"}>
                                    {b.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Charges Section */}
                    <Text className="text-xl font-bold text-black dark:text-white mt-4 mb-2">Збори / Податки</Text>

                    {fields.map((field, index) => (
                        <View key={field.id} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl mb-4 border border-gray-200 dark:border-gray-700">
                            <View className="flex-row gap-2 mb-2">
                                <View className="flex-1">
                                    <Text className="text-xs text-gray-500 mb-1">Сума</Text>
                                    <Controller
                                        control={control}
                                        name={`charges.${index}.amount`}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                value={String(value)}
                                                onChangeText={(v) => onChange(Number(v))}
                                                keyboardType="decimal-pad"
                                                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg"
                                            />
                                        )}
                                    />
                                </View>
                                <View className="w-20">
                                    <Text className="text-xs text-gray-500 mb-1">%</Text>
                                    <Controller
                                        control={control}
                                        name={`charges.${index}.percentage`}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                value={String(value)}
                                                onChangeText={(v) => onChange(Number(v))}
                                                keyboardType="decimal-pad"
                                                className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded-lg"
                                            />
                                        )}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => remove(index)}
                                className="mt-2 py-2"
                            >
                                <Text className="text-red-500 text-center font-medium">Видалити збір</Text>
                            </TouchableOpacity>
                        </View>
                    ))}

                    <TouchableOpacity
                        onPress={() => append({ id: Date.now(), amount: 0, percentage: 0, type: EChargeType.Tax, applicationType: EChargeApplicationType.Add })}
                        className="bg-gray-200 dark:bg-gray-700 py-3 rounded-xl mb-6"
                    >
                        <Text className="text-center text-black dark:text-white">+ Додати збір</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={isUpdating}
                        className={`py-4 rounded-xl mb-10 ${isUpdating ? 'bg-emerald-800' : 'bg-emerald-600'}`}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {isUpdating ? "Збереження..." : "Зберегти зміни"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}