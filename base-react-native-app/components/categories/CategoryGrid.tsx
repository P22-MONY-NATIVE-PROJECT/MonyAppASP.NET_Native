import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
} from "@/services/categoriesService";
import CategoryTile from "./CategoryTile";
import CategoryActionModal from "./CategoryActionModal";
import { AppLoader } from "@/components/ui/app-loader";
import OperationCreateSheet from "@/components/operations/OperationCreateSheet";

interface Props {
    typeId: number;
    date: Date;
}

export default function CategoryGrid({ typeId }: Props) {
    const router = useRouter();

    const { data, isLoading: apiLoading } = useGetCategoriesQuery({ typeId });
    const [deleteCategory] = useDeleteCategoryMutation();

    const isLoading = apiLoading;

    const [actionCategory, setActionCategory] = useState<any>(null);
    const [createCategory, setCreateCategory] = useState<any>(null);

    const categoriesWithAdd = [
        ...(data || []),
        { id: "add", isAdd: true },
    ];

    return (
        <>
            <AppLoader
                visible={isLoading}
                message="Завантаження категорій..."
            />

            <Pressable
                onPress={() => router.push("/operation")}
                className="mb-4 bg-blue-500 p-3 rounded-xl items-center"
            >
                <Text className="text-white font-semibold">
                    Архів операцій
                </Text>
            </Pressable>

            <FlatList
                data={categoriesWithAdd}
                numColumns={2}
                keyExtractor={(item: any) => item.id.toString()}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginBottom: 16,
                }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }: any) => {
                    if (item.isAdd) {
                        return (
                            <CategoryTile
                                isAdd
                                onPress={() =>
                                    router.push({
                                        pathname: "/category-modal",
                                        params: { typeId },
                                    })
                                }
                            />
                        );
                    }

                    return (
                        <CategoryTile
                            category={item}
                            onPress={() => setCreateCategory(item)}
                            onLongPress={() => setActionCategory(item)}
                        />
                    );
                }}
            />

            <CategoryActionModal
                category={actionCategory}
                onClose={() => setActionCategory(null)}
                onEdit={(id) => {
                    setActionCategory(null);
                    router.push({
                        pathname: "/category-modal",
                        params: { id, typeId },
                    });
                }}
                onDelete={(id) => {
                    deleteCategory(id);
                    setActionCategory(null);
                }}
            />

            <OperationCreateSheet
                visible={!!createCategory}
                category={createCategory}
                onClose={() => setCreateCategory(null)}
            />
        </>
    );
}