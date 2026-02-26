import React from "react";
import { View, Text } from "react-native";

interface Props {
    amount: number;
}

export default function TotalAmountCard({ amount }: Props) {
    return (
        <View className="bg-neutral-900 rounded-3xl p-6 mb-6">

            <Text className="text-gray-400 text-sm">
                Загальна сума
            </Text>

            <Text className="text-white text-3xl font-bold mt-2">
                ₴ {amount.toLocaleString()}
            </Text>

        </View>
    );
}