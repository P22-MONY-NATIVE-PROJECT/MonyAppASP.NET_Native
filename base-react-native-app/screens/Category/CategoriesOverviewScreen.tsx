import React, { useState } from "react";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";
import MonthSwitcher from "@/components/categories/MonthSwitcher";
import CategoryGrid from "@/components/categories/CategoryGrid";
import BalancesHeader from "@/components/balances/BalancesHeader";

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

                <BalancesHeader />

                <CategoryGrid
                    typeId={typeId}
                    date={currentDate}
                />

            </SafeAreaView>
        </ThemedView>
    );
}