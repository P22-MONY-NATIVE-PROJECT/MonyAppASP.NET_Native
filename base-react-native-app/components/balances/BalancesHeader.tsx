import React, {useState} from "react";
import {View, Text, FlatList, Pressable, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useDeleteBalanceMutation, useGetBalancesQuery} from "@/services/balancesService";
import { useRouter } from "expo-router";
import BalanceActionModal from "@/components/balances/BalanceActionModal";

export default function BalancesHeader() {
    const { data } = useGetBalancesQuery();
    const router = useRouter();

    const [selectedBalance, setSelectedBalance] = useState<any>(null);

    const [deleteBalance] = useDeleteBalanceMutation();

    const totalBalance =
        data?.reduce(
            (sum, b) => sum + (b.amount * b.currency!.dollarExchangeRate),
            0
        ) ?? 0;

    return (
        <>
            <View className="bg-emerald-500 dark:bg-emerald-800 pb-6 mb-6 rounded-b-[40px]">
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
                        data={data ?? []}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingTop: 20,
                            gap: 16,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onLongPress={() => setSelectedBalance(item)}
                                className={`
                                p-4 rounded-2xl w-40
                                ${
                                    item.isSaving
                                        ? "bg-yellow-400 dark:bg-yellow-700"
                                        : "bg-emerald-400 dark:bg-emerald-700"
                                }
                            `}
                            >
                                <Text className="text-white font-semibold">
                                    {item.name}
                                </Text>

                                <Text className="text-white text-xl font-bold mt-2">
                                    {item.currency?.symbol}
                                    {item.amount.toFixed(2)}
                                </Text>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={
                            <Pressable
                                onPress={() =>
                                    router.push({
                                        pathname: "/balance-modal",
                                    })
                                }
                                className="
                                bg-emerald-400 dark:bg-emerald-700
                                p-4 py-6 rounded-2xl w-40
                                items-center justify-center
                            "
                            >
                                <Text className="text-white text-4xl font-bold">
                                    +
                                </Text>
                            </Pressable>
                        }
                    />
                </SafeAreaView>
            </View>

            <BalanceActionModal
                balance={selectedBalance}
                onClose={() => setSelectedBalance(null)}
                onEdit={(id) => {
                    setSelectedBalance(null);
                    router.push({
                        pathname: "/balance-modal",
                        params: { id },
                    });
                }}
                onDelete={(id) => {
                    deleteBalance(id);
                    setSelectedBalance(null);
                }}
            />
        </>
    );
}