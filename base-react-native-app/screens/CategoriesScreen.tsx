import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
} from "@/services/categoriesService";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    typeId: number;
}

export default function CategoriesScreen({ typeId }: Props) {
    const router = useRouter();
    const { data, isLoading } = useGetCategoriesQuery({ typeId });
    const [deleteCategory] = useDeleteCategoryMutation();

    if (isLoading) {
        return (
            <ThemedView className="flex-1 items-center justify-center">
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView className="flex-1 relative">
            <SafeAreaView>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <ThemedView className="flex-row items-center justify-between p-4 rounded-2xl">
                            <View className="flex-row items-center gap-3">
                                <Image
                                    source={{ uri: item.icon }}
                                    className="w-10 h-10 rounded-full"
                                />
                                <ThemedText type="defaultSemiBold">
                                    {item.name}
                                </ThemedText>
                            </View>

                            <View className="flex-row gap-4">
                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname: "/category-modal",
                                            params: { id: item.id, typeId },
                                        })
                                    }
                                >
                                    <ThemedText type="link">Edit</ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => deleteCategory(item.id)}
                                >
                                    <ThemedText style={{ color: "red" }}>
                                        Delete
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </ThemedView>
                    )}
                />

                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/category-modal",
                            params: { typeId },
                        })
                    }
                    className="absolute bottom-6 right-6 bg-black px-6 py-3 rounded-full"
                >
                    <Text className="text-white font-semibold">
                        + Додати
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ThemedView>
    );
}