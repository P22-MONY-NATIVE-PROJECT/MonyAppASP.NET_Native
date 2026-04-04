import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {useAppTheme} from "@/hooks/useAppTheme";
import {useLoginMutation, useGoogleLoginMutation} from "@/services/authService";
import {loginSchema, LoginFormData} from "@/schemas/authSchema";

import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import {AppLoader} from "@/components/ui/app-loader";
import {useDispatch} from "react-redux";
import {setAuth} from "@/store/authSlice";
// import {GoogleSignin} from "@react-native-google-signin/google-signin";
import {IGoogleLoginRequest} from "@/types/auth/IGoogleLoginRequest";

export default function LoginScreen() {
    const router = useRouter();
    const {isDark} = useAppTheme();
    const [login, {isLoading}] = useLoginMutation();
    const [googleLogin, {isLoading: isGoogleLoading}] = useGoogleLoginMutation();
    const dispatch = useDispatch();

    const signInWithGoogle = async () => {
        // Log in with Google logic (requires @react-native-google-signin/google-signin)
    };


    const {control, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: '', password: ''}
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data).unwrap();
            dispatch(setAuth({ accessToken: response.accessToken }));

            router.replace('/onBoarding');
        } catch (error: any) {
            Alert.alert("Помилка", error?.data?.message || "Не вдалося увійти");
        }
    };


    return (
        <>
            <AppLoader
                visible={isLoading || isGoogleLoading}
                message="Завантаження..."
            />
            <AuthLayout title="Welcome">
                <KeyboardAwareScrollView
                    className="flex-1"
                    contentContainerStyle={{ paddingHorizontal: 32, paddingTop: 40, paddingBottom: 40, flexGrow: 1 }}
                    bounces={false}
                    overScrollMode="never"
                    alwaysBounceVertical={false}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                >
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

                <Controller
                    control={control}
                    name="password"
                    render={({field: {onChange, onBlur, value}}) => (
                        <CustomInput
                            label="Password"
                            placeholder="••••••••"
                            isPassword
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.password?.message}
                        />
                    )}
                />

                <View className="items-center w-full mt-4">
                    <PrimaryButton
                        title="Log In"
                        onPress={handleSubmit(onSubmit)}
                    />

                    <TouchableOpacity
                        className="mb-6 mt-2"
                        onPress={() => router.push('/forgot-password')}
                    >
                        <Text className="font-spartan-semibold text-[13px] text-[#093030] dark:text-[#DFF7E2]">
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>

                    <PrimaryButton
                        title="Sign Up"
                        variant="secondary"
                        onPress={() => router.push('/register')}
                    />

                    <Text className="font-spartan-light text-[12px] text-[#093030] dark:text-[#DFF7E2] my-6">
                        or sign up with
                    </Text>

                    <View className="flex-row gap-5 mb-8">
                        <TouchableOpacity
                            className="w-[40px] h-[40px] border border-[#0E3E3E] dark:border-[#DFF7E2] rounded-full items-center justify-center">
                            <Ionicons name="logo-facebook" size={22} color={isDark ? "#DFF7E2" : "#0E3E3E"}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={signInWithGoogle}
                            className="w-[40px] h-[40px] border border-[#0E3E3E] dark:border-[#DFF7E2] rounded-full items-center justify-center">
                            <Ionicons name="logo-google" size={22} color={isDark ? "#DFF7E2" : "#0E3E3E"}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </AuthLayout>
        </>
    );
}