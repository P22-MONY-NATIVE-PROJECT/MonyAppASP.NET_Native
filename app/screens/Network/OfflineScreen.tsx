import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { useNetwork } from "@/context/NetworkContext";

export default function OfflineScreen() {
    const { recheckConnection, isLoading } = useNetwork();

    return (
        <View className="flex-1 items-center justify-center bg-white dark:bg-[#020617] px-6">

            <View className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 items-center justify-center mb-6">
                <Text className="text-3xl">📡</Text>
            </View>

            <Text className="text-2xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
                Немає з'єднання
            </Text>

            <Text className="text-slate-500 dark:text-slate-400 text-center mb-8">
                Ваші дані неможливо завантажити.
                Будь ласка, перевірте з'єднання і спробуйте знову
            </Text>

            <Pressable
                onPress={recheckConnection}
                disabled={isLoading}
                className="bg-green-600 active:bg-green-700 px-8 py-3 rounded-xl flex-row items-center"
            >
                {isLoading && (
                    <ActivityIndicator color="white" className="mr-3" />
                )}

                <Text className="text-white font-medium text-base">
                    {isLoading ? "Перевірка..." : "Підключити"}
                </Text>
            </Pressable>

        </View>
    );
}