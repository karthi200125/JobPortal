'use client'

import { userResumeUpdate } from '@/actions/user/updateResume';
import Button from '@/components/Button';
import { Progress } from '@/components/ui/progress';
import { useCustomToast } from '@/lib/CustomToast';
import { useUpload } from '@/lib/Uploadfile';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from 'react-redux';

interface EasyApplyUserResumeProps {
    onResume?: (value: { name: any, url: any }) => void,
    onNext?: (value: number) => void,
    onBack?: (value: number) => void,
    currentStep?: number
}

const EasyApplyResume = ({ onResume, onNext, onBack, currentStep = 0 }: EasyApplyUserResumeProps) => {

    const user = useSelector((state: any) => state.user.user);
    const defaultResumeName = 'Resume'
    const { showErrorToast, showSuccessToast } = useCustomToast()

    const [file, setFile] = useState<File | null>(null);

    const { per, UploadFile, downloadUrl } = useUpload({ file });

    const [resumeName, setResumeName] = useState('');
    const [resumeUrl, setResumeUrl] = useState((user?.resume || downloadUrl) || '');

    const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file)
            const fileName = file.name;
            const fileUrl = URL.createObjectURL(file);

            setResumeName(fileName);
            setResumeUrl(fileUrl);
        }
    };

    const resumeUpdate = async () => {
        await userResumeUpdate(user?.id, downloadUrl)
            .then((data) => {
                if (data?.success) {
                    showSuccessToast(data?.success)
                }
            })
    }

    useEffect(() => {
        UploadFile();
    }, [file])

    useEffect(() => {
        if (downloadUrl) {
            resumeUpdate();
        }
    }, [downloadUrl])

    const handleNext = () => {
        if (!resumeUrl) {
            return showErrorToast("select resume first")
        }
        if (onResume) {
            onResume({ name: resumeName, url: downloadUrl });
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

            {per !== null && (
                <div className="space-y-3">
                    <h3>{downloadUrl ? "Completed" : "Uploading..."}</h3>
                    <Progress value={Number(per)} className="w-full" />
                </div>
            )}


            <div className="flex flex-row items-center gap-5">
                <Button variant="border" onClick={handleBack}>Back</Button>
                <Button disabled={!resumeUrl} onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

export default EasyApplyResume;
