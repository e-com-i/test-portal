
import React from 'react'
import { pricewithDiscount } from '@/utils/PriceWithDiscount';
import { DisplayPriceInRupees } from '@/utils/DisplayPriceInRupees';
import { ChevronLeft, ChevronRight, DivideCircle } from 'lucide-react';
import AddToCartButton from '@/components/shared/AddToCartButton';
// import Divider from '../components/Divider'

// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'


// 🧪 Mock static data
const mockProduct = {
    "_id": "68822788f5928b1d05cb013a",
    "name": "Tata Tea Agni Special Blend Tea",
    "image": [
        "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
        "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360239/category-images/ryfwkotcr6d4sgw6kttl.jpg",
        "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360247/category-images/kjqttyakrhhu4pbkxkub.jpg",
        "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360254/category-images/ieoarqif207ejvdfarrh.jpg",
        "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360261/category-images/hpfhqiacoqsj1zxxwjfc.jpg"
    ],
    "category": [
        "686551d0216f5ba9b411d744"
    ],
    "subCategory": [
        "686aa3fb43c48c6b25c3b722"
    ],
    "unit": "1 Kg",
    "stock": 10,
    "price": 150,
    "discount": 1,
    "description": "\nTata Tea Agni offers a strong cup of tea at an affordable price, energizing people to overcome any challenges along the way. Tata Tea Agni’s 10% extra strong leaves give a strong taste in every cup. With a special blend of tea leaves, it offers freshness & rich fullness that will leave you longing for more. Enjoy it whenever you long for a strong cup of tea to awaken your mind and get rejuvenated.\n",
    "more_details": {
        "Key Features": "Enjoy a strong cup of tea with Tata Tea Agni Strong Leaf Tea. Make your mornings strong with 10% extra strong leaves. Tata Agni leaf tea has a special blend of tea leaves. Make anytime tea time with a refreshing sip of your favorite tea",
        "Storage Tips": "Once opened, transfer the contents into an airtight container and keep the lid tightly closed after each use.",
        "Type": "Leaf Tea",
        "Shelf Life": "12 Months",
        "Manufacturer Details": "Tata Consumer Products Ltd, 3rd Floor Block C, Kirloskar Business Park, Hebbal, Bengaluru 560024",
        "Marketed By": "Tata Consumer Products Ltd, 3rd Floor Block C, Kirloskar Business Park, Hebbal, Bengaluru 560024",
        "Return Policy": " This Item is non-returnable. For a damaged, defective, incorrect or expired item, you can request a replacement within 72 hours of delivery. In case of an incorrect item, you may raise a replacement or return request only if the item is sealed/ unopened/ unused and in original condition."
    },
    "publish": true,
    "createdAt": "2025-07-24T12:31:04.900Z",
    "updatedAt": "2025-07-24T12:31:04.900Z",
    "__v": 0
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
            <button className='z-10 bg-white p-1 rounded-full shadow-lg'><ChevronLeft /></button>
            <button className='z-10 bg-white p-1 rounded-full shadow-lg'><ChevronRight /></button>
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
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className='font-semibold'>Why shop from Binkeyit?</h2>
        <div>
          {[{
            img: "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
            title: "Superfast Delivery",
            desc: "Get your order delivered to your doorstep from dark stores near you."
          }, {
            img: "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
            title: "Best Prices & Offers",
            desc: "Best price destination with offers directly from the manufacturers."
          }, {
           img: "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
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
