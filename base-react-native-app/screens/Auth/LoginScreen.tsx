import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useRouter} from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {useAppTheme} from "@/hooks/useAppTheme";
import {useGoogleLoginMutation, useLoginMutation} from "@/services/authService";
import {loginSchema, LoginFormData} from "@/schemas/authSchema";

import AuthLayout from "@/components/layouts/AuthLayout";
import CustomInput from "@/components/form/inputs/CustomInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import {AppLoader} from "@/components/ui/app-loader";
import {useDispatch} from "react-redux";
import {saveToken} from "@/utilities/storage";
import {setAuth} from "@/store/authSlice";

// import {
//     GoogleSignin
// } from '@react-native-google-signin/google-signin';
// import {Constants} from "expo-constants";
//
// GoogleSignin.configure({
//     webClientId:"1040298597778-6r2s0on2l8bg75dr0aqk43it1ekqo2s8.apps.googleusercontent.com",
//     //iosClientId:"1040298597778-vrhqunl0q392q3gc17fvt3l17ff2ebpt.apps.googleusercontent.com"
// });
// import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// WebBrowser.maybeCompleteAuthSession();
// const redirectUri = AuthSession.makeRedirectUri({
//     useProxy: true,  // forces https://auth.expo.io/@username/app-slug
// });
//console.log("Redirect URI:", redirectUri);  // should log: https://auth.expo.io/@anonymous/base-react-native-appconsole.log("---------------redirect:",redirectUri);
export default function LoginScreen() {
    const router = useRouter();
    const {isDark} = useAppTheme();
    const [login, {isLoading}] = useLoginMutation();
    const [googleLogin] = useGoogleLoginMutation();
    const dispatch = useDispatch();

    const {control, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: '', password: ''}
    });

    const[request, response, promtAsync] = Google.useAuthRequest({
        androidClientId:'1040298597778-pvg41iqhu74tmus77n1jbapjftcc7ung.apps.googleusercontent.com',
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data).unwrap();

            await saveToken(response.token);
            dispatch(setAuth(response.token));

            router.replace('/onBoarding');
        } catch (error: any) {
            Alert.alert("Помилка", error?.data?.message || "Не вдалося увійти");
            //console.error("Login error:", error);
        }
    };

    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     clientId: '1040298597778-6r2s0on2l8bg75dr0aqk43it1ekqo2s8.apps.googleusercontent.com',
    //     redirectUri
    //     //iosClientId: '1040298597778-vrhqunl0q392q3gc17fvt3l17ff2ebpt.apps.googleusercontent.com',
    //     //androidClientId: '1040298597778-pvg41iqhu74tmus77n1jbapjftcc7ung.apps.googleusercontent.com',
    // });
    //
    // useEffect(() => {
    //     const handleResponse = async () => {
    //         if (response?.type === 'success') {
    //             const idToken = response.authentication?.idToken;
    //             if (idToken) {
    //                 await handleGoogleSignIn(idToken);
    //             }
    //         }
    //     };
    //     handleResponse();
    // }, [response]);

    // const handleGoogleSignIn = async(token: string)=> {
    //     try {
    //         const res = await googleLogin({ token }).unwrap();
    //         await saveToken(res.token);
    //         dispatch(setAuth(res.token));
    //         router.replace('/onBoarding');
    //     } catch (err) {
    //         Alert.alert("Помилка", "Google login failed");
    //     };
    // }
    // const handleGoogleSignIn = async()=>{
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const response = await GoogleSignin.signIn();
    //         if (isSuccessResponse(response)) {
    //             const response2 = await googleLogin({token: response.data.idToken}).unwrap();
    //
    //             await saveToken(response2.token);
    //             dispatch(setAuth(response2.token));
    //             router.replace('/onBoarding');
    //
    //         }
    //     } catch (error) {
    //         if (isErrorWithCode(error)) {
    //             switch (error.code) {
    //                 case statusCodes.IN_PROGRESS:
    //                     // operation (eg. sign in) already in progress
    //                     break;
    //                 case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //                     // Android only, play services not available or outdated
    //                     break;
    //                 default:
    //                 // some other error happened
    //             }
    //         }
    //     }
    // }

    // const handleGoogleSignIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    //         const userInfo = await GoogleSignin.signIn(); // opens Google sign-in
    //         const idToken = userInfo.data?.idToken;
    //
    //         if (!idToken) throw new Error('No ID token returned');
    //
    //         // send idToken to your backend to get app token
    //         const res = await googleLogin({ token: idToken }).unwrap();
    //         await saveToken(res.token);
    //         dispatch(setAuth(res.token));
    //         router.replace('/onBoarding');
    //
    //     } catch (error: any) {
    //         Alert.alert('Помилка', error.message || 'Google login failed');
    //     }
    // };

    return (
        <>
            <AppLoader
                visible={isLoading}
                message="Завантаження..."
            />
            <AuthLayout title="Welcome">
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

                    <TouchableOpacity className="mb-6 mt-2">
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
                            onPress={()=>promtAsync().catch((e)=>{
                                console.error("Error",e);
                            })}
                            // onPress={handleGoogleSignIn}
                            className="w-[40px] h-[40px] border border-[#0E3E3E] dark:border-[#DFF7E2] rounded-full items-center justify-center">
                            <Ionicons name="logo-google" size={22} color={isDark ? "#DFF7E2" : "#0E3E3E"}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </AuthLayout>
        </>
    );
}
