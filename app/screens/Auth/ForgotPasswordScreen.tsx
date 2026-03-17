import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {useForgotPasswordMutation} from "@/services/authService";
import {forgotPasswordSchema, ForgotPasswordFormData} from "@/schemas/authSchema";

import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import {AppLoader} from "@/components/ui/app-loader";

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

    const {control, handleSubmit, formState: {errors}} = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {email: ''}
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await forgotPassword({email: data.email}).unwrap();
            Alert.alert(
                "Лист надіслано",
                "Перевірте email — ми надіслали інструкції для відновлення пароля.",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace({pathname: '/reset-password', params: {email: data.email}})
                    }
                ]
            );
        } catch (error: any) {
            Alert.alert("Помилка", error?.data?.message || "Не вдалося надіслати лист");
        }
    };

    return (
        <>
            <AppLoader
                visible={isLoading}
                message="Завантаження..."
            />
            <AuthLayout title="Відновлення пароля">
                <Controller
                    control={control}
                    name="email"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Email"
                            placeholder="example@example.com"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.email?.message}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}
                />

                <View className="items-center w-full mt-4">
                    <PrimaryButton
                        title="Надіслати"
                        onPress={handleSubmit(onSubmit)}
                    />

                    <TouchableOpacity
                        className="mb-6 mt-2"
                        onPress={() => router.replace('/login')}
                    >
                        <Text className="font-spartan-semibold text-[13px] text-[#093030] dark:text-[#DFF7E2]">
                            Повернутися до логіну
                        </Text>
                    </TouchableOpacity>
                </View>
            </AuthLayout>
        </>
    );
}
