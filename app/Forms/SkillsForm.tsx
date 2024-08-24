"use client";

import { userSkillAction } from "@/actions/user/userSkillsAction";
import Button from "@/components/Button";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { useParams, usePathname } from "next/navigation";
import { ChangeEvent, FormEvent, KeyboardEvent, useState, useTransition } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";
import { useQueryClient } from "@tanstack/react-query";

const allSkills = [
    "JavaScript",
    "Java",
    "jungle",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Tailwind CSS",
    "Framer Motion",
    "Firebase",
];

interface SkillsFormProps {
    isEdit?: boolean;
    skillsData?: string[]
}

export function SkillsForm({ isEdit, skillsData }: SkillsFormProps) {
    const user = useSelector((state: any) => state.user.user)
    const [isLoading, startTransition] = useTransition();
    const [skills, setSkills] = useState<string[]>(skillsData || []);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const dispatch = useDispatch();

    const pathaname = usePathname()
    const params = useParams()
    const userId = pathaname === '/welcome' ? user?.id : Number(params.userId)
    const queryClient = useQueryClient();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(skills)
        startTransition(() => {
            userSkillAction(skills, userId)
                .then((data) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ['getuser', userId] })
                        dispatch(loginRedux(data?.data))
                    }
                    if (data?.error) {
                    }
                })
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() !== "") {
            const filteredSuggestions = allSkills.filter(skill =>
                skill.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = (suggestion: string) => {
        if (!skills.includes(suggestion)) {
            setSkills([...skills, suggestion]);
        }
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (searchTerm.trim() !== "" && !skills.includes(searchTerm)) {
                setSkills([...skills, searchTerm.trim()]);
            }
            setSearchTerm("");
            setSuggestions([]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };



    return (
        <form onSubmit={onSubmit} className="space-y-10">
            <div className="space-y-2 relative">
                <h4 className="font-bold">Skills</h4>
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Enter Your skill"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full border rounded-md py-2 px-5 placeholder:text-sm"
                />
                {suggestions.length > 0 && (
                    <div className=" border rounded-md mt-2 max-h-40 overflow-y-auto ">
                        {suggestions.map((suggestion) => (
                            <div
                                key={suggestion}
                                className="cursor-pointer py-2 px-5 hover:bg-neutral-100 text-sm"
                                onClick={() => handleSelectSuggestion(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {skills.length > 0 && (
                <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                        <div
                            key={skill}
                            className="px-5 rounded-full h-[30px] text-sm font-semibold border flex items-center gap-2 capitalize"
                        >
                            {skill}
                            <IoCloseSharp
                                onClick={() => removeSkill(skill)}
                                size={15}
                                className="hover:text-red-400 cursor-pointer transition"
                            />
                        </div>
                    ))}
                </div>
            )}

            <FormError message="" />
            <FormSuccess message="" />
            <Button isLoading={isLoading} className="!w-full">Add Skills</Button>
        </form>
    );
}
