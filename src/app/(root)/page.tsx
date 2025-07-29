/** @format */

import CategoryCard from "@/components/shared/product/category-card";
import ProductList from "@/components/shared/product/product-list";
import { sampleCategories } from "@/dummyData/CategoryCard";
import { staticSampleData } from "@/json-data-keeper/static-data";
import Link from "next/link";


const Homepage = async () => {
  //await(delay(2000));
  // const success = await manualLoadData();
  // console.log("Manual load result:", success);

  const banner = "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg";
const bannerMobile = "https://cdn.pixabay.com/photo/2024/11/17/04/52/chilli-9202873_1280.jpg";

  return (
    <>



    <div className='container mx-auto'>
          <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" } `}>
              <img
                src={banner}
                className='w-full h-full hidden lg:block'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div>
      </div>
      <Link href="/product/nandini-toned-milk/productid/37083">
  View Product
</Link>
      <CategoryCard categories={sampleCategories} />
      <ProductList data={staticSampleData.products} title="Products" limit={10} />
    </>
  );
};

export default Homepage;
