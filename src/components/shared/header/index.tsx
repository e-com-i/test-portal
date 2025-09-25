import Image from "next/image";
import Link from "next/link";
import { APP_NAME, companyInfo, logosPath } from "@/lib/constants";
import Menu from "./menu";
import SearchProducts from "./search-products";
import { Card, CardContent } from "@/components/ui/card";
import Categories from "./categories";

const Header = () => {
  return (
    <Card
      className="w-full"
      style={{ height: "" }}
      suppressHydrationWarning
    >
      <CardContent className="p-[1px] pt-0">
        <div className="wrapper flex-between mb-0 pl-2" >
          <div className="flex-start flex-col">
            <Link href="/" className="flex-start gap-4">
              <Image unoptimized={true}
                src={logosPath?.companyLogo}
                alt={`${APP_NAME} logo`}
                height={60}
                width={70}
                priority={true}
              />
              <Image unoptimized={true}
                src={logosPath?.companyLogoName}
                alt={`${APP_NAME} logo`}
                height={70}
                width={80}
                priority={true}
              />
              {/* <span className="font-bold text-2xl ml-3">
                {APP_NAME}
              </span> */}
            </Link>
            <p className="text-gray-600 text-xs mt-2 ml-4 mb-4"><span className="font-semibold">GST NO:</span> {companyInfo.gstNumber}</p>
          </div>
          <div className="hidden md:block">
            {/* <SearchProducts /> */}
          </div>
          <Menu />
        </div>
        {/* <div className="wrapper">
          <Categories />
        </div> */}
      </CardContent>
    
    </Card>
  );
};

export default Header;
