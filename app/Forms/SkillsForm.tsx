"use client";

import { useState, useTransition, KeyboardEvent, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { IoCloseSharp } from "react-icons/io5";

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

export function SkillsForm() {
    const [isLoading, startTransition] = useTransition();
    const [skills, setSkills] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            console.log(skills);
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
