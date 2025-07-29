import { Product } from "@/features/home/types/product";

const productMock: Product = {
  id: 1,
  name: "Product 1",
  description: "A test product",
  price: 100,
  category: "Electronics",
  imageUrl: "https://via.placeholder.com/150",
  stock: 10,
  rating: 4.5,
  reviews: [
    {
      user: "Test User",
      comment: "Great product!",
      rating: 5,
    },
  ],
  specifications: {
    weight: "500g",
    battery: "4000mAh",
    connectivity: "WiFi, Bluetooth",
  },
};

export { productMock };
