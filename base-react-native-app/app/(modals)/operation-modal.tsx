import React, { useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useGetBalancesQuery } from "@/services/balancesService";
import {
    useEditOperationMutation,
    useGetOperationByIdQuery,
} from "@/services/operationsService";

import { EChargeApplicationType } from "@/types/operation/EChargeApplicationType";
import { EChargeType } from "@/types/operation/EChargeType";
import { IEditOperationRequest } from "@/types/operation/IEditOperationRequest";

export default function OperationEditForm() {
    const router = useRouter();
    const { operationId } = useLocalSearchParams<{ operationId: string }>();
    const id = Number(operationId);
    const { refetch } = useGetBalancesQuery();

    const { data: operation, isLoading: isDataLoading } =
        useGetOperationByIdQuery({ id }, { skip: !id });

    const { data: balances } = useGetBalancesQuery();

    const [editOperation, { isLoading: isUpdating }] =
        useEditOperationMutation();

    const { control, handleSubmit, reset, watch, setValue } =
        useForm<IEditOperationRequest>({
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

    const chargeTypeMap: Record<string, EChargeType> = {
        Податок: EChargeType.Tax,
        Комісія: EChargeType.Commission,
    };

    const chargeApplicationTypeMap: Record<string, EChargeApplicationType> = {
        Додати: EChargeApplicationType.Add,
        Відняти: EChargeApplicationType.Subtract,
        Включено: EChargeApplicationType.Included,
    };

    useEffect(() => {
        if (operation) {
            reset({
                id: operation.id,
                comment: operation.comment ?? "",
                amount: operation.calcAmount ?? operation.initAmount,
                categoryId: operation.categoryId,
                balanceId: operation.balanceId,
                charges: operation.charges.map((c: any) => ({
                    id: c.id,
                    amount: c.amount,
                    percentage: c.percentage,
                    type: chargeTypeMap[c.type] ?? EChargeType.Tax,
                    applicationType:
                        chargeApplicationTypeMap[c.applicationType] ??
                        EChargeApplicationType.Add,
                })),
            });
        }
    }, [operation, reset]);

    const addCharge = () => {
        append({
            id: 0,
            amount: 0,
            percentage: 0,
            type: EChargeType.Tax,
            applicationType: EChargeApplicationType.Add,
        });
    };

    const onSubmit = async (data: IEditOperationRequest) => {
        console.log("SEND DTO:", JSON.stringify(data, null, 2));

        try {
            await editOperation(data).unwrap();
            refetch();
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

                    <Text className="text-black dark:text-white mb-1 font-medium">
                        Сума
                    </Text>

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

                    <Text className="text-black dark:text-white mb-1 font-medium">
                        Коментар
                    </Text>

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

                    <Text className="text-black dark:text-white mb-2 font-medium">
                        Баланс
                    </Text>

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

                    <Text className="text-black dark:text-white mb-2 font-medium">
                        Charges
                    </Text>

                    {fields.map((field, index) => {
                        const chargeType = watch(`charges.${index}.type`);
                        const chargeApplicationType = watch(
                            `charges.${index}.applicationType`
                        );

                        return (
                            <View
                                key={field.id}
                                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mb-3"
                            >
                                <Text className="text-black dark:text-white mb-1">
                                    Amount
                                </Text>

                                <Controller
                                    control={control}
                                    name={`charges.${index}.amount`}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            value={value ? String(value) : ""}
                                            onChangeText={(v) =>
                                                onChange(Number(v))
                                            }
                                            keyboardType="decimal-pad"
                                            className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 mb-2 text-black dark:text-white"
                                        />
                                    )}
                                />

                                <Text className="text-black dark:text-white mb-1">
                                    Percentage
                                </Text>

                                <Controller
                                    control={control}
                                    name={`charges.${index}.percentage`}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            value={value ? String(value) : ""}
                                            onChangeText={(v) =>
                                                onChange(Number(v))
                                            }
                                            keyboardType="decimal-pad"
                                            className="bg-white dark:bg-gray-700 rounded-lg px-3 py-2 mb-2 text-black dark:text-white"
                                        />
                                    )}
                                />

                                <Text className="text-black dark:text-white mb-1">
                                    Type
                                </Text>

                                <View className="flex-row mb-2">
                                    {Object.values(EChargeType)
                                        .filter((v) => typeof v === "number")
                                        .map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                onPress={() =>
                                                    setValue(
                                                        `charges.${index}.type`,
                                                        type as EChargeType
                                                    )
                                                }
                                                className={`px-3 py-1 mr-2 rounded-lg ${
                                                    chargeType === type
                                                        ? "bg-blue-500"
                                                        : "bg-gray-300 dark:bg-gray-700"
                                                }`}
                                            >
                                                <Text
                                                    className={
                                                        chargeType === type
                                                            ? "text-white"
                                                            : "text-black dark:text-white"
                                                    }
                                                >
                                                    {EChargeType[type as number]}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>

                                <Text className="text-black dark:text-white mb-1">
                                    Application
                                </Text>

                                <View className="flex-row flex-wrap mb-2">
                                    {Object.values(EChargeApplicationType)
                                        .filter((v) => typeof v === "number")
                                        .map((type) => (
                                            <TouchableOpacity
                                                key={type}
                                                onPress={() =>
                                                    setValue(
                                                        `charges.${index}.applicationType`,
                                                        type as EChargeApplicationType
                                                    )
                                                }
                                                className={`px-3 py-1 mr-2 mb-2 rounded-lg ${
                                                    chargeApplicationType === type
                                                        ? "bg-blue-500"
                                                        : "bg-gray-300 dark:bg-gray-700"
                                                }`}
                                            >
                                                <Text
                                                    className={
                                                        chargeApplicationType ===
                                                        type
                                                            ? "text-white"
                                                            : "text-black dark:text-white"
                                                    }
                                                >
                                                    {
                                                        EChargeApplicationType[
                                                            type as number
                                                            ]
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                </View>

                                <TouchableOpacity
                                    onPress={() => remove(index)}
                                    className="bg-red-500 py-2 rounded-lg items-center mt-2"
                                >
                                    <Text className="text-white">
                                        Remove charge
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}

                    <TouchableOpacity
                        onPress={addCharge}
                        className="bg-gray-300 dark:bg-gray-700 py-3 rounded-xl items-center mb-6"
                    >
                        <Text className="text-black dark:text-white">
                            Add charge
                        </Text>
                    </TouchableOpacity>

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