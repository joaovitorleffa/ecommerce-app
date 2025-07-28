import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./pages/home";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
  },
  screenOptions: {
    headerTintColor: "#000",
    headerStyle: {
      backgroundColor: "#fff",
    },
  },
});

const Router = createStaticNavigation(RootStack);

export { Router };
