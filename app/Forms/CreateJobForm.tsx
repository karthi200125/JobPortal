"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getRecruiterCompany } from "@/actions/company/getCompanies";
import { createJobAction } from "@/actions/job/createJobAction";
import Button from "@/components/Button";
import CustomFormField from "@/components/CustomFormField";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  experiences,
  getCities,
  getStates,
  JobMode,
  JobTypes,
} from "@/getOptionsData";
import { CreateJobSchema } from "@/lib/SchemaTypes";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useSelector } from "react-redux";
import JobQuestion from "../(pages)/createJob/JobQuestion";
import JobSkills from "../(pages)/createJob/JobSkills";
import { useCustomToast } from "../../lib/CustomToast";
import JobDesc from "./JobDesc";

const CreateJobForm = () => {
  const user = useSelector((state: any) => state.user.user);
  const [jobDesc, setJobDesc] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [questions, setQuestions] = useState([]);
  const [skillsErr, setSkillsErr] = useState("");
  const [state, setState] = useState("");
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const { data: test } = useQuery({
    queryKey: ['getRecruiterCompany'],
    queryFn: async () => await getRecruiterCompany(user?.id),
    enabled: user?.role === "RECRUITER" && !!user?.id,
  });

  const companyName = user?.role === 'ORGANIZATION' ? user?.username : test?.companyName

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
      company: companyName || "",
      vacancies: "",
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof CreateJobSchema>) => {
      startTransition(() => {

        if (skills.length < 1) {
          setSkillsErr("Add at least one skill");
          showErrorToast("Add at least one skill");
          return;
        }

        if (!jobDesc) {
          showErrorToast("Add a Job Description");
          return;
        }

        createJobAction(values, user?.id, skills, questions, jobDesc)
          .then(
            (data) => {
              if (data?.success) {
                router.push("/dashboard");
                showSuccessToast(data?.success);
              } else if (data?.error) {
                showErrorToast(data?.error);
              }
            }
          );
      });
    },
    [skills, jobDesc, questions, user?.id, router, showSuccessToast, showErrorToast]
  );

  const { data: states = [], isLoading: statesLoading } = useQuery({
    queryKey: ["getStates"],
    queryFn: getStates,
  });

  const { data: citiesOptions = [], isLoading: citiesLoading } = useQuery({
    queryKey: ["getCities", state],
    queryFn: () => getCities(state),
    enabled: !!state,
  });

  const statesOptions = states.map((s: any) => s.name).sort();

  // const { data: companies = [], isLoading: companyLoading } = useQuery({
  //   queryKey: ['getCompanies'],
  //   queryFn: async () => await getCompanies(),
  // });
  // const companiesOptions = companies?.map((company: any) => company?.companyName);


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomFormField
            name="jobTitle"
            form={form}
            label="Job Title"
            placeholder="Ex: Software Developer"
          />
          <CustomFormField
            name="experience"
            form={form}
            label="Experience"
            placeholder="Ex: 0 - 5 or Fresher"
            isSelect
            options={experiences}
          />
          <CustomFormField
            name="salary"
            form={form}
            label="Salary Per Annum"
            placeholder="Ex: 3 LPA"
          />
          <CustomFormField
            name="country"
            form={form}
            label="Country"
            isSelect
            options={["India"]}
          />
          <CustomFormField
            name="state"
            form={form}
            label="State"
            isSelect
            options={statesOptions}
            optionsLoading={statesLoading}
            onSelect={setState}
          />
          {state && (
            <CustomFormField
              name="city"
              form={form}
              label="City"
              isSelect
              options={citiesOptions}
              optionsLoading={citiesLoading}
            />
          )}
          <CustomFormField
            name="type"
            form={form}
            label="Job Type"
            isSelect
            options={JobTypes}
          />
          <CustomFormField
            name="mode"
            form={form}
            label="Job Mode"
            isSelect
            options={JobMode}
          />
          <CustomFormField
            name="vacancies"
            form={form}
            label="Vacancies"
            placeholder="Ex: 10"
          />
        </div>

        <CustomFormField
          name="company"
          form={form}
          label="Company"
          placeholder="Ex: Google"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="isEasyApply"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div>
                  <FormLabel className="text-base">Easy Apply</FormLabel>
                  <FormDescription>Enable if this job has an easy apply option</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <CustomFormField
            name="applyLink"
            form={form}
            label="External Apply Link"
            placeholder="Ex: https://google.com"
          />
        </div>

        <div className="space-y-3">
          <JobSkills onSkills={setSkills} />
          {skillsErr && <p className="text-red-500 font-semibold">{skillsErr}</p>}
        </div>

        <div className="space-y-2">
          <h5 className="font-bold">Job Description</h5>
          <JobDesc onJobDesc={setJobDesc} />
        </div>

        <JobQuestion onQuestions={(question: any) => setQuestions(question)} />

        <Button isLoading={isLoading} className="!w-full">
          Create Job
        </Button>
      </form>
    </Form>
  );
};

export default CreateJobForm;
