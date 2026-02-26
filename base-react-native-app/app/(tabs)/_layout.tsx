import CustomBottomTabs from "@/components/tabs/CustomBottomTabs";
import CategoriesListScreen from "@/screens/Category/CategoriesListScreen";
import {useGetAllCategoryTypesQuery} from "@/services/categoriesService";
import CategoriesOverviewScreen from "@/screens/Category/CategoriesOverviewScreen";

export default function TabLayout() {
    const {data: types} = useGetAllCategoryTypesQuery();

    if (!types) return null;

    return (
        <CustomBottomTabs
            tabs={types}
            renderScene={(typeId) => (
                <CategoriesOverviewScreen typeId={typeId} />
            )}
        />
    );
}