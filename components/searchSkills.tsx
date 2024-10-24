'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

const allSkills: string[] = [
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

const SearchSkills: React.FC = () => {
    const [query, setQuery] = useState<string>('');
    const [openSuggestion, setOpenSuggestion] = useState<boolean>(false);
    const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
    const router = useRouter();

    const updateSearchParams = (value: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('search', value);
        router.push(`/jobs?${params.toString()}`);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQuery(inputValue);

        if (inputValue.length > 0) {
            const matchedSkills = allSkills.filter((skill) =>
                skill.toLowerCase().startsWith(inputValue.toLowerCase())
            );
            setFilteredSkills(matchedSkills);
            setOpenSuggestion(true);
        } else {
            setOpenSuggestion(false);
        }
    };

    const handleSelectSkill = (skill: string) => {
        setQuery(skill);
        updateSearchParams(skill);
        setOpenSuggestion(false);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && filteredSkills.length > 0) {
            const selectedSkill = filteredSkills[0];
            handleSelectSkill(selectedSkill);
        }
    };

    return (
        <div className='relative'>
            <input
                type="text"
                className="bg-black text-white text-sm placeholder:text-white/40 w-full md:w-[300px] rounded-full h-[50px] pl-5"
                placeholder="Title, Skill or Company"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            {openSuggestion && (
                <div className='absolute top-[55px] left-0 w-full bg-white p-5 rounded-xl shadow-xl max-h-[300px] overflow-y-auto'>
                    {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill) => (
                            <h4
                                key={skill}
                                className='px-3 py-2 text-black rounded-md hover:bg-neutral-100 cursor-pointer transition'
                                onClick={() => handleSelectSkill(skill)}
                            >
                                {skill}
                            </h4>
                        ))
                    ) : (
                        <h4 className='px-3 py-2 text-black rounded-md'>
                            No skills found
                        </h4>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchSkills;
