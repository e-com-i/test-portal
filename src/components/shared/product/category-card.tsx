/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const CategoryCard = ({ categories }: any) => {
  return (
    <div>
      {categories.map((category: any) => (
        <div key={category.name}>
          <h3 className="h3-bold mb-2">{category.name}</h3>
          <div className="flex flex-wrap flex-between gap-4">
            {category.subCategories.map((subcategory: any) => (
              <div
                key={subcategory.name}
                className="flex-1 min-w-[100px] sm: max-w-[calc(100%/2-15px)] md:max-w-[calc(100%/3-15px)]"
              >
                <Card className="w-[100%]">
                  <CardContent className="flex-center p-2">
                    <div className="mt-4 ml-4" style={{ width: "100%" }}>
                      <div
                        className="flex flex-center"
                        style={{
                          width: "90%",
                          height: "90px",
                          background: "#f6f6f6",
                        }}
                      >
                        <Image unoptimized={true}
                          src={subcategory.icon}
                          alt={subcategory.name}
                          height={20}
                          width={80}
                          priority={true}
                        />
                      </div>
                      <div style={{ marginTop: "2px" }}>
                        <div className="text-xs">{subcategory.name}</div>
                        <div className="font-bold">20% OFF!</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default CategoryCard;
