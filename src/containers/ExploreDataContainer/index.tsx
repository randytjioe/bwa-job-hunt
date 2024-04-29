import CompanyCard from "@/components/organisms/CompanyCard";
import FormFilterDynamic from "@/components/organisms/FormFilterDynamic";
import FormSearchDynamic from "@/components/organisms/FormSearchDynamic";
import JobCard from "@/components/organisms/JobCard";
import { JobType, filterFormType } from "@/types";
import Image from "next/image";
import { FC } from "react";

interface ExploreDataContainerProps {
  formFilter?: any;
  onSubmitFilter?: (val: any) => Promise<void>;
  filterForms: filterFormType[];
  loading: boolean;
  title: string;
  subtitle: string;
  data: any[];
  type: "job" | "company";
}

const ExploreDataContainer: FC<ExploreDataContainerProps> = ({
  formFilter,
  onSubmitFilter,
  filterForms,
  loading,
  title,
  subtitle,
  data,
  type,
}) => {
  return (
    <>
      <div className="px-32 pt-16 bg-gray-200 pb-14">
        <div className="mb-10">
          <div className="flex justify-center gap-2 mx-auto text-center mb-11">
            <span className="text-5xl font-semibold">Find Your</span>
            <div className="relative">
              <span className="text-5xl font-semibold text-primary">
                {title}
              </span>
              <div className="absolute top-10 h-10 w-[220px]">
                <Image
                  src="/images/pattern2.png"
                  alt="/images/pattern2.png"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500">{subtitle}</div>
        </div>
        <div>
          <FormSearchDynamic />
        </div>
      </div>
      <div className="flex flex-row items-start gap-10 px-32 mt-20 mb-16">
        <div className="w-1/5">
          <FormFilterDynamic
            formFilter={formFilter}
            onSubmitFilter={onSubmitFilter}
            filterForms={filterForms}
          />
        </div>
        <div className="w-4/5">
          <div className="mb-8">
            <div className="text-3xl font-semibold">
              All {type === "job" ? "Jobs" : "Companies"}
            </div>
            <div className="text-muted-foreground">
              Showing {data.length} Result
            </div>
          </div>
          <div className="">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {type === "job" ? (
                  <div className="grid grid-cols-1 gap-7">
                    {data.map((item: any, i: number) => (
                      <JobCard
                        key={i}
                        applications={5}
                        categories={["Engineering"]}
                        desc="lorem"
                        image="/images/company2.png"
                        jobType="Full Time"
                        location="Remote"
                        name="Software Engineer"
                        needs={15}
                        type="Part Time"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-5">
                    {data.map((item: any, i: number) => (
                      <CompanyCard key={i} {...item} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExploreDataContainer;
