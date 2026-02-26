import React from "react";
import { View, Text } from "react-native";

interface Props {
    amount: number;
}

export default function TotalAmountCard({ amount }: Props) {
    return (
        <View className="bg-white dark:bg-black rounded-3xl p-6 mb-6 border border-gray-200 dark:border-gray-800">

            <Text className="text-gray-500 dark:text-gray-400 text-sm">
                Загальна сума
            </Text>

            <Text className="text-black dark:text-white text-3xl font-bold mt-2">
                ₴ {amount.toLocaleString()}
            </Text>

        </View>
    );
}