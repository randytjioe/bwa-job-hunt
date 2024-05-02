"use client";
import ExploreDataContainer from "@/containers/ExploreDataContainer";
import { formFilterSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CATEGORIES_OPTIONS } from "@/constansts";
import { JobType } from "@/types";
import useCategoryJobFilter from "@/hooks/useCategoryJobFilter";
import useJobs from "@/hooks/useJobs";
import { useEffect, useMemo, useState } from "react";

export default function FindJobsPage() {
  const formFilter = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      categories: [],
    },
  });
  const { filters } = useCategoryJobFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const { jobs, isLoading, mutate } = useJobs(categories);
  // const categories = useMemo(() => {
  //   return formFilter.getValues("categories");
  // }, [formFilter]);

  const onSubmitFormFilter = async (val: z.infer<typeof formFilterSchema>) => {
    setCategories(val.categories);
  };
  useEffect(() => {
    mutate();
  }, [categories]);
  return (
    <ExploreDataContainer
      formFilter={formFilter}
      onSubmitFilter={onSubmitFormFilter}
      filterForms={filters}
      loading={isLoading}
      data={jobs}
      type="job"
      title="dream job"
      subtitle="Find your next career at companies like HubSpot, Nielsen, and Dropbox"
    />
  );
}
