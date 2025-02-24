'use client'

import Button from "@/components/Button";
import { useSelector } from "react-redux";
import Educations from "../userProfile/Educations";

interface Props {
    currentStep?: number;
    onNext?: (value: number) => void;
    onBack?: (value: number) => void;
}

const WelcomeUserEducation = ({ currentStep = 2, onNext, onBack }: Props) => {
    const user = useSelector((state: any) => state.user.user);

    const handleNext = () => {
        onNext?.(currentStep + 1);
    };

    const handleBack = () => {
        onBack?.(currentStep - 1);
    };

    return (
        <div className="w-full h-full space-y-5">
            <Educations userId={user?.id} profileUser={user} />
            <div className="flex flex-row items-center justify-end gap-5">
                <Button variant="border" onClick={handleBack}>Back</Button>
                <Button
                    onClick={handleNext}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default WelcomeUserEducation;
