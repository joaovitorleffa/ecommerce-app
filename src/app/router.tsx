import { HeaderLogo } from "@/components/ui/header-logo";
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
    Home: { screen: HomeScreen, options: { title: "" } },
    ProductDetails: { screen: ProductDetailScreen, options: { title: "" } },
    Cart: { screen: CartScreen, options: { title: "Cart" } },
  },
  screenOptions: {
    headerTintColor: "#6200ee",
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTitle: () => <HeaderLogo />,
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
