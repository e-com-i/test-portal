import { cn } from "@/lib/utils";

const ProductPrice = ({
  originalPrice,
  discount,
  className,
}: {
  originalPrice: number;
  discount: number;
  className?: string;
}) => {
  const discountedPrice = ((1 - discount / 100) * originalPrice).toFixed(2);
  
  return (
    <div>
      {discount == 0 ? (
        <div className="flex items-center space-x-2">
          <p className={cn("text-2xl", className)}>₹{originalPrice}</p>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <p className={cn("text-2xl", className)}>₹{discountedPrice}</p>
          <span className="text-sm line-through text-gray-500">
            ₹{originalPrice}
          </span>
          <span className="text-sm text-red-500 font-semibold">
            ({discount.toFixed(0)}% OFF)
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
