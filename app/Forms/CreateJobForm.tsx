'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getCompanies } from "@/actions/company/getCompanies";
import { createJobAction } from "@/actions/job/createJobAction";
import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { experiences, getCities, getStates, JobMode, JobTypes } from "@/getOptionsData";
import { CreateJobSchema } from "@/lib/SchemaTypes";
import { useQuery } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CreateJobForm = () => {
  const user = useSelector((state: any) => state.user.user)
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [isLoading, startTransition] = useTransition();
  const router = useRouter()

  const form = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      jobTitle: "",
      experience: "",
      city: "",
      state: "",
      country: "India",
      salary: "",
      isEasyApply: false,
      type: "",
      mode: "",
      applyLink: "",
      company: "",
      jobDesc: "",
      vacancies: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    startTransition(() => {
      const userId = 1
      createJobAction(values, userId)
        .then((data) => {
          if (data?.success) {
            router.push('/dashboard')
          }
        })
    });
  };

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ['getStates'],
    queryFn: async () => await getStates(),
  });
  const { data: citiesOptions = [], isLoading: citiesLoading } = useQuery({
    queryKey: ['getCities', state],
    queryFn: async () => await getCities(state),
  });
  const { data: companies = [], isLoading: companyLoading } = useQuery({
    queryKey: ['getCompanies'],
    queryFn: async () => await getCompanies(),
  });

  const statesOptions = states.map((s: any) => s.name).sort()
  const companiesOptions = companies?.map((company: any) => company?.companyName)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
            placeholder="Ex: TamilNadu"
            isLoading={isLoading}
            isSelect
            options={statesOptions}
            optionsLoading={statesLoading}
            onSelect={(d: any) => setState(d)}
          />
          {state && (
            <CustomFormField
              name="city"
              form={form}
              label="Job City"
              placeholder="Ex: Chennai"
              isLoading={isLoading}
              isSelect
              options={citiesOptions}
              optionsLoading={citiesLoading}
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
          <CustomFormField
            name="vacancies"
            form={form}
            label="Job vacancies"
            placeholder="Ex: 10"
            isLoading={isLoading}
          />
        </div>
        <CustomFormField
          name="company"
          form={form}
          label="Job Company "
          placeholder="Ex: Googlr"
          isLoading={isLoading}
          isSelect
          options={companiesOptions}
          optionsLoading={companyLoading}
        />
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
          placeholder="Ex: https://google.com"
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
