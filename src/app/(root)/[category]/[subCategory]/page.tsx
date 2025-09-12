"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loading from "@/components/shared/Loading";
import { valideURLConvert } from "@/utils/valideURLConvert";
import { RootState } from "@/store";
import CardProduct from "@/components/shared/productNew/CardProduct";
import { useParams } from "next/navigation";
import { fetchProductsBySubCategory, fetchSubCategories } from "@/lib/api";
import AxiosToastError from "@/utils/AxiosToastError";

const ProductListPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [displaySubCategory, setDisplaySubCategory] = useState<SubCategory[]>(
    []
  );
  const params = useParams() as { category: string; subCategory: string };

  const AllSubCategory = useSelector(
    (state: RootState) => state.product.allSubCategory
  ) as SubCategory[];

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];
  const categoryName = params.category.split("-").slice(0, -1).join(" ");
  const subCategoryName = params.subCategory.split("-").slice(0, -1).join(" ");

  const fetchSubCategoriesData = useCallback(async () => {
    try {
      console.log("asffds");
      setLoading(true);
      // const responseData = await fetchSubCategories(categoryId);
      const responseData = await fetchSubCategories(categoryId);
      setDisplaySubCategory(responseData?.subcategories || []);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const fetchProductsData = useCallback(async () => {
    if (!subCategoryId || !categoryId) return;
    try {
      setLoading(true);
      const productsResponse = await fetchProductsBySubCategory(
        categoryId,
        subCategoryId
      );
      setData(productsResponse?.products || []);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, subCategoryId]);

  useEffect(() => {
    fetchSubCategoriesData();
  }, [fetchSubCategoriesData]);

  useEffect(() => {
    fetchProductsData();
  }, [fetchProductsData]);

  // Commented code preserved
  // useEffect(() => {
  //   const sub = subCategoryData?.data.filter((s) =>
  //     s.category.some((el) => el._id === categoryId)
  //   );
  //   setDisplaySubCategory(sub);
  // }, [params, AllSubCategory]);

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="container mx-auto flex">
        <main className="flex flex-col flex-1">
          <div className="bg-white shadow-md p-4 sticky top-0 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>
          <div className="flex">
            <aside className="h-[calc(100vh-6rem)] overflow-y-auto bg-white shadow-md scrollbarCustom w-20 lg:w-24">
              {displaySubCategory.map((s) => {
                const link = `/${valideURLConvert(
                  categoryName
                )}-${categoryId}/${valideURLConvert(s.name)}-${s.id}`;
                const isActive = subCategoryId === s.id;

                return (
                  <Link
                    key={s.id}
                    href={link}
                    className={`w-full p-2 flex flex-col items-center border-b hover:bg-green-100 cursor-pointer 
    ${
      subCategoryId === s.id
        ? "bg-green-100 border-r-4 border-green-600 font-bold"
        : ""
    }
  `}
                  >
                    <div className="w-fit max-w-28 mx-auto lg:mx-0">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <p className="text-xs lg:text-xxs text-center lg:text-left lg:mt-0">
                      {s.name}
                    </p>
                  </Link>
                );
              })}
            </aside>

            <div className="flex-1 overflow-y-auto min-h-[calc(100vh-6rem)]">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                {data.map((p, index) => (
                  <CardProduct key={`${p._id}-product-${index}`} data={p} />
                ))}
              </div>
              {loading && <Loading />}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default ProductListPage;
