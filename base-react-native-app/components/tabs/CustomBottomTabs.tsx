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
                className="border-t border-emerald-500"
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
                                            ? "bg-emerald-500"
                                            : "bg-black/40 dark:bg-white/20"
                                    }`}
                                >
                                    <Text
                                        className={`text-base font-semibold ${
                                            isActive
                                                ? "text-white"
                                                : "text-white"
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
