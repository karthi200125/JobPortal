'use client';

import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const EasyApplyQuestions = () => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers({ ...answers, [questionId]: value });

        // Remove error when an answer is provided
        if (value.trim() !== '') {
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[questionId];
                return updatedErrors;
            });
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        let hasError = false;
        const newErrors: { [key: number]: string } = {};

        // Check for unanswered questions
        questions.forEach((q) => {
            if (!answers[q.id] || answers[q.id].trim() === '') {
                newErrors[q.id] = q.type === 'input' ? 'Enter answer for this question' : 'Please Make Selection';
                hasError = true;
            }
        });

        setErrors(newErrors);

        if (!hasError) {
            console.log('Application submitted with answers:', answers);
        }
    };

    const questions = [
        {
            id: 1,
            question: "How many years of work experience do you have with React?",
            type: "select",
            options: ['One', 'Two', 'Three'],
        },
        {
            id: 2,
            question: "Describe your experience with React",
            type: "input",
        },
        {
            id: 3,
            question: "Are you based in Bengaluru?",
            type: "select",
            options: ["Yes", "No"],
        },
    ];

    return (
        <div className="w-full border rounded-md p-5">
            <form onSubmit={handleSubmit}>
                {questions.map((q) => (
                    <div key={q.id} className="mb-4 space-y-2">
                        <Label>{q.question} *</Label>

                        {q.type === 'input' && (
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                />
                                {errors[q.id] && (
                                    <p className="text-red-400 text-sm">{errors[q.id]}</p>
                                )}
                            </div>
                        )}

                        {q.type === 'select' && (
                            <div className="space-y-2">
                                <Select
                                    onValueChange={(value) => handleAnswerChange(q.id, value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an option" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {q.options?.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors[q.id] && (
                                    <p className="text-red-400 text-sm">{errors[q.id]}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit Application
                </button> */}
            </form>
        </div>
    );
};

export default EasyApplyQuestions;
