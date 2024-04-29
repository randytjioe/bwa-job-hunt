import TitleSection from "@/components/atoms/TitleSection";
import { FC } from "react";
import JobItem from "./JobItem";

interface LatestJobsProps {}

const LatestJobs: FC<LatestJobsProps> = ({}) => {
  return (
    <div className="relative py-16 mt-32 mb-10">
      <TitleSection word1="Latest" word2="Jobs Open" />
      <div className="grid grid-cols-3 gap-8 mt-12">
        {[1, 2, 3, 4, 5].map((item: number) => (
          <JobItem
            key={item}
            image="/images/company2.png"
            jobType="Full Time"
            name="Email Marketing"
            type="Agency"
            location="Lagos, Nigeria"
            categories={["Design", "Marketing"]}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
