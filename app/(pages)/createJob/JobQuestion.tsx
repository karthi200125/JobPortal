'use client'

import Button from '@/components/Button'
import Icon from '@/components/Icon'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from 'react'
import { IoClose } from 'react-icons/io5'

interface Question {
    id: number;
    question: string;
    type: 'input' | 'select';
}

interface JobQuestionsProps {
    onQuestions?: (questions: Question[]) => void;
}

let nextId = 1;

const JobQuestion = ({ onQuestions }: JobQuestionsProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<string>("");
    const [newType, setNewType] = useState<'input' | 'select'>('input');

    const handleAddQuestion = () => {
        if (newQuestion.trim()) {
            const updatedQuestions = [
                ...questions,
                {
                    id: nextId++,
                    question: newQuestion,
                    type: newType
                }
            ];
            setQuestions(updatedQuestions);
            onQuestions?.(updatedQuestions);
            setNewQuestion("");
            setNewType('input');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddQuestion();
        }
    };

    const handleRemoveQuestion = (id: number) => {
        const updatedQuestions = questions.filter(question => question.id !== id);
        setQuestions(updatedQuestions);
        onQuestions?.(updatedQuestions);
    };

    return (
        <div className='space-y-3'>
            <h4 className='font-bold'>If You Want to Ask Any Questions from the candidate?</h4>

            <div className='flex flex-row items-center gap-5'>
                <Select onValueChange={(value) => setNewType(value as 'input' | 'select')} value={newType}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="input">Input</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                    </SelectContent>
                </Select>
                <Input
                    placeholder='Write question here'
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button type="button" variant='border' className='w-[200px]' onClick={handleAddQuestion}>
                    Add Question
                </Button>
            </div>

            {questions.length > 0 && (
                <div className='space-y-3'>
                    <h4 className='font-bold'>Your Questions</h4>
                    {questions.map((q) => (
                        <div key={q.id} className='flex flex-row items-center gap-5 bg-neutral-100 rounded-md'>
                            <Icon
                                icon={
                                    <IoClose
                                        size={20}
                                        className='text-red-400 cursor-pointer'
                                        onClick={() => handleRemoveQuestion(q.id)}
                                    />
                                }
                                isHover
                                title='Remove Question'
                            />
                            <h4 className='font-bold'>{q.question}</h4>
                            <h4 className='bg-black px-3 py-1 text-white rounded-md'>{q.type}</h4>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobQuestion;
