'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { experiences, getCities, getCountries, getStates, JobTypes, JobMode } from "@/getOptionsData";
import { CreateJobSchema } from "@/lib/SchemaTypes";
import { useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { getCompanies } from "@/actions/company/getCompanies";
import { createJobAction } from "@/actions/job/createJobAction";
import { useSelector } from "react-redux";

const CreateJobForm = () => {
  const user = useSelector((state: any) => state.user.user)
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      jobTitle: "",
      experience: "",
      city: "",
      state: "",
      country: "",
      salary: "",
      isEasyApply: false,
      type: "",
      mode: "",
      applyLink: "",
      // company: "",
      jobDesc: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    startTransition(() => {
      const userId = 7
      const companyId = 1
      createJobAction(values, userId, companyId)
        .then((data) => {
          console.log(data)
          if (data?.success) {
            console.log(data)
          }
        })
    });
  };

  // const { data: countries = [], isLoading: countryLoading } = useQuery({
  //   queryKey: ['getCountries'],
  //   queryFn: async () => await getCountries(),
  // });
  // const { data: states = [], isLoading: statesLoading } = useQuery({
  //   queryKey: ['getStates', country],
  //   queryFn: async () => await getStates("India"),
  //   enabled: !!country,
  // });
  // const { data: cities = [], isLoading: citiesLoading } = useQuery({
  //   queryKey: ['getCities', country, state],
  //   queryFn: async () => await getCities(state),
  //   enabled: !!state,
  // });
  const { data: companies = [], isLoading: companyLoading } = useQuery({
    queryKey: ['getCompanies'],
    queryFn: async () => await getCompanies(),
  });

  // const countriesOptions = countries.map((c: any) => c.name).sort();
  // const statesOptions = states.length > 0 ? states.map((s: any) => s.name).sort() : [];
  // const citiesOptions = cities.length > 0 ? cities.map((c: any) => c.name).sort() : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomFormField
            name="jobTitle"
            form={form}
            label="Job Title"
            placeholder="Ex: Software Developer"
            isLoading={isLoading}
          />
          <CustomFormField
            name="experience"
            form={form}
            label="Experience"
            placeholder="Ex: 0 - 5 or Fresher"
            isLoading={isLoading}
            isSelect
            options={experiences}
          />
          <CustomFormField
            name="salary"
            form={form}
            label="Salary For This Job Per Annum"
            placeholder="Ex: 3 LPA"
            isLoading={isLoading}
          />
          <CustomFormField
            name="country"
            form={form}
            label="Job Country"
            placeholder="Ex: India"
            isLoading={isLoading}
            isSelect
            options={["India"]}
            onSelect={(d: any) => setCountry(d)}
          />
          <CustomFormField
            name="state"
            form={form}
            label="Job State"
            placeholder="Ex: TamilNadu, Karnataka ..."
            isLoading={isLoading}
            isSelect
            options={['TamilNadu']}
            onSelect={(d: any) => setState(d)}
          />
          {state && (
            <CustomFormField
              name="city"
              form={form}
              label="Job City"
              placeholder="Ex: Chennai, Bangalore ..."
              isLoading={isLoading}
              isSelect
              options={["Chennai"]}
              onSelect={(d: any) => setCity(d)}
            />
          )}
          <CustomFormField
            name="type"
            form={form}
            label="Job Type"
            placeholder="Ex: Full-Time, Internship"
            isLoading={isLoading}
            isSelect
            options={JobTypes}
          />
          <CustomFormField
            name="mode"
            form={form}
            label="Job Mode"
            placeholder="Ex: Onsite, Hybrid"
            isLoading={isLoading}
            isSelect
            options={JobMode}
          />
          {/* <CustomFormField
            name="company"
            form={form}
            label="Select Company"
            placeholder="Ex: Google"
            isLoading={isLoading}
            isSelect
            options={['Google']}
          /> */}
        </div>
        <FormField
          control={form.control}
          name="isEasyApply"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Easy Apply</FormLabel>
                <FormDescription>Is This Easy Apply or External Link Apply</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <CustomFormField
          name="applyLink"
          form={form}
          label="External Job Apply Link"
          placeholder="Ex: https://...."
          isLoading={isLoading}
        />
        <CustomFormField
          name="jobDesc"
          form={form}
          label="Job Description"
          placeholder="Ex: Something about the job description"
          isLoading={isLoading}
          isTextarea
        />
        <Button isLoading={isLoading} className="!w-full">Create Job</Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
