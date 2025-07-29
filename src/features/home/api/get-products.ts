import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { Product } from "../types/product";

export const useProducts = () => {
  const [state, setState] = useState<{
    data: Product[];
    isLoading: boolean;
    isError: boolean;
  }>({
    data: [],
    isLoading: false,
    isError: false,
  });

  const fetch = async () => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false }));
    try {
      const response = await api("products");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Product[] = await response.json();
      setState({ data, isLoading: false, isError: false });
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setState({ data: [], isLoading: false, isError: true });
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { ...state, refetch: fetch };
};
