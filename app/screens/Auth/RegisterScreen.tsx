import React from 'react';
import {View, Text, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useRouter} from 'expo-router';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {useRegisterMutation} from "@/services/authService";
import {registerSchema, RegisterFormData} from "@/schemas/authSchema";

import AvatarPicker from "@/components/form/AvatarPicker";
import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import {AppLoader} from "@/components/ui/app-loader";
import {useDispatch} from "react-redux";
import {saveAuthTokens, saveToken} from "@/utilities/storage";
import {setAuth} from "@/store/authSlice";

export default function RegisterScreen() {
    const router = useRouter();
    const [register, {isLoading}] = useRegisterMutation();
    const dispatch = useDispatch();

    const {control, handleSubmit, setValue, formState: {errors}} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            imageFile: undefined
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await register(data).unwrap();
            await saveAuthTokens(response.accessToken, response.refreshToken);
            dispatch(setAuth(response.accessToken));

            router.replace('/onBoarding');
        } catch (error: any) {
            Alert.alert("Помилка реєстрації", error?.data?.message || "Щось пішло не так");
        }
    };

    return (
        <>
            <AppLoader
                visible={isLoading}
                message="Завантаження..."
            />
            <AuthLayout title="Create Account">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20}}>
                    <Controller
                        control={control}
                        name="imageFile"
                        render={({field}) => (
                            <AvatarPicker
                                image={field.value?.uri || null}
                                onChange={(fileObject) => setValue('imageFile', fileObject)}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="firstName"
                        render={({field: {onChange, value}}) => (
                            <CustomInput
                                label="First name"
                                placeholder="John"
                                onChangeText={onChange}
                                value={value}
                                error={errors.firstName?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="lastName"
                        render={({field: {onChange, value}}) => (
                            <CustomInput
                                label="Last name"
                                placeholder="Doe"
                                onChangeText={onChange}
                                value={value}
                                error={errors.lastName?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({field: {onChange, value}}) => (
                            <CustomInput
                                label="Email"
                                placeholder="example@example.com"
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({field: {onChange, value}}) => (
                            <CustomInput
                                label="Password"
                                placeholder="••••••••"
                                isPassword
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({field: {onChange, value}}) => (
                            <CustomInput
                                label="Confirm Password"
                                placeholder="••••••••"
                                isPassword
                                onChangeText={onChange}
                                value={value}
                                error={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <View className="items-center w-full mt-2">
                        <Text
                            className="font-spartan-light text-[13px] text-center text-[#4B4544] dark:text-[#DFF7E2] mb-6 px-4">
                            By continuing, you agree to {"\n"}
                            <Text className="text-[#00D09E] font-spartan-light">Terms of Use and Privacy Policy.</Text>
                        </Text>

                        <PrimaryButton
                            title="Sign Up"
                            onPress={handleSubmit(onSubmit)}
                        />

                        <TouchableOpacity onPress={() => router.push('/login')} className="mt-4">
                            <Text className="font-spartan-light text-[13px] text-[#093030] dark:text-[#DFF7E2]">
                                Already have an account? <Text className="text-[#00D09E] font-spartan-bold">Log
                                In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </AuthLayout>
        </>
    );
}