interface Review {
  user: string;
  comment: string;
  rating: number;
}

interface Specifications {
  weight: string;
  battery: string;
  connectivity: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  rating: number;
  reviews: Review[];
  specifications: Specifications;
}
