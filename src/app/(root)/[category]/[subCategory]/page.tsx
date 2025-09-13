"use client";


import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Loading from "@/components/shared/Loading";
import { valideURLConvert } from "@/utils/valideURLConvert";
import CardProduct from "@/components/shared/productNew/CardProduct";
import { useParams } from "next/navigation";
import { fetchProductsBySubCategory, fetchSubCategories } from "@/lib/api";
import AxiosToastError from "@/utils/AxiosToastError";
import CardLoading from "@/components/shared/productNew/CardLoading";

const ProductListPage: React.FC = () => {
  const [data, setData] = useState<ProductResponse>();
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [displaySubCategory, setDisplaySubCategory] = useState<SubCategory[]>([]);
  const params = useParams() as { category: string; subCategory: string };

  const categoryId = params.category;
  const subCategoryId = params.subCategory;

  // Fetch subcategories with its own loading state
  const fetchSubCategoriesData = useCallback(async () => {
    try {
      setLoadingSubCategories(true);
      const responseData = await fetchSubCategories(categoryId);
      setDisplaySubCategory(responseData?.subcategories || []);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingSubCategories(false);
    }
  }, [categoryId]);

  // Fetch products with separate loading state
  const fetchProductsData = useCallback(async () => {
    if (!subCategoryId || !categoryId) return;
    try {
      setLoadingProducts(true);
      const productsResponse = await fetchProductsBySubCategory(categoryId, subCategoryId);
      setData(productsResponse || {});
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingProducts(false);
    }
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    fetchSubCategoriesData();
  }, [fetchSubCategoriesData]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto flex">
        <main className="flex flex-col flex-1">
          <div className="bg-white shadow-md p-4 sticky top-0 z-10">
            <h3 className="font-semibold">{data?.parent?.subcategory_name || "Loading..."}</h3>
          </div>
          <div className="flex">
            <aside className="h-[calc(100vh-6rem)] overflow-y-auto bg-white shadow-md scrollbarCustom w-20 lg:w-24">
              {loadingSubCategories ? (
                // Show simple placeholder or spinner in sidebar while loading subcategories
                <div className="flex flex-col items-center gap-4 p-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-gray-200 w-14 h-14 rounded animate-pulse" />
                  ))}
                  
                </div>
              ) : (
                displaySubCategory.map((s) => {
                  const link = `/${categoryId}/${s.id}`;
                  const isActive = subCategoryId === s.id;

                  return (
                    <Link
                      key={s.id}
                      href={link}
                      className={`w-full p-2 flex flex-col items-center border-b hover:bg-green-100 cursor-pointer ${
                        isActive ? "bg-green-100 border-r-4 border-green-600 font-bold" : ""
                      }`}
                    >
                      <div className="w-fit max-w-28 mx-auto lg:mx-0">
                        <img src={s.image} alt={s.name} className="w-14 h-14 object-contain" />
                      </div>
                      <p className="text-xs lg:text-xxs text-center lg:text-left lg:mt-0">{s.name}</p>
                    </Link>
                  );
                })
              )}
            </aside>

            <div className="flex-1 overflow-y-auto min-h-[calc(100vh-6rem)]">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                {loadingProducts
                  ? Array.from({ length: 10 }).map((_, index) => <CardLoading key={index} />)
                  : data?.products.map((p, index) => <CardProduct key={`${p._id}-product-${index}`} data={p} />)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};


export default ProductListPage;
