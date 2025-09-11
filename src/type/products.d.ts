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

//  interface SubCategory {
//   _id: string;
//   name: string;
//   image: string;
//   category: {
//     _id: string;
//     name: string;
//   }[];
// }


// Interface for a single category item
interface Category {
  id: string;
  name: string;
  order: number;
  image: string;
}

// Interface for the entire response from the API
interface CategoryResponse {
  total: number;
  categories: Category[];
}

interface SubCategory {
  id: string;
  name: string;
  order: number;
  image: string;
}

interface SubCategoryResponse {
  parent: {
    id: string;
    name: string;
  };
  total: number;
  subcategories: SubCategory[];
  success: boolean; // assuming this field based on your code
}

 interface ParentCategory {
  category_id: string;
  category_name: string;
  subcategory_id: string;
  subcategory_name: string;
}

 interface ProductMoreDetails {
  "Key Features": string;
  "Storage Tips": string;
  Type: string;
  "Shelf Life": string;
  "Manufacturer Details": string;
  "Marketed By": string;
  "Return Policy": string;
}

 interface Product {
  _id: string;
  name: string;
  image: string[];
  category: string[];
  subCategory: string[];
  unit: string;
  stock: number;
  price: number;
  discount: number;
  description: string;
  more_details: ProductMoreDetails;
  publish: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

 interface ProductResponse {
  parent: ParentCategory;
  total: number;
  products: Product[];
}
