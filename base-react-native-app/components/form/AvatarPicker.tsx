import React, { useState, useRef } from "react";
import {
    View, Text, Pressable, Image, Modal,
    TouchableWithoutFeedback, Animated, PanResponder, Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useColorScheme } from "nativewind";

type Props = {
    image: string | null;
    onChange: (uri: string) => void;
};

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function AvatarPicker({ image, onChange }: Props) {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === "dark";

    const [modalVisible, setModalVisible] = useState(false);
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    const openModal = () => {
        setModalVisible(true);
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    };

    const closeModal = () => {
        Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    translateY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100 || gestureState.vy > 0.5) {
                    closeModal();
                } else {
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 5,
                    }).start();
                }
            },
        })
    ).current;

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) return;
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            onChange(result.assets[0].uri);
            closeModal();
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) return;
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            onChange(result.assets[0].uri);
            closeModal();
        }
    };

    return (
        <View className="self-center mb-8">
            <Pressable onPress={openModal} className="active:opacity-80">
                {image ? (
                    <View className="relative">
                        <Image
                            source={{ uri: image }}
                            className="w-32 h-32 rounded-full border-4 border-white dark:bg-[#052224] shadow-sm"
                        />
                        <View className="absolute bottom-0 right-0 bg-[#00D09E] p-2 rounded-full border-2 border-white dark:bg-[#052224] shadow-lg">
                            <Ionicons name="camera" size={16} color="white" />
                        </View>
                    </View>
                ) : (
                    <View className="w-32 h-32 rounded-full bg-slate-100 dark:bg-[#052224] border-2 border-dashed border-slate-300 dark:border-slate-700 items-center justify-center">
                        <Ionicons
                            name="person-add-outline"
                            size={40}
                            color={isDark ? "#475569" : "#94A3B8"}
                        />
                    </View>
                )}
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                statusBarTranslucent={true}
            >
                <View className="flex-1 bg-black/60 justify-end">
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View className="absolute inset-0" />
                    </TouchableWithoutFeedback>

                    <Animated.View
                        style={{ transform: [{ translateY }] }}
                        className="bg-white dark:bg-[#052224] rounded-t-[40px] pb-12 shadow-2xl overflow-hidden"
                    >
                        <View {...panResponder.panHandlers} className="w-full items-center pt-4 pb-2 bg-transparent">
                            <View className="w-12 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full" />
                        </View>

                        <View className="px-6">
                            <Text className="text-xl font-bold dark:bg-[#052224] dark:text-white mb-8 mt-2 text-center">
                                Змінити фото профілю
                            </Text>

                            <View className="flex-row justify-around mb-4">
                                <Pressable onPress={takePhoto} className="items-center active:opacity-60">
                                    <View className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-3xl items-center justify-center mb-3">
                                        <Ionicons name="camera" size={32} color="#2563EB" />
                                    </View>
                                    <Text className="text-gray-700 dark:text-gray-300 font-semibold text-base">Камера</Text>
                                </Pressable>

                                <Pressable onPress={pickImage} className="items-center active:opacity-60">
                                    <View className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl items-center justify-center mb-3">
                                        <Ionicons name="images" size={32} color="#4F46E5" />
                                    </View>
                                    <Text className="text-gray-700 dark:text-gray-300 font-semibold text-base">Галерея</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}