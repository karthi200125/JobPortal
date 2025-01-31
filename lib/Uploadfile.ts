import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { app } from "./Firebase";

interface UploadProps {
    image?: any;
    file?: any;
}

export const useUpload = ({ image, file }: UploadProps) => {

    const [per, setPer] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);


    const UploadFile = () => {
        try {
            const storage = getStorage(app);

            // Ensure that file or image.file exists
            if (!file && !image?.file) {
                console.error("No file provided for upload.");
                return;
            }

            // Ensure fileName is a string
            const fileName = `${new Date().getTime()}_${file?.name || image?.file?.name || "unknown_file"}`;
            console.log("Uploading file:", fileName);

            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file || image?.file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPer(Math.round(progress).toString());
                },
                (error) => {
                    console.error('Error uploading file:', error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log("Download URL:", downloadURL);
                        setDownloadUrl(downloadURL);
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


    return { per, UploadFile, downloadUrl };
}