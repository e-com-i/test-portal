'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {  toast } from "sonner";
const AddToCart = (item: any) => {

    const router = useRouter();

  //TODO: Move into actions when available
  const addItemToCart = ({item}: any) => {
    return new Promise((resolve)=> resolve({
      success: true,
      message: `${item.name} added to cart`,
    }));
  };

  const handleAddToCart = async () => {
    const res = await addItemToCart(item) as any;
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    //Handle success add to cart
     toast.success(res.message, {
       action: (
         <Button
           variant="link"
           onClick={() => (router.push("/cart"))}
         >
           Go to Cart
         </Button>
       ),
     });
  };


  return (
    <>
      <Button className="w-full" type="button" onClick={handleAddToCart}>
        < PlusIcon />Add To Cart
      </Button>
    </>
  );
};

export default AddToCart;
