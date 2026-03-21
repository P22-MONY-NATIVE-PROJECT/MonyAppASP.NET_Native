import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useRouter, useLocalSearchParams} from 'expo-router';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {useResetPasswordMutation} from "@/services/authService";
import {resetPasswordSchema, ResetPasswordFormData} from "@/schemas/authSchema";
import {useDispatch} from "react-redux";

import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import {AppLoader} from "@/components/ui/app-loader";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const {email} = useLocalSearchParams<{email: string }>();
    const [resetPassword, {isLoading}] = useResetPasswordMutation();

    const {control, handleSubmit, formState: {errors}} = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {code: '', newPassword: ''}
    });

    useEffect(() => {
        if (!email) {
            router.replace('/forgot-password');
        }
    }, [email, router]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!email) return;
        try {
            const response = await resetPassword({
                email,
                code: data.code,
                newPassword: data.newPassword
            }).unwrap();


            Alert.alert(
                "Пароль змінено",
                "Ви можете ввійти в свій акаунт",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace({pathname: '/login'})
                    }
                ]
            );

        } catch (error: any) {
            Alert.alert("Помилка", error?.data?.message || "Не вдалося змінити пароль");
        }
    };

    if (!email) {
        return null;
    }

    return (
        <>
            <AppLoader
                visible={isLoading}
                message="Завантаження..."
            />
            <AuthLayout title="Новий пароль">
                <Controller
                    control={control}
                    name="code"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Код з листа"
                            placeholder="Введіть код"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.code?.message}
                            autoCapitalize="none"
                            keyboardType="default"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="newPassword"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Новий пароль"
                            placeholder="••••••••"
                            isPassword
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.newPassword?.message}
                        />
                    )}
                />

                <View className="items-center w-full mt-4">
                    <PrimaryButton
                        title="Змінити пароль"
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
