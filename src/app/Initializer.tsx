// Initializer.tsx
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { setAllCategory, setAllSubCategory, setLoadingCategory } from '@/store/slice/productSlice';
import Axios from '@/utils/Axios';
import SummaryApi from '@/common/SummaryApi';
import { fetchCategories, fetchSubCategories } from '@/lib/api';

// Type definitions (add these if not already defined elsewhere)


export default function Initializer() {
  const dispatch = useAppDispatch();

  // const fetchUser = async()=>{
  //     const userData = await fetchUserDetails()
  //     dispatch(setUserDetails(userData.data))
  // }

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));

      // Assume SummaryApi.getCategory config is set up correctly
    //   const response = await Axios<CategoryResponse>({
    //     ...SummaryApi.getCategory,
    //   });

    //   const responseData = response.data;
     const responseData = await fetchCategories();

      if (responseData.total > 0) {
        dispatch(
          setAllCategory(
            responseData.categories.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      // Handle error properly here
      console.error('Failed to fetch categories:', error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
    //   const response = await Axios<SubCategoryResponse>({
    //     ...SummaryApi.getSubCategory,
    //   });

    //   const responseData = response.data;
    //  const responseData = await fetchSubCategories();

    //   if (responseData.success) {
    //     // sort by name (localeCompare) and dispatch
    //     dispatch(
    //       setAllSubCategory(
    //         responseData.subcategories.sort((a, b) => a.name.localeCompare(b.name))
    //       )
    //     );
    //   }
    } catch (error) {
      // Optional: handle/log error here
      console.error('Failed to fetch subcategories:', error);
    } finally {
      // If you want to set any loading or cleanup flags, do it here
    }
  };

  useEffect(() => {
    // fetchUser()
    fetchCategory();
    fetchSubCategory();
    // fetchCartItem()
  }, []);

  // This component doesn't render anything visible
  return null;
}