import { z } from "zod";

export const UserInfoSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    firstname: z.string().min(1, {
        message: "Firstname is required",
    }),
    userBio: z.string().min(50, {
        message: "User Bio is required",
    }).max(100, {
        message: "Maximum 100 characters",
    }),
    website: z.string().url({
        message: "Invalid website URL",
    }).optional(),
    lastname: z.string().min(1, {
        message: "Lastname is required",
    }),
    gender: z.string().min(1, {
        message: "Gender is required",
    }),
    address: z.string().min(1, {
        message: "Address is required",
    }),
    // description: z.string().min(100, {
    //     message: "description is required and Minimum 100 words required",
    // }),
    city: z.string().min(1, {
        message: "City is required",
    }),
    state: z.string().min(1, {
        message: "State is required",
    }),
    country: z.string().min(1, {
        message: "Country is required",
    }),
    postalCode: z.string().min(1, {
        message: "Postal Code is required",
    }),
    phoneNo: z.string().min(1, {
        message: "Phone Number is required",
    }).max(10, {
        message: "Phone Number is required and should be at least 10 digits",
    }),
    profession: z.string().min(1, {
        message: "Profession name is required",
    }),
});

export const UserEducationSchema = z.object({
    instituteName: z.string().min(1, {
        message: "Institute Name is required",
    }),
    degree: z.string().min(1, {
        message: "Degree is required",
    }),
    fieldOfStudy: z.string().min(1, {
        message: "Degree is required",
    }),
    startDate: z.string().min(1, {
        message: "Start Date is required",
    }),
    endDate: z.string().min(1, {
        message: "Start Date is required",
    }),
    percentage: z.string().min(1, {
        message: "Percentage Date is required",
    }),
    // educationDesc: z.string().min(1, {
    //     message: "Percentage Date is required",
    // }),
})


export const CreateJobSchema = z.object({
    jobTitle: z.string().min(1, {
        message: "Job Title is required",
    }),
    jobDesc: z.string().min(1, {
        message: "Job Desc required",
    }),
    experience: z.string().min(1, {
        message: "Job Experince required",
    }),
    salary: z.string().min(1, {
        message: "Job Salary required",
    }),
    city: z.string().min(1, {
        message: "Job City required",
    }),
    state: z.string().min(1, {
        message: "Job State required",
    }),
    country: z.string().min(1, {
        message: "Job Country required",
    }),
    type: z.string().min(1, {
        message: "Job Type required",
    }),
    mode: z.string().min(1, {
        message: "Job Mode required",
    }),
    company: z.string().min(1, {
        message: "Select Company",
    }),
    isEasyApply: z.string().min(1, {
        message: "Select this Job is EasyApply or not ",
    }),
    applyLink: z.string().min(1, {
        message: "External Job Apply link",
    }),
})

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required",
    }),
    email: z.string().email({
        message: "A valid email is required",
    }),
    password: z.string().min(6, {
        message: "Password is required, with a minimum of 6 characters",
    }),
    role: z.string().min(1, {
        message: "Selecting a role is required",
    }),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "A valid email is required",
    }),
    password: z.string().min(6, {
        message: "Password is required, with a minimum of 6 characters",
    }),
    role: z.string().min(1, {
        message: "Selecting a role is required",
    }),
})
