/** @format */

 interface IProduct {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner: string;
  discount?: number;
}

interface CartItem {
  _id: string;
  quantity: number;
  productId: {
    price: number;
    discount: number;
    [key: string]: any; // optional: if productId may contain other dynamic keys
  };
}

 interface Product {
  _id: string;
  name: string;
  image: string[];
  unit: string;
  price: number;
  discount: number;
  stock: number;
}

 interface SubCategory {
  _id: string;
  name: string;
  image: string;
  category: {
    _id: string;
    name: string;
  }[];
}
