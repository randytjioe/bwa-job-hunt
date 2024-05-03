"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import CheckboxForms from "./CheckboxForms";
import { filterFormType } from "@/types";
import { FC } from "react";

interface FormFilterDynamicProps {
  formFilter: any;
  onSubmitFilter: (val: any) => Promise<void>;
  filterForms: filterFormType[];
}

const FormFilterDynamic: FC<FormFilterDynamicProps> = ({
  formFilter,
  onSubmitFilter,
  filterForms,
}) => {
  return (
    <Form {...formFilter}>
      <form onSubmit={formFilter.handleSubmit(onSubmitFilter)}>
        {filterForms.map((item: filterFormType, i: number) => (
          <CheckboxForms
            key={i}
            formFilter={formFilter}
            items={item.items}
            label={item.label}
            name={item.name}
          />
        ))}
        <Button className="w-full mt-5">Apply Filter</Button>
        <Button variant="outline" className="w-full mt-3">
          Reset Filter
        </Button>
      </form>
    </Form>
  );
};

export default FormFilterDynamic;
