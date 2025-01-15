'use client';

import Button from "@/components/Button";
import { useCustomToast } from "@/lib/CustomToast";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import noAvatar from '../../public/noProfile.webp';
import { updateImages } from "@/actions/user/updateImages";
import { loginRedux } from "../Redux/AuthSlice";

const UserBackImageForm = () => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch()

    const [backImage, setBackImage] = useState<string | null>(user?.profileImage);
    const [proImage, setProImage] = useState<string | null>(user?.userImage);

    const { showErrorToast, showSuccessToast } = useCustomToast();
    const [isPending, startTransition] = useTransition();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'back' | 'profile') => {
        const file = e.target.files?.[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);

            if (type === 'back') {
                setBackImage(fileURL);
            } else {
                setProImage(fileURL);
            }
        }
    };

    const handleDeleteImage = (type: 'back' | 'profile') => {
        if (type === 'back') {
            setBackImage(null);
        } else {
            setProImage(null);
        }
        showSuccessToast("Image deleted");
    };

    const handleUpdateImage = () => {
        startTransition(() => {
            const userId = user.id;
            const userImage = proImage;
            const profileImage = backImage;

            updateImages(userId, userImage, profileImage)
                .then((response) => {
                    if (response.success) {
                        dispatch(loginRedux(response.data));
                        showSuccessToast(response.success);
                    }
                    if (response.error) {
                        showErrorToast(response.error);
                    }
                })
        });
    };

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
                        className="absolute top-0 left-0 w-full h-full object-cover bg-neutral-100"
                        fill
                    />
                </div>
                <div className="flex flex-row md:flex-col justify-between md:justify-center items-center gap-3">
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
            <div className="flex justify-end mt-5">
                <Button className="!py-2" onClick={handleUpdateImage} isLoading={isPending}>
                    {isPending ? "Please wait..." : "Update"}
                </Button>
            </div>
        </div>
    );
};

export default UserBackImageForm;
