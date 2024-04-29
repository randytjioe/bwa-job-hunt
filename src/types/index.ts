export type JobType = {
  image: string;
  jobType: string;
  name: string;
  type: string;
  location: string;
  desc: string;
  categories: string[];
  needs: number;
  applications: number;
};

export type optionType = {
  id: string;
  label: string;
};

export type filterFormType = {
  label: string;
  name: string;
  items: optionType[];
};

export type CompanyType = {
  name: string;
  image: string;
  description: string;
  totalJobs: number;
  categories: string;
};
