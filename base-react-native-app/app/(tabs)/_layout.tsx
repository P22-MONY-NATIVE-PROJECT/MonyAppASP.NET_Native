import { Tabs } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            }}
        >
            <Tabs.Screen
                name="expenses"
                options={{
                    title: "Витрати",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="arrow.down.circle.fill" size={26} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="income"
                options={{
                    title: "Надходження",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="arrow.up.circle.fill" size={26} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}