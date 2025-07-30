import { Product } from "@/home/types/product";
import { api } from "@/lib/api-client";
import { useEffect, useState } from "react";

export const useProduct = (productId: number) => {
  const [state, setState] = useState<{
    data: Product | null;
    isLoading: boolean;
    isError: boolean;
  }>({
    data: null,
    isLoading: false,
    isError: false,
  });

  const fetch = async () => {
    setState((prev) => ({ ...prev, isLoading: true, isError: false }));
    try {
      const response = await api(`products/${productId}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: Product = await response.json();
      setState({ data, isLoading: false, isError: false });
    } catch (error) {
      setState({ data: null, isLoading: false, isError: true });
    }
  };

  useEffect(() => {
    if (productId) {
      fetch();
    }
  }, [productId]);

  return { ...state };
};
