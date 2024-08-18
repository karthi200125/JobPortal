'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Textarea } from "./ui/textarea";

interface CustomFormFieldProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label?: string;
    name: Path<T>;
    placeholder?: string;
    type?: string;
    selectCls?: string;
    isTextarea?: boolean;
    isLoading?: boolean;
    isSelect?: boolean;
    options?: string[];
}

const CustomFormField = <T extends FieldValues>({
    form,
    label,
    name,
    placeholder,
    type,
    isTextarea,
    isSelect,
    selectCls,
    options,
    isLoading
}: CustomFormFieldProps<T>) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {isSelect ?
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                                <SelectTrigger className={`w-full ${selectCls}`}>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {/* <SelectLabel>{label}</SelectLabel> */}
                                        {options?.map((option) => (
                                            <SelectItem key={option} value={option}>{option}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            :
                            isTextarea ?
                                <Textarea {...field} placeholder={placeholder} id="message-2" disabled={isLoading} />
                                :
                                <Input placeholder={placeholder} {...field} type={type || "text"} disabled={isLoading} />
                        }

                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;
