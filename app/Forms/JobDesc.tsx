'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface JobDescProps {
    onJobDesc: (content: string) => void;
}

const JobDesc = ({ onJobDesc }: JobDescProps) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (content: string) => {
        setValue(content);
        onJobDesc(content);
    };

    return (
        <ReactQuill
            value={value}
            onChange={handleChange}
            theme="snow"
            placeholder="Write the job description here..."
        />
    );
};

export default JobDesc;
