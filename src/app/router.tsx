import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./pages/home";
import { ProductDetailScreen } from "./pages/product-details";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    ProductDetails: { screen: ProductDetailScreen, options: { title: "" } },
  },
  screenOptions: {
    headerTintColor: "#000",
    headerStyle: {
      backgroundColor: "#fff",
    },
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Router = createStaticNavigation(RootStack);

export { Router };
