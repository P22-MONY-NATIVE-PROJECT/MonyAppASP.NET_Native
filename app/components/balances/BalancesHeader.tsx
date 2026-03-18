import React, {useState} from "react";
import {View, Text, FlatList, Pressable, TouchableOpacity, Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useDeleteBalanceMutation, useGetBalancesQuery} from "@/services/balancesService";
import { useRouter } from "expo-router";
import BalanceActionModal from "@/components/balances/BalanceActionModal";
import {Ionicons} from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { APP_URLS } from "@/constants/Urls";

export default function BalancesHeader() {
    const { data } = useGetBalancesQuery();
    const router = useRouter();
    const [selectedBalance, setSelectedBalance] = useState<any>(null);
    const [deleteBalance] = useDeleteBalanceMutation();
    const user = useSelector((state: RootState) => state.auth.user);

    const totalBalance =
        data?.reduce(
            (sum, b) => sum + (b.amount * b.currency!.dollarExchangeRate),
            0
        ) ?? 0;

    const handleLongPress = (item: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setSelectedBalance(item);
    };

    const getInitials = (name: string) =>
        name?.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() ?? '?';

    return (
        <>
            <View className="bg-emerald-500 dark:bg-emerald-800 pb-6 mb-6 rounded-b-[20px]">
                <SafeAreaView edges={["top"]}>
                    <View className="px-6 pt-2 flex-row items-start justify-between">
                        {/* Balance info */}
                        <View>
                            <Text className="text-white text-lg font-semibold">
                                Загальний баланс
                            </Text>
                            <Text className="text-white text-3xl font-bold mt-2">
                                ${totalBalance.toFixed(2)}
                            </Text>
                        </View>

                        {/* Profile avatar */}
                        <TouchableOpacity
                            onPress={() => router.push('/profile')}
                            activeOpacity={0.8}
                            style={{ borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', borderRadius: 999 }}
                            className="w-11 h-11 rounded-full overflow-hidden bg-white/20 items-center justify-center mt-1"
                        >
                            {user?.image ? (
                                <Image
                                    source={{ uri: APP_URLS.IMAGES_400_URL + user.image }}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <Text className="text-white text-sm font-bold">
                                    {getInitials(user?.name ?? '')}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={data ?? []}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                            paddingTop: 20,
                            gap: 16,
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onLongPress={() => handleLongPress(item)}
                                activeOpacity={0.9}
                                className={`
                                    p-5 rounded-[32px] w-44 h-28 justify-between shadow-sm
                                    ${item.isSaving ? "bg-amber-400" : "bg-emerald-400/90"}
                                `}
                            >
                                <View className="flex-row justify-between items-start">
                                    <Text className="text-white/90 font-bold text-sm uppercase tracking-tighter" numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    {item.isSaving && <Ionicons name="leaf" size={14} color="white" />}
                                </View>
                                <Text className="text-white text-xl font-black">
                                    <Text className="text-lg opacity-70 font-medium">{item.currency?.symbol}</Text>
                                    {item.amount.toLocaleString("uk-UA", { minimumFractionDigits: 2 })}
                                </Text>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={
                            <Pressable
                                onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    router.push("/balance-modal");
                                }}
                                className="bg-white/20 border-2 border-dashed border-white/30 p-4 rounded-[32px] w-24 h-28 items-center justify-center"
                            >
                                <Ionicons name="add" size={32} color="white" />
                            </Pressable>
                        }
                    />
                </SafeAreaView>
            </View>
            <BalanceActionModal
                balance={selectedBalance}
                onClose={() => setSelectedBalance(null)}
                onEdit={(id) => {
                    setSelectedBalance(null);
                    router.push({
                        pathname: "/balance-modal",
                        params: { id },
                    });
                }}
                onDelete={(id) => {
                    deleteBalance(id);
                    setSelectedBalance(null);
                }}
            />
        </>
    );
}
