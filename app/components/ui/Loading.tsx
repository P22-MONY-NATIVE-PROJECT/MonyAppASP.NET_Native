import React, { useEffect, useRef } from "react";
import { View, ActivityIndicator, Animated } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function Loading({ fullScreen = true }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const content = (
    <Animated.View
      style={{ opacity }}
      className="items-center justify-center gap-4"
    >
      <ActivityIndicator size="large" color="#10B981" />
      <ThemedText type="defaultSemiBold">
        Завантаження...
      </ThemedText>
    </Animated.View>
  );

  if (fullScreen) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        {content}
      </ThemedView>
    );
  }

  return content;
}
