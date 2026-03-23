import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { SquareImagePicker } from "@/components/form/SquareImagePicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { APP_URLS } from "@/constants/Urls";
import {
    useCreateBalanceMutation,
    useEditBalanceMutation,
    useGetBalanceByIdQuery,
} from "@/services/balancesService";
import { IImageFile } from "@/types/common/IImageFile";
import {AppLoader} from "@/components/ui/app-loader";
import { BackButton } from "@/components/ui/BackButton";

interface BalanceFormState {
    name: string;
    existingIcon: string | null;
    newIcon?: IImageFile;
    currencyId: number;
    amount: number;
    isSaving: boolean;
}

export default function BalanceModal() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const isEdit = !!id;

    const { data, isLoading: isLoadingBalance } = useGetBalanceByIdQuery(
        { id: Number(id) },
        { skip: !isEdit }
    );

    const [createBalance, {isLoading: isLoadingCreateBalance}] = useCreateBalanceMutation();
    const [updateBalance, {isLoading: isLoadingUpdateBalance}] = useEditBalanceMutation();

    const isLoading = isLoadingBalance || isLoadingCreateBalance || isLoadingUpdateBalance;

    const [form, setForm] = useState<BalanceFormState>({
        name: "",
        existingIcon: null,
        newIcon: undefined,
        currencyId: 1,
        amount: 0,
        isSaving: false,
    });

    useEffect(() => {
        if (data) {
            setForm({
                name: data.name,
                existingIcon: data.icon ?? null,
                newIcon: undefined,
                currencyId: data.currencyId ?? 1,
                amount: data.amount ?? 0,
                isSaving: data.isSaving ?? false,
            });
        }
    }, [data]);

    const onSubmit = async () => {
        if (!form.name.trim()) return;

        try {
            if (isEdit) {
                await updateBalance({
                    id: Number(id),
                    name: form.name,
                    amount: form.amount,
                    currencyId: form.currencyId,
                    icon: form.newIcon,
                    isSaving: form.isSaving,
                }).unwrap();
            } else {
                await createBalance({
                    name: form.name,
                    amount: form.amount,
                    currencyId: form.currencyId,
                    icon: form.newIcon,
                    isSaving: form.isSaving,
                }).unwrap();
            }

            router.back();
        } catch (error) {
            console.error(error);
        }
    };

    // if (isEdit && isLoading) {
    //     return (
    //         <View className="flex-1 items-center justify-center bg-black">
    //             <Text className="text-white">Loading...</Text>
    //         </View>
    //     );
    // }

    return (
        <ThemedView className="flex-1">
            <SafeAreaView className="flex-1">
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    className="flex-1"
                >
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                        className="px-6"
                    >

                        <AppLoader
                            visible={isLoading}
                            message="Завантаження категорій..."
                        />

                        <View className="flex-1 justify-center py-10">

                            <View className="flex-row items-center justify-between mb-6">
                                <BackButton />
                                <ThemedText type="title" style={{ flex: 1, textAlign: "center", marginRight: 40 }}>
                                    {isEdit ? "Редагувати баланс" : "Новий баланс"}
                                </ThemedText>
                            </View>

                            <View className="bg-white dark:bg-gray-900 p-8 rounded-3xl gap-8 shadow-sm">

                                <TextInput
                                    value={form.name}
                                    onChangeText={(value) =>
                                        setForm((prev) => ({ ...prev, name: value }))
                                    }
                                    placeholder="Назва балансу"
                                    placeholderTextColor="#9CA3AF"
                                    className="w-full  border border-gray-300 dark:border-gray-700
                                               bg-gray-50 dark:bg-gray-800
                                               text-black dark:text-white
                                               p-4 rounded-2xl text-lg"
                                />

                                <TextInput
                                    value={form.amount.toString()}
                                    onChangeText={(value) => {
                                        const cleaned = value.replace(/[^0-9.,]/g, "");
                                        setForm((prev) => ({
                                            ...prev,
                                            amount: cleaned ? Number(cleaned.replace(",", ".")) : 0,
                                        }));
                                    }}
                                    keyboardType="decimal-pad"
                                    placeholder="Сума"
                                    placeholderTextColor="#9CA3AF"
                                    className="w-full text-center border border-gray-300 dark:border-gray-700
                                               bg-gray-50 dark:bg-gray-800
                                               text-black dark:text-white
                                               p-4 rounded-2xl text-lg"
                                />

                                <View className="flex-row items-center justify-between px-2">
                                    <Text className="text-black dark:text-white text-base">
                                        Це накопичувальний баланс
                                    </Text>
                                    <Switch
                                        value={form.isSaving}
                                        onValueChange={(value) =>
                                            setForm((prev) => ({ ...prev, isSaving: value }))
                                        }
                                    />
                                </View>

                                <View className="items-center">
                                    <SquareImagePicker
                                        imageUri={
                                            form.newIcon?.uri ??
                                            (form.existingIcon
                                                ? APP_URLS.IMAGES_400_URL + form.existingIcon
                                                : null)
                                        }
                                        onChange={(file) =>
                                            setForm((prev) => ({
                                                ...prev,
                                                newIcon: file,
                                            }))
                                        }
                                        size={150}
                                        label="Іконка (необов'язково)"
                                    />
                                </View>

                            </View>

                            <View className="mt-10">
                                <TouchableOpacity
                                    onPress={onSubmit}
                                    activeOpacity={0.8}
                                    className="bg-emerald-600 p-5 rounded-2xl items-center shadow-lg"
                                >
                                    <Text className="text-white font-semibold text-lg">
                                        {isEdit ? "Зберегти" : "Створити"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ThemedView>
    );
}