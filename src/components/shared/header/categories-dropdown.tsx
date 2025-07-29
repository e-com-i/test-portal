/** @format */

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sampleCategories } from "@/dummyData/CategoryCard";
import { Menu } from "lucide-react";

import Image from "next/image";

const CategoriesDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu size={24} color="currentColor" />
          Browse all categories
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {sampleCategories.map((category) => {
          return (
            <>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {/* {category.icon ? (
                    <Image unoptimized={true}
                      src={category.icon}
                      alt={category.name}
                      height={15}
                      width={15}
                      className="mr-1"
                    />
                  ) : null} */}
                  {category.name}
                </DropdownMenuSubTrigger>
                {/* <DropdownMenuSubContent>
                  {category.subCategories.map((subCategory) => {
                    return (
                      <>
                        <DropdownMenuItem>
                          {subCategory.icon ? (
                            <Image unoptimized={true}
                              src={subCategory.icon}
                              alt={subCategory.name}
                              height={15}
                              width={15}
                              className="mr-1"
                            />
                          ) : null}
                          {subCategory.name}
                        </DropdownMenuItem>
                      </>
                    );
                  })}
                </DropdownMenuSubContent> */}
              </DropdownMenuSub>
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesDropdown;
