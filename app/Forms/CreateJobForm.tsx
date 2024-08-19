'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Editor } from '@tinymce/tinymce-react';
import { Form } from "@/components/ui/form";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { CreateJobSchema } from "@/lib/SchemaTypes";
import CustomFormField from "@/components/CustomFormField";
import { useState, useTransition } from "react";
import Button from "@/components/Button";


const CreateJobForm = () => {
  const [description, setDescription] = useState('write Job description Here');
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
      isEasyApply: "",
      type: "",
      mode: "",
      applyLink: "",
      company: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CreateJobSchema>) => {
    startTransition(() => {
      console.log(values);
    })
  };


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
            options={['software develper']}
          />
          <CustomFormField
            name="salary"
            form={form}
            label="Salary For This Job"
            placeholder="Ex: 3 LPA"
            isLoading={isLoading}
          />
          <CustomFormField
            name="city"
            form={form}
            label="Job City"
            placeholder="Ex: Chennai , Bangalore ..."
            isLoading={isLoading}
            isSelect
            options={['salem']}
          />
          <CustomFormField
            name="state"
            form={form}
            label="Job State"
            placeholder="Ex: TamilNadu , Karnataka ..."
            isLoading={isLoading}
            isSelect
            options={['tamilnadu']}
          />
          <CustomFormField
            name="country"
            form={form}
            label="Job Country"
            placeholder="Ex: India"
            isLoading={isLoading}
            isSelect
            options={['india']}
          />
          <CustomFormField
            name="type"
            form={form}
            label="Job Type"
            placeholder="Ex: FullTime , Internship"
            isLoading={isLoading}
            isSelect
            options={['FullTime']}
          />
          <CustomFormField
            name="mode"
            form={form}
            label="Job Mode"
            placeholder="Ex: Onsite , Hybrid"
            isLoading={isLoading}
            isSelect
            options={['Hybrid']}
          />
          <CustomFormField
            name="isEasyApply"
            form={form}
            label="Easy Apply"
            placeholder="Ex: Yes or No"
            isLoading={isLoading}
            isSelect
            options={['Yes', "No"]}
          />
          <CustomFormField
            name="applyLink"
            form={form}
            label="External Job Apply Link"
            placeholder="Ex: https://...."
            isLoading={isLoading}
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

        {/* job description */}
        <div className="space-y-3">
          <h3>Job Description</h3>
          <Editor
            apiKey="jxdcv7jbtd04p9z0re8cg3mb6cwe29xkryde3hnq7cs2k5bz"
            value={description}
            onEditorChange={(content) => setDescription(content)}
            init={{
              height: 500,
              plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
              content_css: '/path-to-your-custom-styles.css',
            }}
          />
        </div>

        <FormError message="" />
        <FormSuccess message="" />
        <Button isLoading={isLoading} className="!w-full" >Add Education</Button>
      </form>
    </Form>
  )
}

export default CreateJobForm