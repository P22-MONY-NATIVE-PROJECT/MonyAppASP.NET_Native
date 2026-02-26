import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface Props {
    category: any;
    onClose: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function CategoryActionModal({
                                                category,
                                                onClose,
                                                onEdit,
                                                onDelete,
                                            }: Props) {

    if (!category) return null;

    return (
        <Modal
            transparent
            animationType="fade"
            visible={!!category}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/60 items-center justify-center">

                <View className="bg-white w-72 rounded-2xl p-6">

                    <Text className="text-lg font-semibold mb-4">
                        {category.name}
                    </Text>

                    <TouchableOpacity
                        onPress={() => onEdit(category.id)}
                        className="mb-3"
                    >
                        <Text className="text-blue-600 text-base">
                            Редагувати
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => onDelete(category.id)}
                    >
                        <Text className="text-red-600 text-base">
                            Видалити
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onClose}
                        className="mt-6"
                    >
                        <Text className="text-center text-gray-500">
                            Скасувати
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>
    );
}