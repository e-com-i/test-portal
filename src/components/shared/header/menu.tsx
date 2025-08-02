"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, UserIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ModeToggle from "./mode-toggle";
import { DisplayPriceInRupees } from "@/utils/DisplayPriceInRupees";
import { useAppSelector } from "@/store";
import { useState } from "react";
import { useGlobalContext } from "@/providers/GlobalProvider";
import  DisplayCartItem  from "@/components/shared/DisplayCartItem"

const Menu = () => {
  const user = useAppSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const cartItem = useAppSelector((state) => state.cartItem.cart);
  // const [totalPrice,setTotalPrice] = useState(0)
  // const [totalQty,setTotalQty] = useState(0)
  const { totalPrice, totalQty } = useGlobalContext();
  const [openCartSection, setOpenCartSection] = useState(false);
console.log(cartItem)
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <button
          onClick={() => setOpenCartSection(true)}
          className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
        >
          {/**add to card icons */}
          <div className="animate-bounce">
            <ShoppingCart size={26} />
          </div>
          <div className="font-semibold text-sm">
            {cartItem[0] ? (
              <div>
                <p>{totalQty} Items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            ) : (
              <p>My Cart</p>
            )}
          </div>
        </button>
        {/* <Button asChild variant="ghost">
          <Link href='/cart'>
            <ShoppingCart /> Cart
          </Link>
          
        </Button> */}
        <Button asChild className="flex items-center gap-2 bg-white hover:bg-green-700 px-3 py-2 rounded text-primary">
          <Link href="/sign-in">
            <UserIcon /> Sign In
          </Link>
        </Button>
      </nav>
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <Button
              onClick={() => setOpenCartSection(true)}
              className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white"
            >
              {/**add to card icons */}
              <div className="animate-bounce">
                <ShoppingCart size={26} />
              </div>
              <div className="font-semibold text-sm">
                {cartItem[0] ? (
                  <div>
                    <p>{totalQty} Items</p>
                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                  </div>
                ) : (
                  <p>My Cart</p>
                )}
              </div>
            </Button>
            {/* <Button asChild variant="ghost">
              <Link href='/cart'>
                <ShoppingCart /> Cart
              </Link>
            </Button> */}
            <Button asChild className="flex items-center gap-2  px-3 py-2 rounded">
              <Link href="/sign-in">
                <UserIcon /> Sign In
              </Link>
            </Button>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
       {
            openCartSection && (
                <DisplayCartItem close={()=>setOpenCartSection(false)}/>
            )
        }
    </div>
  );
};

export default Menu;
