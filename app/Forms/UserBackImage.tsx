'use client';

import { updateImages } from "@/actions/user/updateImages";
import { deleteImages } from "@/actions/user/deleteImages";
import Button from "@/components/Button";
import { Progress } from "@/components/ui/progress";
import { useCustomToast } from "@/lib/CustomToast";
import { useUpload } from "@/lib/Uploadfile";
import { ChangeEvent, useState, useTransition, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";
import { closeModal } from "../Redux/ModalSlice";

const UserBackImage = () => {
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    const [file, setFile] = useState<File | null>(null);
    const [showImage, setShowImage] = useState<string | null>(user?.profileImage || null);
    const [isPending, startTransition] = useTransition();
    const { showErrorToast, showSuccessToast } = useCustomToast();
    const { per, UploadFile, downloadUrl } = useUpload({ file });

    const userId = user?.id;

    const handleDeleteImage = useCallback(async () => {
        const response = await deleteImages(userId, "pro");
        if (response.success) {
            dispatch(loginRedux(response.data));
            dispatch(closeModal("UserBackImageModal"));
            showSuccessToast(response.success);
            setShowImage(null);
        } else if (response.error) {
            showErrorToast(response.error);
        }
    }, [userId, dispatch, showErrorToast, showSuccessToast]);

    const handleImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const newImage = URL.createObjectURL(selectedFile);
            if (newImage !== showImage) {
                setShowImage(newImage);
            }
        }
    }, [showImage]);

    const handleUpload = useCallback(() => {
        if (file) {
            UploadFile();
        } else {
            showErrorToast("Please select a file to upload.");
        }
    }, [file, UploadFile, showErrorToast]);

    const handleUpdateImage = useCallback(async () => {
        if (!downloadUrl) {
            showErrorToast("No image URL available for update.");
            return;
        }
        startTransition(async () => {
            const response = await updateImages(userId, null, downloadUrl);
            if (response.success) {
                dispatch(loginRedux(response.data));
                dispatch(closeModal("UserBackImageModal"));
                showSuccessToast(response.success);
            } else if (response.error) {
                showErrorToast(response.error);
            }
        });
    }, [downloadUrl, userId, dispatch, showErrorToast, showSuccessToast, startTransition]);

    return (
        <div className="space-y-5">
            <div className="relative h-[200px] rounded-lg border overflow-hidden">
                <img
                    src={showImage || ""}
                    alt="User profile"
                    className="w-full h-full object-cover bg-neutral-100 absolute top-0 left-0"
                />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="imageupload"
                    onChange={handleImageUpload}
                />
                <label
                    htmlFor="imageupload"
                    className="absolute top-0 left-0 w-full h-full opacity-70 z-10 flex items-center justify-center cursor-pointer transition bg-black"
                >
                    <div className="space-y-3 text-center">
                        <img src="" alt="" />
                        <h3 className="text-blue-400 z-10">Select Image</h3>
                    </div>
                </label>
            </div>

            {per !== null && (
                <div className="space-y-3">
                    <h3>{downloadUrl ? "Completed" : "Uploading..."}</h3>
                    <Progress value={Number(per)} className="w-full" />
                </div>
            )}

            <div className="flex flex-row items-center justify-between">
                <h3
                    className="text-sm font-bold text-red-500 cursor-pointer py-2 px-5 border rounded-full"
                    onClick={handleDeleteImage}
                >
                    Delete Image
                </h3>
                <Button
                    className="!py-2"
                    onClick={downloadUrl ? handleUpdateImage : handleUpload}
                    isLoading={isPending}
                >
                    {downloadUrl ? "Update Image" : "Upload Image"}
                </Button>
            </div>
        </div>
    );
};

export default UserBackImage;
