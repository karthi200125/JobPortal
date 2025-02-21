"use client";

import { useEffect } from "react";
import DefaultImage from '@/public/logo.png'
import { usePathname } from "next/navigation";

const defaultTitle = "Jobify - Find Your Dream Job Today";
const defaultDescription = "Browse thousands of job listings from top companies. Apply for jobs and get hired today!";

const Title = ({
    title = defaultTitle,
    description = defaultDescription,
    keywords,
    image = DefaultImage.src,
    url,
}: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}) => {

    const pathname = usePathname()

    useEffect(() => {
        document.title = title;

        const currentUrl = url || `${process.env.NEXT_PUBLIC_URL}/${pathname}`;

        const setMetaTag = (name: string, content: string) => {
            let meta = document.querySelector(`meta[name='${name}']`);
            if (meta) {
                meta.setAttribute("content", content);
            } else {
                meta = document.createElement("meta");
                meta.setAttribute("name", name);
                meta.setAttribute("content", content);
                document.head.appendChild(meta);
            }
        };

        const setOGTag = (property: string, content: string) => {
            let meta = document.querySelector(`meta[property='${property}']`);
            if (meta) {
                meta.setAttribute("content", content);
            } else {
                meta = document.createElement("meta");
                meta.setAttribute("property", property);
                meta.setAttribute("content", content);
                document.head.appendChild(meta);
            }
        };

        setMetaTag("description", description);
        if (keywords) setMetaTag("keywords", keywords);

        setOGTag("og:title", title);
        setOGTag("og:description", description);
        setOGTag("og:image", image);
        setOGTag("og:url", currentUrl);
        setOGTag("og:type", "website");

        setMetaTag("twitter:title", title);
        setMetaTag("twitter:description", description);
        setMetaTag("twitter:image", image);
        setMetaTag("twitter:card", "summary_large_image");
    }, [title, description, keywords, image, url]);

    return null;
};

export default Title;
