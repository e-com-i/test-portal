import CategoriesDropdown from "./categories-dropdown";
import { CategoriesNavbar } from "./categories-navbar";

const Categories = () => {
  return (
    <header className="w-full" suppressHydrationWarning>
      <div className="flex-between">
        <div className="flex-start">
          <CategoriesDropdown />
        </div>
        <div className=" hidden lg:block flex-end">
          <CategoriesNavbar />
        </div>
      </div>
    </header>
  );
};

export default Categories;
