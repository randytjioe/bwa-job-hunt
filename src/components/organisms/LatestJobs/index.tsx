"use client";
import TitleSection from "@/components/atoms/TitleSection";
import { FC } from "react";
import JobItem from "./JobItem";
import useFeaturedJobs from "@/hooks/useFeaturedJobs";
import { JobType } from "@/types";

interface LatestJobsProps {}

const LatestJobs: FC<LatestJobsProps> = ({}) => {
  const { jobs, isLoading, error } = useFeaturedJobs();
  return (
    <div className="relative py-16 mt-32 mb-10">
      <TitleSection word1="Latest" word2="Jobs Open" />
      <div className="grid grid-cols-3 gap-8 mt-12">
        {jobs.map((item: JobType) => (
          <JobItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
