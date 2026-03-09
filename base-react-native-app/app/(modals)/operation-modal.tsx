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
import { useLocalSearchParams, useRouter } from "expo-router";

import { useGetBalancesQuery } from "@/services/balancesService";
import { useEditOperationMutation, useGetOperationByIdQuery } from "@/services/operationsService";
import { EChargeApplicationType } from "@/types/operation/EChargeApplicationType";
import { EChargeType } from "@/types/operation/EChargeType";
import { IEditOperationRequest } from "@/types/operation/IEditOperationRequest";

export default function OperationEditForm() {
    const router = useRouter();

    const { operationId } = useLocalSearchParams<{ operationId: string }>();

    const id = Number(operationId);

    const { data: operation, isLoading: isDataLoading } =
        useGetOperationByIdQuery({ id }, { skip: !id });

    const { data: balances } = useGetBalancesQuery();
    const [editOperation, { isLoading: isUpdating }] = useEditOperationMutation();

    const { control, handleSubmit, reset, watch, setValue } = useForm<IEditOperationRequest>({
        defaultValues: {
            id: id,
            comment: "",
            amount: 0,
            categoryId: 0,
            balanceId: 0,
            charges: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "charges",
    });

    const selectedBalanceId = watch("balanceId");

    useEffect(() => {
        if (operation) {
            console.log("Данні отримано:", operation);

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
            router.back();
        } catch (error) {
            console.error("Failed to update operation:", error);
        }
    };

    if (isDataLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
                <ActivityIndicator size="large" color="#10b981" />
            </View>
        );
    }

    console.log("Id:", id);
    console.log("Operation data:", operation);

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ padding: 16 }}>
                    <Text className="text-2xl font-bold text-center text-black dark:text-white mb-6">
                        Редагувати операцію
                    </Text>

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

                    <Text className="text-black dark:text-white mb-2 font-medium">Баланс</Text>

                    <View className="flex-row flex-wrap mb-4">
                        {balances?.map((b) => (
                            <TouchableOpacity
                                key={b.id}
                                onPress={() => setValue("balanceId", b.id)}
                                className={`px-4 py-2 mr-2 mb-2 rounded-xl ${
                                    selectedBalanceId === b.id
                                        ? "bg-blue-500"
                                        : "bg-gray-200 dark:bg-gray-700"
                                }`}
                            >
                                <Text
                                    className={
                                        selectedBalanceId === b.id
                                            ? "text-white"
                                            : "text-black dark:text-white"
                                    }
                                >
                                    {b.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        disabled={isUpdating}
                        className={`py-4 rounded-xl mb-10 ${
                            isUpdating ? "bg-emerald-800" : "bg-emerald-600"
                        }`}
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