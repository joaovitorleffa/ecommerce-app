import type { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * Root stack parameter list defining all navigation routes and their parameters
 */
export type RootStackParamList = {
  Home: undefined;
  ProductDetails: {
    productId: number;
  };
};

/**
 * Type for screen props with proper typing for each route
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

/**
 * Type for navigation prop that can be used with useNavigation hook
 */
export type NavigationProp = RootStackScreenProps<
  keyof RootStackParamList
>["navigation"];

/**
 * Type for route prop with proper typing for specific routes
 */
export type RouteProp<T extends keyof RootStackParamList> =
  RootStackScreenProps<T>["route"];

/**
 * Utility type to extract route names
 */
export type RouteNames = keyof RootStackParamList;

/**
 * Utility type to extract parameters for a specific route
 */
export type RouteParams<T extends RouteNames> = RootStackParamList[T];
