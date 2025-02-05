'use client';

import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface EasyApplyQuestionsProps {
    job?: {
        questions: {
            id: number;
            question: string;
            type: 'input';
        }[];
    };
    onAnswers?: (answers: { [key: number]: string }) => void;
    onNext?: (step: number) => void;
    onBack?: (step: number) => void;
    currentStep?: number;
}

const EasyApplyQuestions = ({ job, currentStep = 0, onNext, onAnswers, onBack }: EasyApplyQuestionsProps) => {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [errors, setErrors] = useState<{ [key: number]: string }>({});

    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers({ ...answers, [questionId]: value });

        if (value.trim() !== '') {
            setErrors((prevErrors) => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors[questionId];
                return updatedErrors;
            });
        }
    };

    const validateAnswers = () => {
        const newErrors: { [key: number]: string } = {};
        let isValid = true;

        job?.questions.forEach((q) => {
            if (!answers[q.id] || answers[q.id].trim() === '') {
                newErrors[q.id] = 'Answer This Question';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateAnswers()) {
            if (onAnswers) {
                onAnswers(answers);
            }
            console.log(answers)
            if (onNext) {
                onNext(currentStep + 1);
            }
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack(currentStep - 1);
        }
    };

    return (
        <div className="w-full border rounded-md p-5">
            <form onSubmit={(e) => e.preventDefault()}>
                {job?.questions.map((q) => (
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
                    </div>
                ))}

                <div className="flex flex-row items-center gap-5">
                    <Button variant="border" onClick={handleBack}>Back</Button>
                    <Button onClick={handleNext} disabled={!answers}>Review</Button>
                </div>
            </form>
        </div>
    );
};

export default EasyApplyQuestions;
