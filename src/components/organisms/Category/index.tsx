import TitleSection from "@/components/atoms/TitleSection";
import { FC } from "react";
import { BiCategory } from "react-icons/bi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import CategoryItem from "./CategoryItem";

interface CategoryProps {}

const Category: FC<CategoryProps> = ({}) => {
  return (
    <div className="mt-32 mb-8">
      <TitleSection word1="Explore by" word2="category" />
      <div className="grid grid-cols-5 mt-12 gap-9">
        {[1, 2, 3, 4, 5].map((item: number) => (
          <CategoryItem key={item} name="Category" totalJobs={100} />
        ))}
      </div>
    </div>
  );
};

export default Category;
