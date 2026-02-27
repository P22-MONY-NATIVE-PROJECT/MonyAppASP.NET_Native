import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetBalancesQuery } from "@/services/balancesService";

export default function BalancesHeader() {
    const { data } = useGetBalancesQuery();

    const totalBalance =
        data?.reduce((sum, b) => sum + b.amount, 0) ?? 0;

    return (
        <View className="bg-emerald-500 pb-6 mb-6 rounded-b-[40px]">
            <SafeAreaView edges={["top"]}>
                <View className="px-6 pt-4">
                    <Text className="text-white text-lg font-semibold">
                        Total Balance
                    </Text>
                    <Text className="text-white text-3xl font-bold mt-2">
                        ${totalBalance.toFixed(2)}
                    </Text>
                </View>

                <FlatList
                    data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        gap: 16
                    }}
                    renderItem={({ item }) => (
                        <View className="bg-white/20 p-4 rounded-2xl w-40">
                            <Text className="text-white font-semibold">
                                {item.name}
                            </Text>

                            <Text className="text-white text-xl font-bold mt-2">
                                {item.currency?.symbol}
                                {item.amount.toFixed(2)}
                            </Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
}
