"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Loading from "@/components/shared/Loading";
import { valideURLConvert } from "@/utils/valideURLConvert";
import SummaryApi from "@/common/SummaryApi";
import Axios from "@/utils/Axios";
import AxiosToastError from "@/utils/AxiosToastError";
import CardProduct from "@/components/shared/productNew/CardProduct";
import { useParams } from "next/navigation";
import { RootState } from "@/store";
import dummyData from "./dummyData.json";
import { subCategoryData } from "../../product";
import { fetchSubCategories } from "@/lib/api";

const ProductListPage: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const params = useParams() as { category: string; subCategory: string };

  const AllSubCategory = useSelector(
    (state: RootState) => state.product.allSubCategory
  ) as SubCategory[];

  const [displaySubCatory, setDisplaySubCategory] = useState<SubCategory[]>([]);

  const category = params?.category?.split("-");
  const subCategory = params?.subCategory?.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory.length - 1)
    ?.join(" ");
  const categoryName = category?.slice(0, category.length - 1)?.join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];
  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  //   setData(dummyData.products);
  // setDisplaySubCategory(dummyData.subCategories);

  const fetchProductdata = async () => {
    try {
      setLoading(true);
      // const responseData = await fetchSubCategories(categoryId);
      // const response = await Axios({
      //   ...SummaryApi.getProductByCategoryAndSubCategory,
      //   data: {
      //     categoryId,
      //     subCategoryId,
      //     page,
      //     limit: 8,
      //   },
      // });
      const responseData = await fetchSubCategories(categoryId);
      // const { data: responseData } = response;

      // if (responseData.success) {
      //   if (responseData.page === 1) {
      //     setData(responseData.data);

      //   } else {
      //     setData((prev) => [...prev, ...responseData.data]);
      //   }
      //   setTotalPage(responseData.totalCount);
      // }
      setDisplaySubCategory(responseData?.subcategories);
      setData(dummyData.data);
      setTotalPage(dummyData.totalCount);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductdata();
  }, [params]);

  useEffect(() => {
    // const sub = subCategoryData?.data.filter((s) =>
    //   s.category.some((el) => el._id === categoryId)
    // );
    // setDisplaySubCategory(sub);
  }, [params, AllSubCategory]);

  return (
    <section className=" bg-gray-50 min-h-screen">
      {/* <section className="pt-24 lg:pt-20 bg-gray-50 min-h-screen"> */}
      {/* <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]"> */}
      <div className="container mx-auto flex">
        {/* Sub Categories */}
        <aside className="h-[calc(100vh-6rem)] overflow-y-auto bg-white shadow-md  scrollbarCustom">
          {displaySubCatory.map((s) => {
            const link = `/${valideURLConvert(
              categoryName
            )}-${categoryId}/${valideURLConvert(s.name)}-${s.id}`;
            // const link = `/${valideURLConvert(s.category[0]?.name)}-${s.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`;
            return (
              <Link
                key={s.id}
                href={link}
                className={`w-full p-2 flex flex-col items-center border-b hover:bg-green-100 cursor-pointer ${
                  subCategoryId === s.id ? "bg-green-100" : ""
                }`}
              >
                <div className="w-fit max-w-28 mx-auto lg:mx-0">
                  <img
                    src={s.image}
                    alt="subCategory"
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

        {/* Products */}
        <main className="flex flex-col">
          <div className="bg-white shadow-md p-4 sticky top-0 z-10">
            <h3 className="font-semibold">{subCategoryName}</h3>
          </div>

          <div className="flex-1 overflow-y-auto min-h-[calc(100vh-6rem)]">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
              {data.map((p, index) => (
                <CardProduct key={`${p._id}-product-${index}`} data={p} />
              ))}
            </div>
            {loading && <Loading />}
          </div>
        </main>
      </div>
    </section>
  );
};

export default ProductListPage;
