import { ROUTE } from "@/helpers/routes";
import Link from "next/link";
import Search from "./Search";

const Categories = () => {
  return (
    <div className="w-full bg-white rounded-2xl xl:rounded-full p-3 shadow-lg flex flex-col gap-3 mt-4 md:flex-row md:items-center md:justify-between">
      {/* links */}
      <div className="flex overflow-x-auto md:overflow-visible gap-3 scrollbar-hide">
        <Link
          href={ROUTE.ALL_BLOGS}
          className="bg-blue-800 text-white whitespace-nowrap rounded-full px-4 py-2"
        >
          All Blogs
        </Link>
        <Link
          href={`${ROUTE.ALL_BLOGS}?category=web`}
          className="hover:bg-blue-50 whitespace-nowrap rounded-full px-4 py-2"
        >
          Web Design
        </Link>
        <Link
          href={`${ROUTE.ALL_BLOGS}?category=development`}
          className="hover:bg-blue-50 whitespace-nowrap rounded-full px-4 py-2"
        >
          Development
        </Link>
        <Link
          href={`${ROUTE.ALL_BLOGS}?category=databases`}
          className="hover:bg-blue-50 whitespace-nowrap rounded-full px-4 py-2"
        >
          Databases
        </Link>
        <Link
          href={`${ROUTE.ALL_BLOGS}?category=search-engines`}
          className="hover:bg-blue-50 whitespace-nowrap rounded-full px-4 py-2"
        >
          Search Engines
        </Link>
        <Link
          href={`${ROUTE.ALL_BLOGS}?category=marketing`}
          className="hover:bg-blue-50 whitespace-nowrap rounded-full px-4 py-2"
        >
          Marketing
        </Link>
      </div>

      {/* divider for md+ */}
      <span className="hidden md:block text-xl font-medium">|</span>

      {/* search */}
      <div className="w-full md:w-auto">
        <Search />
      </div>
    </div>
  );
};

export default Categories;
