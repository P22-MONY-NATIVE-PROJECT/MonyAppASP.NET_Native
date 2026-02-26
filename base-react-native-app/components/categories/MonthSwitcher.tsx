import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

interface Props {
    date: Date;
    onChange: (date: Date) => void;
}

export default function MonthSwitcher({ date, onChange }: Props) {

    const changeMonth = (direction: number) => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + direction);
        onChange(newDate);
    };

    const formatted = date.toLocaleDateString("uk-UA", {
        month: "long",
        year: "numeric",
    });

    return (
        <View className="flex-row items-center justify-between py-4">

            <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Text className="text-xl">◀</Text>
            </TouchableOpacity>

            <Text className="text-lg font-semibold capitalize">
                {formatted}
            </Text>

            <TouchableOpacity onPress={() => changeMonth(1)}>
                <Text className="text-xl">▶</Text>
            </TouchableOpacity>

        </View>
    );
}