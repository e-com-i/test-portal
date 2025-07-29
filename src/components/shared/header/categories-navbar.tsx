/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

//This component could be simpler with shadcn/UI's MenuBar

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { sampleCategories } from "@/dummyData/CategoryCard";

export function CategoriesNavbar() {
  const trendingCategories = sampleCategories.slice(0, sampleCategories.length);
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {trendingCategories.map((category) => {
          return (
            <>
              <NavigationMenuItem key={category.name}>
                <NavigationMenuTrigger className="p-2">
                  {/* {category.icon ? (
                    <Image unoptimized={true}
                      src={category.icon}
                      alt={category.name}
                      height={20}
                      width={20}
                      className="m-2"
                    />
                  ) : null} */}

                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {category.subCategories.map((subCategory) => (
                      <>
                        <ListItem
                          key={subCategory.name}
                          title={subCategory.name}
                          href="/search/${subCategory}"
                        ></ListItem>
                      </>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
