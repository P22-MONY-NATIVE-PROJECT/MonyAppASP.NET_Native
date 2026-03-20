import { useColorScheme } from "nativewind";
import { storage } from "@/utilities/storage";

export const useAppTheme = () => {
    const { colorScheme, setColorScheme } = useColorScheme();

    const isDark = colorScheme === 'dark';

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setColorScheme(newTheme);
        storage.setTheme(newTheme);
    };

    return {
        colorScheme,
        isDark,
        toggleTheme,
    };
};