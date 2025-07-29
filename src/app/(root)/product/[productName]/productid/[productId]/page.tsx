// src/app/prn/[productName]/prid/[productId]/page.tsx

// import { useParams } from "next/navigation";

// interface Props {
//   params: {
//     productName: string;
//     productId: string;
//   };
// }

// export default function ProductPage({ params }: Props) {
//   const { productName, productId } = params;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Product Name: {productName}</h1>
//       <p>Product ID: {productId}</p>
//     </div>
//   );
// }


import React from 'react'
// import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import { pricewithDiscount } from '@/utils/PriceWithDiscount';
import { DisplayPriceInRupees } from '@/utils/DisplayPriceInRupees';
import { DivideCircle } from 'lucide-react';
// import Divider from '../components/Divider'
// import AddToCartButton from '../components/AddToCartButton'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'


// 🧪 Mock static data
const mockProduct = {
  name: "Toned Milk 1L",
  unit: "1L",
  description: "Freshly packed toned milk ideal for daily use.",
  price: 60,
  discount: 20,
  stock: 15,
  image: [
    "https://cdn.pixabay.com/photo/2021/07/17/11/45/stamens-6472927_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/01/01/11/11/milk-7792219_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/06/21/08/33/milk-5324449_1280.jpg"
  ],
  more_details: {
    Brand: "Nandini",
    Fat: "3.0%",
    Package: "Tetrapak"
  }
};

const ProductDisplayPage = () => {
  const data = mockProduct;
  const imageIndex = 0; // static preview image

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[imageIndex]}
            className='w-full h-full object-scale-down'
            alt='main-product'
          />
        </div>

        <div className='flex items-center justify-center gap-3 my-2'>
          {data.image.map((_, index) => (
            <div key={index} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === imageIndex ? 'bg-slate-300' : ''}`}></div>
          ))}
        </div>

        <div className='grid relative'>
          <div className='flex gap-4 relative w-full overflow-x-auto scrollbar-none'>
            {data.image.map((img, index) => (
              <div className='w-20 h-20 cursor-pointer shadow-md' key={index}>
                <img src={img} alt='thumbnail' className='w-full h-full object-scale-down' />
              </div>
            ))}
          </div>
          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center'>
            {/* <button className='z-10 bg-white p-1 rounded-full shadow-lg'><FaAngleLeft /></button>
            <button className='z-10 bg-white p-1 rounded-full shadow-lg'><FaAngleRight /></button> */}
          </div>
        </div>

        <div className='my-4 hidden lg:grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {Object.entries(data.more_details).map(([key, value]) => (
            <div key={key}>
              <p className='font-semibold'>{key}</p>
              <p className='text-base'>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <DivideCircle />

        <div>
          <p>Price</p>
          <div className='flex items-center gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>
                {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
              </p>
            </div>
            {data.discount && (
              <>
                <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
                <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
              </>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className='text-lg text-red-500 my-2'>Out of Stock</p>
        ) : (
          <div className='my-4'>
            {/* <AddToCartButton data={data} /> */}
          </div>
        )}

        <h2 className='font-semibold'>Why shop from Binkeyit?</h2>
        <div>
          {[{
            img: "https://cdn.pixabay.com/photo/2021/07/17/11/45/stamens-6472927_1280.jpg",
            title: "Superfast Delivery",
            desc: "Get your order delivered to your doorstep from dark stores near you."
          }, {
            img: "https://cdn.pixabay.com/photo/2021/07/17/11/45/stamens-6472927_1280.jpg",
            title: "Best Prices & Offers",
            desc: "Best price destination with offers directly from the manufacturers."
          }, {
           img: "https://cdn.pixabay.com/photo/2021/07/17/11/45/stamens-6472927_1280.jpg",
            title: "Wide Assortment",
            desc: "Choose from 5000+ products across food, personal care, household & more."
          }].map((item, i) => (
            <div key={i} className='flex items-center gap-4 my-4'>
              <img src={item.img} alt={item.title} className='w-20 h-20' />
              <div className='text-sm'>
                <div className='font-semibold'>{item.title}</div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {Object.entries(data.more_details).map(([key, value]) => (
            <div key={key}>
              <p className='font-semibold'>{key}</p>
              <p className='text-base'>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPage
