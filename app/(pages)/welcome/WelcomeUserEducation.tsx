'use client'

import { getUserEducation } from "@/actions/user/getUserEducation";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Educations from "../userProfile/Educations";

interface Props {
    currentStep?: number;
    onNext?: (value: number) => void;
    onBack?: (value: number) => void;
}

const WelcomeUserEducation = ({ currentStep = 2, onNext, onBack }: Props) => {
    const user = useSelector((state: any) => state.user.user);

    const { data, isLoading } = useQuery({
        queryKey: ['getUserEducation', user?.id],
        queryFn: async () => await getUserEducation(user?.id),
        enabled: !!user?.id,
    });

    const education = data?.data || []

    const handleNext = () => {
        if (education?.length < 1) {
            console.log('Create education first');
            return;
        }
        onNext?.(currentStep + 1);
    };

    const handleBack = () => {
        onBack?.(currentStep - 1);
    };

    return (
        <div className="w-full h-full space-y-5">
            <Educations userId={user?.id} profileUser={user}/>
            <div className="flex flex-row items-center justify-end gap-5">
                <Button variant="border" onClick={handleBack}>Back</Button>
                <Button
                    disabled={education?.length > 0 ? false : true}
                    onClick={handleNext}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export default WelcomeUserEducation;
