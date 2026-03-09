import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";

import {
    useGetOperationsQuery,
    useDeleteOperationMutation
} from "@/services/operationsService";

import MonthSwitcher from "@/components/categories/MonthSwitcher";
import { AppLoader } from "@/components/ui/app-loader";

export default function OperationsArchiveScreen() {

    const router = useRouter();

    const { data, isLoading } = useGetOperationsQuery();
    const [deleteOperation] = useDeleteOperationMutation();

    const [currentDate, setCurrentDate] = useState(new Date());

    const operations = data ?? [];

    const handleDelete = async (id: number) => {
        await deleteOperation({ id });
    };

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 px-3">

                <AppLoader
                    visible={isLoading}
                    message="Завантаження операцій..."
                />

                <MonthSwitcher
                    date={currentDate}
                    onChange={setCurrentDate}
                />

                <FlatList
                    data={operations}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 20, paddingBottom: 120 }}
                    renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center py-3 border-b border-neutral-200">

                            <View>
                                <Text className="text-base font-semibold">
                                    {item.categoryName}
                                </Text>

                                <Text className="text-sm text-neutral-500">
                                    {item.description}
                                </Text>
                            </View>

                            <View className="items-end">

                                <Text className="text-base font-bold">
                                    {item.amount}
                                </Text>

                                <View className="flex-row mt-1">

                                    <Pressable
                                        className="mr-3"
                                        onPress={() =>
                                            router.push({
                                                pathname: "/operation-modal",
                                                params: { id: item.id }
                                            })
                                        }
                                    >
                                        <Text className="text-blue-500">
                                            Edit
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        onPress={() => handleDelete(item.id)}
                                    >
                                        <Text className="text-red-500">
                                            Delete
                                        </Text>
                                    </Pressable>

                                </View>

                            </View>

                        </View>
                    )}
                />

                <Pressable
                    className="absolute bottom-6 right-6 bg-black px-5 py-3 rounded-full"
                    onPress={() => router.push("/operation-modal")}
                >
                    <Text className="text-white font-semibold">
                        + Operation
                    </Text>
                </Pressable>

            </SafeAreaView>
        </ThemedView>
    );
}