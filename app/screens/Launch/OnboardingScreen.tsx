import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, FlatList, Image, ViewToken } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useAppTheme } from "@/hooks/useAppTheme";

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Welcome To\nExpense Manager',
        image: require('@/assets/images/ilustracion-3d-mano-dinero-blanco-removebg-preview 1.png'),
    },
    {
        id: '2',
        title: 'Are You Ready To\nTake Control Of\nYour Finances?',
        image: require('@/assets/images/ilustracion-3d-mano-dinero-blanco-removebg-preview 1.png'),
    }
];

export default function OnboardingScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { isDark } = useAppTheme();

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (viewableItems[0]) {
            setCurrentIndex(viewableItems[0].index ?? 0);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            router.push('/(tabs)');
        }
    };

    const renderItem = ({ item, index }: { item: typeof slides[0], index: number }) => {
        return (
            <View style={{ width }} className="flex-1">
                <View className="h-[300px] items-center justify-center px-6">
                    <Text className="font-poppins-semibold text-[30px] text-center leading-[39px] text-[#0E3E3E] dark:text-[#DFF7E2]">
                        {item.title}
                    </Text>
                </View>

                <Animated.View
                    entering={FadeInUp.duration(600).delay(index * 100)}
                    className="flex-1 bg-[#F1FFF3] dark:bg-[#093030] rounded-t-[40px] items-center"
                    style={{ paddingBottom: insets.bottom + 40 }}
                >
                    <View className="mt-12 mb-auto items-center justify-center">
                        <View className="w-[248px] h-[248px] rounded-full bg-[#DFF7E2] absolute" />
                        <Image
                            source={item.image}
                            style={{ width: 287, height: 287 }}
                            resizeMode="contain"
                        />
                    </View>

                    <View className="items-center mb-8">
                        <TouchableOpacity onPress={handleNext} activeOpacity={0.8} className="mb-6">
                            <Text className="font-poppins-semibold text-[30px] text-[#0E3E3E] dark:text-[#DFF7E2] capitalize">
                                Next
                            </Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center space-x-3">
                            {slides.map((_, i) => {
                                const isActive = i === currentIndex;
                                const isLast = i === slides.length - 1;

                                return (
                                    <View
                                        key={i}
                                        className={`w-[13px] h-[13px] rounded-full ${
                                            isActive
                                                ? 'bg-[#00D09E] dark:bg-[#DFF7E2]'
                                                : 'border-[2px] border-[#0E3E3E] dark:border-[#DFF7E2] bg-transparent'
                                        } ${!isLast ? 'mr-3' : ''}`}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    };

    return (
        <SafeAreaView
            className="flex-1 bg-[#00D09E] dark:bg-[#052224]"
            edges={['top', 'left', 'right']}
        >
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfig}
            />
        </SafeAreaView>
    );
}