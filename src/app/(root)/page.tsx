"use client";

import CategoryCard from "@/components/shared/product/category-card";
import CategoryWiseProductDisplay from "@/components/shared/CategoryWiseProductDisplay";
import { sampleCategories } from "@/dummyData/CategoryCard";
import { valideURLConvert } from "@/utils/valideURLConvert";
import { useAppSelector } from "@/store";
import { useRouter } from "next/navigation"; // ✅ for client-side navigation
import { subCategoryData } from "./product";

const Homepage = () => {
  const router = useRouter(); // ✅ instead of navigate()
  const loadingCategory = useAppSelector(
    (state) => state.product.loadingCategory
  );
  const categoryData = useAppSelector((state) => state.product.allCategory);
  // const subCategoryData = useAppSelector((state) => state.product.allSubCategory);

  console.log(categoryData)

  const banner =
    "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg";
  const bannerMobile =
    "https://cdn.pixabay.com/photo/2024/11/17/04/52/chilli-9202873_1280.jpg";


  const handleRedirectProductListpage = (id: string, name: string) => {

    // const subcategory = subCategoryData?.data.find((sub) =>
    //   sub.category.some((c) => c._id === id)
    // );

    // if (!subcategory) return;

    // const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
    //   subcategory.name
    // )}-${subcategory._id}`;

    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      name)}-${id}`;

    
    router.push(url); // ✅ correct navigation
  };

  return (
    <>
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded" />
                <div className="bg-blue-100 h-8 rounded" />
              </div>
            ))
          : categoryData?.map((cat) => (
              <div
                key={cat.id}
                className="w-full h-full cursor-pointer"
                onClick={() => handleRedirectProductListpage(cat.id, cat.name)}
              >
                <div>
                  <img
                    src={cat.image}
                    className="w-full h-full object-scale-down"
                    alt={cat.name}
                  />
                </div>
              </div>
            ))}
      </div>

      <div className="container mx-auto px-4 my-4 flex gap-4"></div>
{/***display category product */}
      {/* {
        categoryData?.data?.map((category,index)=>{
          return(
            <CategoryWiseProductDisplay
              key={category?._id+"CategorywiseProduct"} 
              id={category?._id} 
              name={category?.name}
            />
          )
        })
      } */}
      {/* <CategoryCard categories={sampleCategories} /> */}
    </>
  );
};

export default Homepage;
