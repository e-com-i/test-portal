 "use client"
import React, { useState, useEffect } from "react";
import { pricewithDiscount } from "@/utils/PriceWithDiscount";
import { DisplayPriceInRupees } from "@/utils/DisplayPriceInRupees";
import { ChevronLeft, ChevronRight, DivideCircle } from "lucide-react";
import AddToCartButton from "@/components/shared/cart/AddToCartButton";

const ProductDisplayPage = () => {
  const storedData = localStorage.getItem("productDetails");
  // Initialize state by reading from localStorage once
        console.log(storedData)
  const [data, setData] = useState<Product>(() => {
    if (typeof window !== "undefined") {
      

      return storedData ? JSON.parse(storedData) : null;
    }
    return null;
  });
  const [imageIndex, setImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const totalImages = data?.image?.length || 0

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No product data found.</p>
      </div>
    );
  }

   // Cycle to previous image, wrap around to last
  const handlePrevious = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 < 0 ? totalImages - 1 : prevIndex - 1));
  };

  // Cycle to next image, wrap around to first
  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1 >= totalImages ? 0 : prevIndex + 1));
  };


  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
      <div>
        <div className="bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full relative overflow-hidden">
        <img
          src={data.image[imageIndex]}
          className="w-full h-full object-scale-down"
          alt={`main-product-${imageIndex + 1}`}
        />

        <div className="w-full h-full hidden lg:flex justify-between items-center absolute top-0 left-0 px-2">
          <button
            onClick={handlePrevious}
            className="z-10 bg-white p-1 rounded-full shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="z-10 bg-white p-1 rounded-full shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 my-2">
        {data.image.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show image ${index + 1}`}
            className={`cursor-pointer rounded-full w-3 h-3 lg:w-5 lg:h-5 ${
              index === imageIndex ? "bg-slate-300" : "bg-slate-200"
            }`}
            onClick={() => setImageIndex(index)}
          />
        ))}
      </div>

      <div className="grid relative">
        <div className="flex gap-4 relative w-full overflow-x-auto scrollbar-none">
          {data.image.map((img, index) => (
            <div
              key={index}
              className="w-20 h-20 cursor-pointer shadow-md"
              onClick={() => setImageIndex(index)}
              aria-label={`Thumbnail image ${index + 1}`}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") setImageIndex(index);
              }}
            >
              <img src={img} alt={`thumbnail-${index + 1}`} className="w-full h-full object-scale-down" />
            </div>
          ))}
        </div>
      </div>

        <div className="my-4 hidden lg:grid gap-3">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {Object.entries(data.more_details).map(([key, value]) => (
            <div key={key}>
              <p className="font-semibold">{key}</p>
              <p className="text-base">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p>{data.unit}</p>
        <DivideCircle />

        <div>
          <p>Price</p>
          <div className="flex items-center gap-4">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInRupees(
                  pricewithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount && (
              <>
                <p className="line-through">
                  {DisplayPriceInRupees(data.price)}
                </p>
                <p className="font-bold text-green-600 lg:text-2xl">
                  {data.discount}%{" "}
                  <span className="text-base text-neutral-500">Discount</span>
                </p>
              </>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
          <div className="my-4">
            <AddToCartButton data={data} />
          </div>
        )}

        <h2 className="font-semibold">Why shop from Binkeyit?</h2>
        <div>
          {/* {[
            {
              img: "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
              title: "Superfast Delivery",
              desc: "Get your order delivered to your doorstep from dark stores near you.",
            },
            {
              img: "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
              title: "Best Prices & Offers",
              desc: "Best price destination with offers directly from the manufacturers.",
            },
            {
              img: "http://res.cloudinary.com/ddwitlcay/image/upload/v1753360223/category-images/xnwiqptw7ovmzbx1hesx.jpg",
              title: "Wide Assortment",
              desc: "Choose from 5000+ products across food, personal care, household & more.",
            },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 my-4">
              <img src={item.img} alt={item.title} className="w-20 h-20" />
              <div className="text-sm">
                <div className="font-semibold">{item.title}</div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))} */}
        </div>

        <div className="my-4 grid gap-3">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {Object.entries(data.more_details).map(([key, value]) => (
            <div key={key}>
              <p className="font-semibold">{key}</p>
              <p className="text-base">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
