import LaunchScreenA from "@/screens/Launch/LaunchScreenA";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Redirect} from "expo-router";

export default function Index() {
    const { user } = useSelector((state: RootState) => state.auth);

    if (user) {
        console.log(user);
        return <Redirect href="/(tabs)" />;
    }
    return <LaunchScreenA />;
}