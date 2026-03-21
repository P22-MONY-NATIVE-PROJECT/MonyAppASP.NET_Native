import { FlatList, Alert, TouchableOpacity, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
} from "@/services/categoriesService";
import React from "react";
import {APP_URLS} from "@/constants/Urls";
import BalancesHeader from "@/components/balances/BalancesHeader";
import { ThemedMarqueeText } from "@/components/themed-marquee-text";
import * as Haptics from "expo-haptics";

interface Props {
    typeId: number;
}

export default function CategoriesListScreen({ typeId }: Props) {
    const router = useRouter();
    const { data, isLoading } = useGetCategoriesQuery({ typeId });
    const [deleteCategory] = useDeleteCategoryMutation();
    const [deleteMode, setDeleteMode] = React.useState(false);

    if (isLoading) {
        return (
            <ThemedView className="flex-1 items-center justify-center">
                <ThemedText>Loading...</ThemedText>
            </ThemedView>
        );
    }

    return (
        <ThemedView className="flex-1 relative">
            <BalancesHeader />
            <FlatList
                data={data}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 140,
                }}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 50,
                    marginBottom: 20,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="items-center relative"
                        onPress={() => {
                            if (deleteMode) {
                              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

                              Alert.alert(
                                "Delete Category",
                                `Delete "${item.name}"?`,
                                [
                                  { text: "Cancel", style: "cancel" },
                                  {
                                    text: "Delete",
                                    style: "destructive",
                                    onPress: () => deleteCategory(item.id),
                                  },
                                ]
                              );
                            } else {
                                router.push({
                                    pathname: "/category-modal",
                                    params: { id: item.id, typeId },
                                });
                            }
                        }}
                    >
                        <View className="bg-blue-400 w-24 h-24 rounded-3xl items-center justify-center relative">

                            <Image
                                source={{
                                    uri: APP_URLS.IMAGES_400_URL + item.icon,
                                }}
                                className="w-10 h-10"
                            />

                            {deleteMode && (
                                <View className="absolute inset-0 bg-black/40 rounded-3xl items-center justify-center">
                                    <Text className="text-white text-2xl font-bold">×</Text>
                                </View>
                            )}
                        </View>

                        <ThemedMarqueeText
                          text={item.name}
                          width={90}
                          type="defaultSemiBold"
                          style={{ textAlign: "center", marginTop: 8 }}
                        />
                    </TouchableOpacity>
                )}
            />

            <View className="absolute bottom-6 right-6 flex-row gap-3">
    
                <TouchableOpacity
                    onPress={() => setDeleteMode(prev => !prev)}
                    className={`px-5 py-3 rounded-full ${
                        deleteMode ? "bg-red-600" : "bg-gray-800"
                    }`}
                >
                    <Text className="text-white font-semibold">
                        {deleteMode ? "Cancel" : "Delete"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        router.push({
                            pathname: "/category-modal",
                            params: { typeId },
                        })
                    }
                    className="bg-emerald-700 px-6 py-3 rounded-full"
                >
                    <Text className="text-white font-semibold">
                        + Add
                    </Text>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}
