'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef, useState } from 'react';

// Dynamically import JoditEditor to prevent server-side rendering issues
const JoditEditor = dynamic(() => import("jodit-react").then(mod => mod.JoditEditor), { ssr: false });

// Define JobDescProps to specify the onJobDesc prop type
interface JobDescProps {
    onJobDesc: (content: string) => void;
}

const JobDesc: React.FC<JobDescProps> = ({ onJobDesc }) => {
    const editor = useRef(null);
    const [content, setContent] = useState("World's best HTML page");

    // Define the configuration for Jodit Editor
    const config = useMemo(() => ({
        height: 300,
        uploader: {
            insertImageAsBase64URI: true,
            imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'],
        },
        toolbarSticky: false,
        spellcheck: true,
    }), []);

    const handleChange = (value: string): void => {
        setContent(value);
        onJobDesc(value); // Call the onJobDesc function with updated content
    };

    return (
        <div className="w-full max-h-max flex items-center flex-col">
            <div className="h-full w-full">
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={handleChange}
                    className="w-full min-h-[200px] mt-10 bg-white"
                />
                <style>
                    {`.jodit-wysiwyg { height: 300px !important; }`}
                </style>
            </div>
        </div>
    );
};

export default JobDesc;
