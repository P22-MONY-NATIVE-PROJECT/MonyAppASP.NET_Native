import React, { useState } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
} from "@/services/categoriesService";
import CategoryTile from "./CategoryTile";
import CategoryActionModal from "./CategoryActionModal";

interface Props {
    typeId: number;
    date: Date;
}

export default function CategoryGrid({ typeId }: Props) {
    const router = useRouter();
    const { data } = useGetCategoriesQuery({ typeId });
    const [deleteCategory] = useDeleteCategoryMutation();

    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    const categoriesWithAdd = [
        ...(data || []),
        { id: "add", isAdd: true },
    ];

    return (
        <>
            <FlatList
                data={categoriesWithAdd}
                numColumns={2}
                keyExtractor={(item: any) => item.id.toString()}
                columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
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
                            onLongPress={() => setSelectedCategory(item)}
                        />
                    );
                }}
            />

            <CategoryActionModal
                category={selectedCategory}
                onClose={() => setSelectedCategory(null)}
                onEdit={(id) => {
                    setSelectedCategory(null);
                    router.push({
                        pathname: "/category-modal",
                        params: { id, typeId },
                    });
                }}
                onDelete={(id) => {
                    deleteCategory(id);
                    setSelectedCategory(null);
                }}
            />
        </>
    );
}