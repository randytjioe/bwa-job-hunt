import TitleSection from "@/components/atoms/TitleSection";
import { FC } from "react";
import JobItem from "./JobItem";

interface FeaturedJobsProps {}

const FeaturedJobs: FC<FeaturedJobsProps> = ({}) => {
  return (
    <div className="mt-32 mb-10">
      <TitleSection word1="Featured" word2="Jobs" />
      <div className="grid grid-cols-4 gap-8 mt-12">
        {[1, 2, 3, 4, 5].map((item: number) => (
          <JobItem
            key={item}
            image="/images/company.png"
            jobType="Full Time"
            name="Email Marketing"
            type="Agency"
            location="Lagos, Nigeria"
            desc="We are looking for an Email Marketing Expert to join our team"
            categories={["Marketing", "Social Media"]}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
