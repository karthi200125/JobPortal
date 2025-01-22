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
            const fileName = new Date().getTime() + (file ? file.name : image?.file?.name);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file ? file : image?.file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPer(Math.round(progress).toString());
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.error('Error uploading file:', error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log(downloadURL)
                        setDownloadUrl(downloadURL);
                    } catch (error) {
                        console.error('Error getting download URL:', error);
                    }
                }
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
   
    return { per, UploadFile, downloadUrl };
}