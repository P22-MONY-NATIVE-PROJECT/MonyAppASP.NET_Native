import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { useCreateOperationMutation } from "@/services/operationsService";
import { useGetBalancesQuery } from "@/services/balancesService";

import { ICreateOperationRequest } from "@/types/operation/ICreateOperationRequest";
import { EChargeApplicationType } from "@/types/operation/EChargeApplicationType";
import { EChargeType } from "@/types/operation/EChargeType";

interface Props {
    visible: boolean;
    category: any;
    onClose: () => void;
}

export default function OperationCreateSheet({
                                                 visible,
                                                 category,
                                                 onClose,
                                             }: Props) {
    const { data: balances } = useGetBalancesQuery();

    const [createOperation, { isLoading }] = useCreateOperationMutation();

    const [amount, setAmount] = useState("");
    const [comment, setComment] = useState("");
    const [balanceId, setBalanceId] = useState<number | null>(null);

    const [taxAmount, setTaxAmount] = useState("");
    const [taxPercent, setTaxPercent] = useState("");

    const [commissionAmount, setCommissionAmount] = useState("");
    const [commissionPercent, setCommissionPercent] = useState("");

    useEffect(() => {
        if (visible) {
            setAmount("");
            setComment("");
            setTaxAmount("");
            setTaxPercent("");
            setCommissionAmount("");
            setCommissionPercent("");

            if (balances?.length) {
                setBalanceId(balances[0].id);
            }
        }
    }, [visible]);

    const handleCreate = async () => {
        if (!amount || !balanceId) return;

        const request: ICreateOperationRequest = {
            initAmount: Number(amount),
            comment,
            categoryId: category.id,
            balanceId: balanceId
        };

        await createOperation(request);

        onClose();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View className="flex-1 justify-end bg-black/40">

                <View className="bg-white dark:bg-neutral-900 rounded-t-3xl p-5 max-h-[85%]">

                    <View className="items-center mb-4">
                        <View className="w-12 h-1.5 bg-gray-400 rounded-full"/>
                    </View>

                    <Text className="text-lg font-semibold text-center mb-4 text-black dark:text-white">
                        {category?.name}
                    </Text>

                    <ScrollView showsVerticalScrollIndicator={false}>

                        <Text className="mb-1 text-black dark:text-white">
                            Сума
                        </Text>

                        <TextInput
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="decimal-pad"
                            placeholder="0.00"
                            className="bg-gray-100 dark:bg-neutral-800 rounded-xl px-4 py-3 mb-3 text-black dark:text-white"
                        />

                        <Text className="mb-1 text-black dark:text-white">
                            Коментар
                        </Text>

                        <TextInput
                            value={comment}
                            onChangeText={setComment}
                            placeholder="Коментар"
                            className="bg-gray-100 dark:bg-neutral-800 rounded-xl px-4 py-3 mb-3 text-black dark:text-white"
                        />

                        <Text className="mb-2 text-black dark:text-white">
                            Баланс
                        </Text>

                        <View className="flex-row flex-wrap mb-4">
                            {balances?.map((b) => (
                                <TouchableOpacity
                                    key={b.id}
                                    onPress={() => setBalanceId(b.id)}
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

                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={handleCreate}
                            className="bg-black dark:bg-white py-4 rounded-xl items-center mb-6"
                        >
                            <Text className="text-white dark:text-black font-semibold">
                                Створити операцію
                            </Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>

            </View>
        </Modal>
    );
}