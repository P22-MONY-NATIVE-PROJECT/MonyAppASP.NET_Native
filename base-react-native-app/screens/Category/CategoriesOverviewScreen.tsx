import React, { useState } from "react";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthSwitcher from "@/components/categories/MonthSwitcher";
import TotalAmountCard from "@/components/categories/TotalAmountCard";
import CategoryGrid from "@/components/categories/CategoryGrid";

interface Props {
    typeId: number;
}

export default function CategoriesOverviewScreen({ typeId }: Props) {
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1 px-4">

                <MonthSwitcher
                    date={currentDate}
                    onChange={setCurrentDate}
                />

                <TotalAmountCard
                    amount={12345}
                />

                <CategoryGrid
                    typeId={typeId}
                    date={currentDate}
                />

            </SafeAreaView>
        </ThemedView>
    );
}