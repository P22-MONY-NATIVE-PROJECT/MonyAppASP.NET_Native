import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";

import { useGetOperationsQuery, useDeleteOperationMutation } from "@/services/operationsService";
import MonthSwitcher from "@/components/categories/MonthSwitcher";
import { AppLoader } from "@/components/ui/app-loader";

export default function OperationsArchiveScreen() {
    const router = useRouter();

    const { data, isLoading } = useGetOperationsQuery();
    const [deleteOperation] = useDeleteOperationMutation();

    const [currentDate, setCurrentDate] = useState(new Date());
    const [actionOperation, setActionOperation] = useState<any>(null);

    const operations = data ?? [];

    const handleDelete = async (id: number) => {
        await deleteOperation({ id });
    };

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 px-4">

                <AppLoader visible={isLoading} message="Завантаження операцій..." />

                <MonthSwitcher date={currentDate} onChange={setCurrentDate} />

                <FlatList
                    data={operations}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.push({ pathname: "/operation-modal", params: { id: item.id } })}
                            onLongPress={() => setActionOperation(item)}
                            className="mb-3 p-4 rounded-2xl
                                       bg-white dark:bg-gray-900
                                       border border-gray-200 dark:border-gray-800
                                       flex-row justify-between items-center"
                        >
                            <View>
                                <Text className="text-base font-semibold text-black dark:text-white">
                                    {item.categoryName}
                                </Text>
                                {item.comment && (
                                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {item.comment}
                                    </Text>
                                )}
                            </View>
                            <Text className="text-lg font-bold text-black dark:text-white">
                                {Number(item.calcAmount ?? item.initAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Text>
                        </Pressable>
                    )}
                />

                {actionOperation && (
                    <View
                        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-6 rounded-t-3xl"
                    >
                        <Pressable
                            className="py-4"
                            onPress={() => {
                                router.push({ pathname: "/operation-modal", params: { id: actionOperation.id } });
                                setActionOperation(null);
                            }}
                        >
                            <Text className="text-lg text-blue-500 text-center">Редагувати</Text>
                        </Pressable>

                        <Pressable
                            className="py-4"
                            onPress={() => {
                                handleDelete(actionOperation.id);
                                setActionOperation(null);
                            }}
                        >
                            <Text className="text-lg text-red-500 text-center">Видалити</Text>
                        </Pressable>

                        <Pressable className="py-4" onPress={() => setActionOperation(null)}>
                            <Text className="text-lg text-gray-500 text-center">Скасувати</Text>
                        </Pressable>
                    </View>
                )}

            </SafeAreaView>
        </ThemedView>
    );
}