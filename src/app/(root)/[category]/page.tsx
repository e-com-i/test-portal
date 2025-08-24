'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { categorywiseProducts, subCategoryData } from '../product';
import { useAppSelector } from '@/store';
import AxiosToastError from '@/utils/AxiosToastError';
import { valideURLConvert } from '@/utils/valideURLConvert';
import CardProduct from '@/components/shared/productNew/CardProduct';
import Loading from '@/components/shared/Loading';
import SummaryApi from '@/common/SummaryApi';
import Axios from '@/utils/Axios';

const ProductListPage: React.FC = () => {
   // const [data, setData] = useState([])
    const [data, setData] = useState(categorywiseProducts?.data);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const params = useParams() as { category: string;};
  const AllSubCategory = useAppSelector(
    (state) => state.product.allSubCategory
  ) as SubCategory[];

  const [DisplaySubCatory, setDisplaySubCategory] = useState<SubCategory[]>([]);

  

const category = params?.category?.split('-');
  const categoryId = params?.category?.split('-').slice(-1)[0];
  const categoryName = category?.slice(0, category.length - 1)?.join(' ');

    const fetchCategoryWiseProduct = async () => {
      try {
        setLoading(true);
        // const response = await Axios({
        //   ...SummaryApi.getProductByCategory,
        //   data: {
        //     id: categoryId,
        //   },
        // });
  
        // const { data: responseData } = response;
  
        // if (responseData.success) {
        //   setData(responseData.data);
        // }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCategoryWiseProduct();
    }, []);

  useEffect(() => {

    if(!subCategoryData) return;
    const sub = subCategoryData?.data.filter((s) =>
      s.category.some((el) => el._id === categoryId)
    );
    setDisplaySubCategory(sub);

  }, [params, AllSubCategory]);

  return (
   <section className=" bg-gray-50 min-h-screen">
   {/* <section className="pt-24 lg:pt-20 bg-gray-50 min-h-screen"> */}
  {/* <div className="container mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]"> */}
  <div className="container mx-auto flex">
    {/* Products */}
    <main className="flex flex-col">
      <div className="bg-white shadow-md p-4 sticky top-0 z-10">
        <h3 className="font-semibold">{categoryName}</h3>
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
