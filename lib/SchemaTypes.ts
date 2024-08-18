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
    fieldofstudy: z.string().min(1, {
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
    educationDesc: z.string().min(1, {
        message: "Percentage Date is required",
    }),
})
