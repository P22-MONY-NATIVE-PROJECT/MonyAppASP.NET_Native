import React, { useState } from "react";
import { ScrollView, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";

type TabItem = {
    id: number;
    name: string;
};

type Props = {
    tabs: TabItem[];
    renderScene: (typeId: number) => React.ReactNode;
};

export default function CustomBottomTabs({ tabs, renderScene }: Props) {
    const [activeId, setActiveId] = useState<number>(tabs[0]?.id);

    if (!tabs?.length) return null;

    return (
        <ThemedView className="flex-1">
            <SafeAreaView edges={["top"]} className="flex-1">
                {activeId && renderScene(activeId)}
            </SafeAreaView>

            <SafeAreaView
                edges={["bottom"]}
                className="border-t border-gray-200 dark:border-gray-800"
            >
                <ThemedView className="py-3">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 12,
                            flexGrow: 1,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {tabs.map((tab) => {
                            const isActive = tab.id === activeId;

                            return (
                                <Pressable
                                    key={tab.id}
                                    onPress={() => setActiveId(tab.id)}
                                    className={`px-6 py-3 mr-3 rounded-full ${
                                        isActive
                                            ? "bg-black dark:bg-gray-400"
                                            : "bg-gray-400 dark:bg-black"
                                    }`}
                                >
                                    <Text
                                        className={`text-base font-semibold ${
                                            isActive
                                                ? "text-white dark:text-black"
                                                : "text-black dark:text-white"
                                        }`}
                                    >
                                        {tab.name}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </ThemedView>
            </SafeAreaView>
        </ThemedView>
    );
}