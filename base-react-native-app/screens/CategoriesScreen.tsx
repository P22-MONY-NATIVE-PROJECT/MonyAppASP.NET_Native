import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
} from "@/services/categoriesService";

interface Props {
    typeId: number;
}

export default function CategoriesScreen({ typeId }: Props) {
    const router = useRouter();
    const { data, isLoading } = useGetCategoriesQuery({ typeId });
    const [deleteCategory] = useDeleteCategoryMutation();

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white p-4">
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: 12 }}
                renderItem={({ item }) => (
                    <View className="flex-row items-center justify-between bg-gray-100 p-4 rounded-xl">
                        <View className="flex-row items-center gap-3">
                            <Image
                                source={{ uri: item.icon }}
                                className="w-10 h-10 rounded-full"
                            />
                            <Text className="text-lg">{item.name}</Text>
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
                                <Text className="text-blue-500">Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => deleteCategory(item.id)}
                            >
                                <Text className="text-red-500">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
                <Text className="text-white">+ Додати</Text>
            </TouchableOpacity>
        </View>
    );
}