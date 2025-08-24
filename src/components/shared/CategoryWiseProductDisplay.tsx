import React, { useEffect, useRef, useState } from "react";
import AxiosToastError from "@/utils/AxiosToastError";
import { valideURLConvert } from "@/utils/valideURLConvert";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppSelector } from "@/store";
import Link from "next/link";
import { categorywiseProducts } from "@/app/(root)/product";
import CardProduct from "./productNew/CardProduct";
import CardLoading from "./productNew/CardLoading";

const CategoryWiseProductDisplay = ({ id, name }) => {
  // const [data, setData] = useState([])
  const [data, setData] = useState(categorywiseProducts?.data);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  // const subCategoryData = useAppSelector(state => state.product.allSubCategory)
  const loadingCardNumber = new Array(6).fill(null);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      // const response = await Axios({
      //   ...SummaryApi.getProductByCategory,
      //   data: {
      //     id: id,
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

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = categorywiseProducts?.data.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `${valideURLConvert(name)}-${id}`;

    return url;
  };

  const redirectURL = handleRedirectProductListpage();
  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link
          href={redirectURL}
          className="text-green-600 hover:text-green-400"
        >
          See All
        </Link>
      </div>
      <div className="relative flex items-center ">
        <div
          className=" flex gap-2 md:gap-4 lg:gap-6 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={"CategorywiseProductDisplay123" + index} />
              );
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={p._id + "CategorywiseProductDisplay" + index}
              />
            );
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
