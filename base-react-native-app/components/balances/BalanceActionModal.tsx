import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import {IBalanceResponse} from "@/types/finance/IBalanceResponse";

interface Props {
    balance: IBalanceResponse;
    onClose: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function BalanceActionModal({
                                                balance,
                                                onClose,
                                                onEdit,
                                                onDelete,
                                            }: Props) {

    if (!balance) return null;

    return (
        <Modal
            transparent
            animationType="fade"
            visible={!!balance}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/50 dark:bg-black/70 items-center justify-center">

                <View className="bg-white dark:bg-black w-72 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">

                    <Text className="text-lg font-semibold mb-4 text-black dark:text-white">
                        {balance.name}
                    </Text>

                    <TouchableOpacity
                        onPress={() => onEdit(balance.id)}
                        className="mb-3"
                    >
                        <Text className="text-black dark:text-white text-base">
                            Редагувати
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onDelete(balance.id)}
                    >
                        <Text className="text-black dark:text-white text-base">
                            Видалити
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onClose}
                        className="mt-6"
                    >
                        <Text className="text-center text-gray-500 dark:text-gray-400">
                            Скасувати
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
}