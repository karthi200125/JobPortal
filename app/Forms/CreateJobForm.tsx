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
import JobSkills from "../(pages)/createJob/JobSkills";
import JobQuestion from "../(pages)/createJob/JobQuestion";
import JobDesc from "./JobDesc";
import { useCustomToast } from "../../lib/CustomToast";

const CreateJobForm = () => {
  const user = useSelector((state: any) => state.user.user)
  const [jobDesc, setJobDesc] = useState<string>("");;
  const [skills, setSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [skillsErr, setskillsErr] = useState("");
  const [state, setState] = useState('');
  const [isLoading, startTransition] = useTransition();
  const router = useRouter()
  const { showErrorToast, showSuccessToast } = useCustomToast()
  
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
      // jobDesc: "",
      vacancies: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    startTransition(() => {
      const userId = user?.id
      if (skills?.length === 0) {
        setskillsErr("Add atleast on Skill")
        return;
      }
      if (!jobDesc) {
        showErrorToast("add Job Desciption")
        return;
      }

      // const data = {
      //   ...values,
      //   skills,
      //   questions,
      //   jobDesc
      // }

      // console.log(data)

      // createJobAction(values, userId, skills, questions, jobDesc)
      //   .then((data) => {
      //     if (data?.success) {
      //       router.push('/dashboard')
      //       showSuccessToast(data?.success)
      //     }
      //     if (data.error) {
      //       showErrorToast(data?.error)
      //     }
      //   })
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        </div>

        <div className="space-y-3">
          <JobSkills onSkills={(skills: any) => setSkills(skills)} />
          {skillsErr &&
            <h4 className="text-red-500 font-semibold">{skillsErr}</h4>
          }
        </div>

        {/* <CustomFormField
          name="jobDesc"
          form={form}
          label="Job Description"
          placeholder="Ex: Something about the job description"
          isLoading={isLoading}
          isTextarea
        /> */}
        <div className="space-y-2">
          <h5 className="font-bold">JobDescription</h5>
          <JobDesc onJobDesc={(d: string) => setJobDesc(d)} />
        </div>

        <JobQuestion onQuestions={(question: any) => setQuestions(question)} />

        <Button isLoading={isLoading} className="!w-full">Create Job</Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
