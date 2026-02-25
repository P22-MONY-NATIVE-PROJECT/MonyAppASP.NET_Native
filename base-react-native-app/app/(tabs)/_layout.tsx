import { useState } from "react";
import CustomBottomTabs from "@/components/tabs/CustomBottomTabs";
import CategoriesListScreen from "@/screens/Category/CategoriesListScreen";

export default function TabLayout() {
    const [types, setTypes] = useState([
        { id: 1, name: "Витрати" },
        { id: 2, name: "Надходження" },
        { id: 3, name: "Інвестиції" },
        { id: 4, name: "Кредити" },
        { id: 5, name: "Перекази" },
        { id: 6, name: "Бізнес" },
        { id: 7, name: "Інше" },
    ]);

    if (!types.length) return null;

    return (
        <CustomBottomTabs
            tabs={types}
            renderScene={(typeId) => (
                <CategoriesListScreen typeId={typeId} />
            )}
        />
    );
}