// lib/api.ts or services/api.ts
import SummaryApi from '@/common/SummaryApi';
import axios from 'axios';

// Base URLs
export const baseURL = process.env.NEXT_PUBLIC_API_URL;
// API Functions
export const fetchCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await axios.get<CategoryResponse>(
      `${baseURL}/${SummaryApi?.getCategory?.url}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchSubCategories = async (
  categoryId: string
): Promise<SubCategoryResponse> => {
  try {
    const response = await axios.get<SubCategoryResponse>(
      `${baseURL}/master/category/${categoryId}/sub-categories.json`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};

// Add more API functions as needed
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/master/products/all.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};