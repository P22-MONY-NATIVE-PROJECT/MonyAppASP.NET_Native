import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  LayoutChangeEvent,
  TextProps,
} from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";

type Props = TextProps & {
  text: string;
  width: number;
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedMarqueeText({
  text,
  width,
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: Props) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  const translateX = useRef(new Animated.Value(0)).current;
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (textWidth <= containerWidth) return;

    const distance = textWidth - containerWidth;

    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(1000),
        Animated.timing(translateX, {
          toValue: -distance,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, [textWidth, containerWidth]);

  return (
    <View
      style={[{ width, overflow: "hidden" }]}
      onLayout={(e: LayoutChangeEvent) =>
        setContainerWidth(e.nativeEvent.layout.width)
      }
    >
      <Animated.Text
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        style={[
          { color, transform: [{ translateX }] },
          type === "default" && styles.default,
          type === "title" && styles.title,
          type === "defaultSemiBold" && styles.defaultSemiBold,
          type === "subtitle" && styles.subtitle,
          type === "link" && styles.link,
          style,
        ]}
        {...rest}
      >
        {text}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    color: "#0a7ea4",
  },
});
