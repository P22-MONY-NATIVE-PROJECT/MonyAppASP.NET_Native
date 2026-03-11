import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import {Ionicons} from "@expo/vector-icons";

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

    const formattedMonth = date.toLocaleDateString("uk-UA", { month: "long" });
    const formattedYear = date.toLocaleDateString("uk-UA", { year: "numeric" });

    return (
        <View className="flex-row items-center justify-between py-2 px-1  ">

            <TouchableOpacity
                onPress={() => changeMonth(-1)}
                className="p-3 active:opacity-50"
            >
                <Ionicons name="chevron-back" size={24} color="#71717a" />
            </TouchableOpacity>

            <View className="items-center">
                <Text className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                    {formattedYear}
                </Text>
                <Text className="text-lg font-bold capitalize text-black dark:text-white">
                    {formattedMonth}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => changeMonth(1)}
                className="p-3 active:opacity-50"
            >
                <Ionicons name="chevron-forward" size={24} color="#71717a" />
            </TouchableOpacity>

        </View>
    );
}