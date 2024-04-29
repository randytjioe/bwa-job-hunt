"use client";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import { formFilterSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES_OPTIONS } from "@/constansts";
import { JobType } from "@/types";

const FILTER_FORMS: filterFormType[] = [
  {
    name: "categories",
    label: "Categories",
    items: CATEGORIES_OPTIONS,
  },
];

const dummyData: JobType[] = [
  {
    applications: 0,
    categories: ["IT"],
    desc: "We are looking for an Email Marketing Expert to join our team",
    image: "/images/company2.png",
    jobType: "Full Time",
    location: "Indonesia",
    name: "Email Marketing Expert",
    needs: 10,
    type: "Part Time",
  },
];
export default function FindJobsPage() {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });
  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    console.log(val);
  };
  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={FILTER_FORMS}
      loading={false}
      data={dummyData}
      type="job"
      title="dream job"
      subtitle="Find your next career at companies like HubSpot, Nielsen, and Dropbox"
    />
  );
}
