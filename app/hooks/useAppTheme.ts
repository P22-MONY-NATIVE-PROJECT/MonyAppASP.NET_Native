import { useColorScheme } from "nativewind";
import {saveTheme} from "@/utilities/storage";

export const useAppTheme = () => {
    const { colorScheme, setColorScheme } = useColorScheme();

    const isDark = colorScheme === 'dark';

    const toggleTheme = async () => {
        const newTheme = isDark ? 'light' : 'dark';
        setColorScheme(newTheme);
        await saveTheme(newTheme);
    };

    return {
        colorScheme,
        isDark,
        toggleTheme,
    };
};