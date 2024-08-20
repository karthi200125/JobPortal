'use client'

import Button from '@/components/Button';
import React, { useState } from 'react';
import { IoMdCloudUpload } from "react-icons/io";

const EasyApplyResume = () => {

    const user = {
        resume:
        {
            name: "current resume",
            url: ""
        }
    }

    const [resumeName, setResumeName] = useState(user?.resume?.name);
    const [resumeUrl, setResumeUrl] = useState(user?.resume?.url);

    const handleResumeUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const fileUrl = URL.createObjectURL(file);

            setResumeName(fileName);
            setResumeUrl(fileUrl);
        }
    };


    return (
        <div className="w-full border rounded-md p-5 max-h-max space-y-5">

            <input
                type="file"
                id='resumeupload'
                accept=".doc,.docx,.pdf"
                hidden
                onChange={handleResumeUpload}
            />

            <div className='flex flex-row items-start justify-between'>
                <div className='space-y-2'>
                    <h3 className="font-bold">Resume</h3>
                    <h5>Be sure to include an updated resume *</h5>
                </div>

                <label htmlFor="resumeupload" className='space-y-2'>
                    <Button variant='border' icon={<IoMdCloudUpload size={20} />}>Upload Resume</Button>
                    <h5 className='text-center text-[var(--lighttext)]'>DOC, DOCX, PDF</h5>
                </label>
            </div>

            <div className='space-y-5'>
                <div className='w-full border rounded-md p-3'>
                    {resumeName || 'No resume uploaded'}
                </div>

                {resumeUrl !== "" &&
                    <div className='w-full border max-h-max rounded-md p-3'>
                        {resumeUrl ? (
                            <iframe
                                src={resumeUrl}
                                title="Resume Preview"
                                className='w-full h-[800px]'
                            />
                        ) : (
                            'No resume to preview'
                        )}
                    </div>
                }
            </div>

        </div>
    )
}

export default EasyApplyResume