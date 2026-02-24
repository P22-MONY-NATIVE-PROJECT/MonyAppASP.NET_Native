import { Stack } from "expo-router";

export default function ModalLayout() {
    return (
        <Stack
            screenOptions={{
                presentation: "modal",
                animation: "slide_from_bottom",
                headerShown: false,
            }}
        />
    );
}