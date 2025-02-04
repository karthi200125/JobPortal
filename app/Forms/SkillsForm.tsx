"use client";

import { getSkills } from "@/actions/getSkills";
import { userSkillAction } from "@/actions/user/userSkillsAction";
import Button from "@/components/Button";
import FormError from "@/components/ui/FormError";
import { useCustomToast } from "@/lib/CustomToast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useState, useTransition } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";

interface SkillsFormProps {
    skillsData?: string[];
    onClose?: () => void;
}

export function SkillsForm({ skillsData = [], onClose }: SkillsFormProps) {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const { showSuccessToast } = useCustomToast();

    const [isLoading, startTransition] = useTransition();
    const [skills, setSkills] = useState<string[]>(skillsData);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const pathname = usePathname();
    const params = useParams();
    const userId = pathname === "/welcome" ? user?.id : Number(params.userId);

    const { data: allSkills = [], isFetching } = useQuery<string[]>({
        queryKey: ["getSkills", debouncedSearchTerm],
        queryFn: async () => getSkills(debouncedSearchTerm),
        enabled: !!debouncedSearchTerm,
    });

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        startTransition(() => {
            userSkillAction(skills, userId)
                .then((data) => {
                    if (data?.success) {
                        queryClient.invalidateQueries({ queryKey: ["getuser", userId] });
                        dispatch(loginRedux(data?.data));
                        showSuccessToast(data?.success);
                        onClose?.();
                    }
                    if (data?.error) {
                        setError(data.error);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectSuggestion = (suggestion: string) => {
        if (!skills.includes(suggestion)) {
            setSkills((prev) => [...prev, suggestion]);
        }
        setSearchTerm("");
        setSuggestions([]);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (searchTerm.trim() && !skills.includes(searchTerm)) {
                setSkills((prev) => [...prev, searchTerm.trim()]);
            }
            setSearchTerm("");
            setSuggestions([]);
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-10">
            <div className="space-y-2 relative">
                <h4 className="font-bold">Skills</h4>
                <input
                    type="text"
                    value={searchTerm}
                    placeholder="Enter your skill"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-full border rounded-md py-2 px-5 placeholder:text-sm"
                />
                {allSkills.length > 0 && (
                    <div className="border rounded-md mt-2 max-h-40 overflow-y-auto">
                        {isFetching ? (
                            <h4>Loading...</h4>
                        ) : (
                            allSkills.map((suggestion) => (
                                <div
                                    key={suggestion}
                                    className="cursor-pointer py-2 px-5 hover:bg-neutral-100 text-sm"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))
                        )}
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

            <FormError message={error} />
            <Button isLoading={isLoading} className="!w-full">
                {pathname === "/welcome" ? "Add Skills" : "Edit Skills"}
            </Button>
        </form>
    );
}