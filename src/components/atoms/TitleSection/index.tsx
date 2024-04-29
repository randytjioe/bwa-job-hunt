import { FC } from "react";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

interface TitleSectionProps {
  word1: string;
  word2: string;
}

const TitleSection: FC<TitleSectionProps> = ({ word1, word2 }) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="text-4xl font-bold">
        {word1} <span className="text-primary">{word2}</span>
      </div>
      <div className="inline-flex items-center gap-3 font-semibold cursor-pointer text-primary">
        <span>Show all jobs</span>
        <HiOutlineArrowNarrowRight />
      </div>
    </div>
  );
};

export default TitleSection;
