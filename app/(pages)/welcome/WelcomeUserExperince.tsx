'use client'

import { getUserEducation } from "@/actions/user/getUserEducation";
import Button from "@/components/Button";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Educations from "../userProfile/Educations";
import { UserExperienceForm } from "@/app/Forms/UserExperienceForm";
import Model from "@/components/Model/Model";
import { FaPlus } from "react-icons/fa";

interface Props {
    currentStep?: number;
    onNext?: (value: number) => void;
    onBack?: (value: number) => void;
}

const WelcomeUserExperience = ({ currentStep = 2, onNext, onBack }: Props) => {
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
        <div className='w-full h-full space-y-5'>
            <h3>You Experince</h3>
            <Model
                bodyContent={<UserExperienceForm />}
                title="Experience"
                desc="Add you Experience details"
                className="w-full md:w-[1000px]"
            >
                <Button variant="border" icon={<FaPlus size={20} />}>Add Experience</Button>
            </Model>
        </div>
    );
}

export default WelcomeUserExperience;
