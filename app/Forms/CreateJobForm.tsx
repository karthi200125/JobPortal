'use client'

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

const CreateJobForm = () => {
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
      company: "",
      jobDesc: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    startTransition(() => {
      console.log(values)
    })
  };

  const { data: countries, isPending: countryLoading } = useQuery({ queryKey: ['getcountries'], queryFn: async () => await getCountries()});
  const { data: states, isPending: statesLoading } = useQuery({ queryKey: ['getStates'], queryFn: async () => await getStates(country)});
  const { data: cities, isPending: citiesLoading } = useQuery({ queryKey: ['getCities'], queryFn: async () => await getCities(country, state)});

  console.log(countries)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomFormField
            name="jobTitle"
            form={form}
            label="Job Title"
            placeholder="Ex:Software Developer"
            isLoading={isLoading}
          />
          <CustomFormField
            name="experience"
            form={form}
            label="Experince"
            placeholder="Ex: 0 - 5 or Fresher"
            isLoading={isLoading}
            isSelect
            options={experiences}
          />
          <CustomFormField
            name="salary"
            form={form}
            label="Salary For This Job"
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
            options={countries}
            onSelect={(d: any) => setCountry(d)}
          />
          {country !== "" &&
            <CustomFormField
              name="state"
              form={form}
              label="Job State"
              placeholder="Ex: TamilNadu , Karnataka ..."
              isLoading={isLoading}
              isSelect
              options={states}
              onSelect={(d: any) => setState(d)}
            />
          }
          {state !== "" &&
            <CustomFormField
              name="city"
              form={form}
              label="Job City"
              placeholder="Ex: Chennai , Bangalore ..."
              isLoading={isLoading}
              isSelect
              options={cities}
              onSelect={(d: any) => setCity(d)}
            />
          }
          <CustomFormField
            name="type"
            form={form}
            label="Job Type"
            placeholder="Ex: FullTime , Internship"
            isLoading={isLoading}
            isSelect
            options={JobTypes}
          />
          <CustomFormField
            name="mode"
            form={form}
            label="Job Mode"
            placeholder="Ex: Onsite , Hybrid"
            isLoading={isLoading}
            isSelect
            options={JobMode}
          />
          <CustomFormField
            name="company"
            form={form}
            label="Select Company"
            placeholder="Ex: Google"
            isLoading={isLoading}
            isSelect
            options={['Yes', "No"]}
          />
        </div>
        <FormField
          control={form.control}
          name="isEasyApply"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  Easy Apply
                </FormLabel>
                <FormDescription>
                  Is This Easy Apply or External Link Apply
                </FormDescription>
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
          placeholder="Ex: somthing about description"
          isLoading={isLoading}
          isTextarea
        />

        <Button isLoading={isLoading} className="!w-full" >Create Job</Button>
      </form>
    </Form>
  )
}

export default CreateJobForm