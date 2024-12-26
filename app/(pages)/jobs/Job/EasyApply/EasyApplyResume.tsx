'use client'

import Button from '@/components/Button';
import React, { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from 'react-redux';

interface EasyApplyUserResumeProps {
    onResume?: (value: { name: string, url: string }) => void,
    onNext?: (value: number) => void,
    onBack?: (value: number) => void,
    currentStep?: number
}

const EasyApplyResume = ({ onResume, onNext, onBack, currentStep = 0 }: EasyApplyUserResumeProps) => {
    const user = useSelector((state: any) => state.user.user);

    const [resumeName, setResumeName] = useState('');
    const [resumeUrl, setResumeUrl] = useState(user?.resume || '');

    const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileName = file.name;
            const fileUrl = URL.createObjectURL(file);

            setResumeName(fileName);
            setResumeUrl(fileUrl);
        }
    };

    const handleNext = () => {
        if (!resumeUrl) {
            return console.log("select resume first")
        }
        if (onResume) {
            onResume({ name: resumeName, url: resumeUrl });
        }
        if (onNext) {
            onNext(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack(currentStep - 1);
        }
    };

    return (
        <div className="w-full border rounded-md p-5 space-y-5">
            <input
                type="file"
                id="resumeupload"
                accept=".doc,.docx,.pdf"
                hidden
                onChange={handleResumeUpload}
            />

            <div className="flex flex-col md:flex-row gap-5 items-start justify-between">
                <div className="space-y-2">
                    <h3 className="font-bold">Resume</h3>
                    <h5>Be sure to include an updated resume *</h5>
                </div>

                <label htmlFor="resumeupload" className="space-y-2">
                    <div className="h-[40px] rounded-full border-[1px] border-solid border-[var(--voilet)] flex flex-row items-center gap-3 max-w-max px-5 text-sm text-[var(--voilet)] font-bold cursor-pointer hover:opacity-50 trans">
                        <IoMdCloudUpload size={25} />
                        Upload Resume
                    </div>
                    <h5 className="text-center text-[var(--lighttext)]">DOC, DOCX, PDF</h5>
                </label>
            </div>

            <div className="space-y-5">
                <div className="w-full border rounded-md p-3">
                    {resumeName || 'No resume uploaded'}
                </div>

                {resumeUrl && (
                    <div className="w-full border max-h-max rounded-md p-3">
                        <iframe
                            src={resumeUrl}
                            title="Resume Preview"
                            className="w-full h-[400vh] md:h-[800px]"
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-row items-center gap-5">
                <Button variant="border" onClick={handleBack}>Back</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

export default EasyApplyResume;
