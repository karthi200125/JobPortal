'use client';

import Button from "@/components/Button";
import { useCustomToast } from "@/lib/CustomToast";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import noAvatar from '../../public/noProfile.webp'

const UserBackImageForm: React.FC = () => {
    const user = useSelector((state: any) => state.user.user);

    const [backImage, setBackImage] = useState<string | null>(user?.profileImage || null);
    const [proImage, setProImage] = useState<string | null>(user?.profileImage || null);
    const [selectedBackImage, setSelectedBackImage] = useState<File | null>(null);
    const [selectedProImage, setSelectedProImage] = useState<File | null>(null);

    const { showErrorToast, showSuccessToast } = useCustomToast();
    const [isPending, startTransition] = useTransition();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'back' | 'profile') => {
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);

            if (type === 'back') {
                setSelectedBackImage(file);
                setBackImage(fileURL);
            } else {
                setSelectedProImage(file);
                setProImage(fileURL);
            }
        }
    };

    const handleDeleteImage = (type: 'back' | 'profile') => {
        if (type === 'back') {
            setBackImage(null);
            setSelectedBackImage(null);
        } else {
            setProImage(null);
            setSelectedProImage(null);
        }
        showSuccessToast("Image deleted");
    };

    const handleUpdateImage = () => {
        startTransition(() => {
            if (selectedBackImage) {
                console.log("Updating back image:", selectedBackImage);
            }
            if (selectedProImage) {
                console.log("Updating profile image:", selectedProImage);
            }
            showSuccessToast("Image updated successfully");
        });
    };

    const isUpdateButtonVisible = !!selectedBackImage || !!selectedProImage;

    return (
        <div className="w-full max-h-screen space-y-8">
            {/* Background Image Section */}
            <div className="flex flex-col">
                <div className="relative w-full h-[150px] md:h-[200px] rounded-md overflow-hidden">
                    <Image
                        src={backImage || ""}
                        alt="Background Image"
                        className="absolute top-0 left-0 w-full h-full object-contain bg-neutral-100"
                        fill
                    />
                </div>
                <div className="flex items-center justify-between mt-3">
                    <h3
                        className="text-sm font-bold text-red-500 cursor-pointer"
                        onClick={() => handleDeleteImage('back')}
                    >
                        Delete Image
                    </h3>
                    <input
                        type="file"
                        id="backImageFile"
                        hidden
                        onChange={(e) => handleFileChange(e, 'back')}
                        accept="image/*"
                    />
                    <label
                        htmlFor="backImageFile"
                        className="rounded-full py-2 px-5 border cursor-pointer hover:opacity-75 text-sm font-bold"
                    >
                        Change Image
                    </label>
                </div>
            </div>

            {/* Profile Image Section */}
            <div className="flex flex-col md:flex-row items-center gap-5">
                <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                    <Image
                        src={proImage || noAvatar?.src}
                        alt="Profile Image"
                        className="absolute top-0 left-0 w-full h-full object-contain bg-neutral-100"
                        fill
                    />
                </div>
                <div className="w-full flex flex-row md:flex-col justify-between md:justify-center items-center gap-3">
                    <input
                        type="file"
                        id="proImageFile"
                        hidden
                        onChange={(e) => handleFileChange(e, 'profile')}
                        accept="image/*"
                    />
                    <label
                        htmlFor="proImageFile"
                        className="rounded-full py-2 px-5 border cursor-pointer hover:opacity-75 text-sm font-bold"
                    >
                        Change Image
                    </label>
                    <h3
                        className="text-sm font-bold text-red-500 cursor-pointer"
                        onClick={() => handleDeleteImage('profile')}
                    >
                        Delete Image
                    </h3>
                </div>
            </div>

            {/* Update Button */}
            {isUpdateButtonVisible && (
                <div className="flex justify-end mt-5">
                    <Button className="!py-2" onClick={handleUpdateImage} isLoading={isPending}>
                        {isPending ? "Please wait..." : "Update"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UserBackImageForm;
