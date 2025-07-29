import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CartScreen } from "./pages/cart";
import { HomeScreen } from "./pages/home";
import { ProductDetailScreen } from "./pages/product-details";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    ProductDetails: { screen: ProductDetailScreen, options: { title: "" } },
    Cart: { screen: CartScreen, options: { title: "Cart" } },
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
