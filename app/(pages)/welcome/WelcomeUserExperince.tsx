'use client'

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Experiences from "../userProfile/Experiences";

interface Props {
    currentStep?: number;    
    onBack?: (value: number) => void;
}

const WelcomeUserExperience = ({ currentStep = 2, onBack }: Props) => {
    const user = useSelector((state: any) => state.user.user);
    const router = useRouter()
    
    const handleNext = () => {
        router.push(`/userProfile/${user?.id}`)
    };

    const handleBack = () => {
        onBack?.(currentStep - 1);
    };

    return (
        <div className='w-full h-full space-y-5'>
            <h3>You Experince</h3>
            <Experiences userId={user?.id} profileUser={user} />
            <div className="flex flex-row items-center justify-end gap-5">
                <Button variant="border" onClick={handleBack}>Back</Button>
                <Button
                    onClick={handleNext}
                >
                    Go to Profile
                </Button>
            </div>
        </div>
    );
}

export default WelcomeUserExperience;
