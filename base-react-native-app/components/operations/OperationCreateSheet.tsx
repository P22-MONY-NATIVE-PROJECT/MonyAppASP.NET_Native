import React, { useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Controller, useForm } from "react-hook-form";

import { useCreateOperationMutation } from "@/services/operationsService";
import { useGetBalancesBySavingQuery, useGetBalancesQuery } from "@/services/balancesService";

import { ICreateOperationRequest } from "@/types/operation/ICreateOperationRequest";
import { EChargeApplicationType } from "@/types/operation/EChargeApplicationType";
import { EChargeType } from "@/types/operation/EChargeType";

interface Props {
    visible: boolean;
    category: any;
    typeId: number;
    onClose: () => void;
}

export default function OperationCreateSheet({
                                                 visible,
                                                 category,
                                                 typeId,
                                                 onClose,
                                             }: Props) {
    const SAVINGS_TYPE_ID = 2;
    const isSavingsCategory = typeId === SAVINGS_TYPE_ID;
    const isRegularCategory = !isSavingsCategory;

    const { data: savingBalances } = useGetBalancesBySavingQuery(
        { isSaving: true },
        { skip: !isSavingsCategory }
    );

    const { data: regularBalances } = useGetBalancesBySavingQuery(
        { isSaving: false },
        { skip: !isRegularCategory }
    );

    const balances = isSavingsCategory ? savingBalances : regularBalances;

    const { refetch: refetchBalances } = useGetBalancesQuery();

    const [createOperation, { isLoading }] = useCreateOperationMutation();

    const { control, handleSubmit, reset, watch, setValue } =
        useForm<ICreateOperationRequest>({
            defaultValues: {
                initAmount: 0,
                comment: "",
                categoryId: 0,
                balanceId: 0,
                charges: [],
            },
        });

    const balanceId = watch("balanceId");
    const charges = watch("charges") || [];

    useEffect(() => {
        if (visible && balances && balances.length > 0) {
            reset({
                initAmount: 0,
                comment: "",
                categoryId: category?.id,
                balanceId: balances[0].id,
                charges: [],
            });
        }
    }, [visible, balances]);

    const handleCreate = async (data: ICreateOperationRequest) => {
        const request: ICreateOperationRequest = {
            ...data,
            categoryId: category.id,
            charges: data.charges ?? [],
        };

        console.log("----send server data----", request);

        try {
            await createOperation(request).unwrap();
            await refetchBalances();

            onClose();
        } catch (error) {
            console.error("Error creating operation:", error);
        }
    };

    const addCharge = () => {
        setValue("charges", [
            ...charges,
            {
                amount: 0,
                percentage: 0,
                applicationType: EChargeApplicationType.Add,
                type: EChargeType.Tax,
            },
        ]);
    };

    const removeCharge = (index: number) => {
        const updated = [...charges];
        updated.splice(index, 1);
        setValue("charges", updated);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View className="flex-1 justify-end bg-black/40">

                <TouchableOpacity
                    className="absolute inset-0"
                    activeOpacity={1}
                    onPress={onClose}
                />

                <View className="bg-white dark:bg-neutral-900 rounded-t-3xl p-5 max-h-[85%]">

                    <View className="items-center mb-4">
                        <View className="w-12 h-1.5 bg-gray-400 rounded-full" />
                    </View>

                    <Text className="text-lg font-semibold text-center mb-4 text-black dark:text-white">
                        {category?.name}
                    </Text>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >

                        <Text className="mb-1 text-black dark:text-white">
                            Amount
                        </Text>

                        <Controller
                            control={control}
                            name="initAmount"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value ? String(value) : ""}
                                    onChangeText={(v) => onChange(Number(v))}
                                    keyboardType="decimal-pad"
                                    placeholder="Enter amount"
                                    className="bg-gray-100 dark:bg-neutral-800 rounded-xl px-4 py-3 mb-3 text-black dark:text-white"
                                />
                            )}
                        />

                        <Text className="mb-1 text-black dark:text-white">
                            Comment
                        </Text>

                        <Controller
                            control={control}
                            name="comment"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Comment"
                                    className="bg-gray-100 dark:bg-neutral-800 rounded-xl px-4 py-3 mb-3 text-black dark:text-white"
                                />
                            )}
                        />

                        <Text className="mb-2 text-black dark:text-white">
                            Balance
                        </Text>

                        <Controller
                            control={control}
                            name="balanceId"
                            render={({ field: { onChange } }) => (
                                <View className="flex-row flex-wrap mb-4">
                                    {balances?.map((b) => (
                                        <TouchableOpacity
                                            key={b.id}
                                            onPress={() => onChange(b.id)}
                                            className={`px-4 py-2 mr-2 mb-2 rounded-xl ${
                                                balanceId === b.id
                                                    ? "bg-blue-500"
                                                    : "bg-gray-200 dark:bg-neutral-800"
                                            }`}
                                        >
                                            <Text
                                                className={`${
                                                    balanceId === b.id
                                                        ? "text-white"
                                                        : "text-black dark:text-white"
                                                }`}
                                            >
                                                {b.name}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        />

                        <Text className="mb-2 text-black dark:text-white">
                            Charges
                        </Text>

                        {charges.map((_, index) => {
                            const chargeType = watch(`charges.${index}.type`);
                            const chargeApplicationType = watch(
                                `charges.${index}.applicationType`
                            );

                            return (
                                <View
                                    key={index}
                                    className="bg-gray-100 dark:bg-neutral-800 rounded-xl p-3 mb-3"
                                >
                                    <Text className="mb-1 text-black dark:text-white">
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
                                                placeholder="Charge amount"
                                                keyboardType="decimal-pad"
                                                className="bg-white dark:bg-neutral-700 rounded-lg px-3 py-2 mb-2 text-black dark:text-white"
                                            />
                                        )}
                                    />

                                    <Text className="mb-1 text-black dark:text-white">
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
                                                placeholder="0-100"
                                                keyboardType="decimal-pad"
                                                className="bg-white dark:bg-neutral-700 rounded-lg px-3 py-2 mb-2 text-black dark:text-white"
                                            />
                                        )}
                                    />

                                    <Text className="mb-1 text-black dark:text-white">
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
                                                            : "bg-gray-300 dark:bg-neutral-700"
                                                    }`}
                                                >
                                                    <Text
                                                        className={`${
                                                            chargeType === type
                                                                ? "text-white"
                                                                : "text-black dark:text-white"
                                                        }`}
                                                    >
                                                        {EChargeType[type as number]}
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                    </View>

                                    <Text className="mb-1 text-black dark:text-white">
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
                                                            : "bg-gray-300 dark:bg-neutral-700"
                                                    }`}
                                                >
                                                    <Text
                                                        className={`${
                                                            chargeApplicationType === type
                                                                ? "text-white"
                                                                : "text-black dark:text-white"
                                                        }`}
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
                                        onPress={() => removeCharge(index)}
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
                            className="bg-gray-300 dark:bg-neutral-700 py-3 rounded-xl items-center mb-4"
                        >
                            <Text className="text-black dark:text-white">
                                Add charge
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={handleSubmit(handleCreate)}
                            className="bg-black dark:bg-white py-4 rounded-xl items-center mb-6"
                        >
                            <Text className="text-white dark:text-black font-semibold">
                                Create operation
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}