import CustomBottomTabs from "@/components/tabs/CustomBottomTabs";
import CategoriesListScreen from "@/screens/Category/CategoriesListScreen";
import {useGetAllCategoryTypesQuery} from "@/services/categoriesService";

export default function TabLayout() {
    const {data: types} = useGetAllCategoryTypesQuery();

    if (!types) return null;

    return (
        <CustomBottomTabs
            tabs={types}
            renderScene={(typeId) => (
                <CategoriesListScreen typeId={typeId} />
            )}
        />
    );
}