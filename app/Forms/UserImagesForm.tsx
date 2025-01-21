'use client'

import { updateImages } from "@/actions/user/updateImages";
import Button from "@/components/Button"
import { Progress } from "@/components/ui/progress"
import { useCustomToast } from "@/lib/CustomToast";
import { useUpload } from "@/lib/Uploadfile";
import { ChangeEvent, useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../Redux/AuthSlice";

const UserImagesForm = () => {

    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    const [file, setFile] = useState<File | null>(null);
    const [showImage, setShowImage] = useState<string | null>(user?.profileImage || null);

    const [isPending, startTransition] = useTransition();
    const { showErrorToast, showSuccessToast } = useCustomToast();
    const { per, UploadFile, downloadUrl } = useUpload({ file });

    const handleDeleteImage = () => {
        setShowImage(null);
        showSuccessToast("Image deleted");
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setShowImage(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = () => {
        if (file) {
            UploadFile();
        }
    };

    const handleUpdateImage = () => {
        const userId = user.id;
        const profileImage = downloadUrl;

        updateImages(userId, profileImage)
            .then((response) => {
                if (response.success) {
                    dispatch(loginRedux(response.data));
                    showSuccessToast(response.success);
                }
                if (response.error) {
                    showErrorToast(response.error);
                }
            })
    };

    return (
        <div className="space-y-5" >
            <div className="relative h-[200px] rounded-lg border overflow-hidden">
                <img
                    src={showImage || ''}
                    alt=""
                    className="w-full h-full object-cover bg-neutral-100 absolute top-0 left-0"
                />
                <input type="file" accept="image/*" className="hidden" id="imageupload" onChange={handleImageUpload} />
                <label htmlFor="imageupload" className="absolute top-0 left-0 w-full h-full opacity-70 z-1 flexcenter cursor-pointer trans bg-black">
                    <div className='space-y-3'>
                        <img src="" alt="" />
                        <h3 className="text-blue-400 z-10">select image</h3>
                    </div>
                </label>
            </div>
            {per &&
                <div className="space-y-3">
                    <h3>{downloadUrl ? "Completed" : "Uploading..."}</h3>
                    <Progress value={Number(per)} className="w-full" />
                </div>
            }
            <div className="flex flex-row items-center justify-between">
                <h3
                    className="text-sm font-bold text-red-500 cursor-pointer py-2 px-5 border rounded-full"
                    onClick={() => handleDeleteImage()}
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
    )
}

export default UserImagesForm