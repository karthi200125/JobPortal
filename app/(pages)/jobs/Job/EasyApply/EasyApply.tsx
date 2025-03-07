'use client'

import { Progress } from "@/components/ui/progress";
import { useState } from 'react';
import EasyApplyQuestions from './EasyApplyQuestions';
import EasyApplyResume from './EasyApplyResume';
import EasyApplySubmit from './EasyApplySubmit';
import EasyApplyUserInfo from './EasyApplyUserInfo';

const EasyApply = ({ job , safeSearchParams}: any) => {
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState({});
    const [resume, setResume] = useState({});
    const [answers, setAnswers] = useState({});

    const jobApplicationData = {
        userData,
        resume,
        answers,
    };
    
    const isQuestions = job?.questions?.length > 0;

    const totalSteps = isQuestions ? 4 : 3;
    const progress = ((step + 1) / totalSteps) * 100;

    return (
        <div className="w-full max-h-max flex items-start flex-col">
            <div className='sticky top-[60px] left-0 w-full flex flex-row items-center gap-5 bg-white py-3'>
                <Progress value={progress} className="w-full" />
                <h3 className='max-w-max px-2 whitespace-nowrap font-bold'>{progress.toFixed(0)}%</h3>
            </div>

            <div className="w-full h-full mt-5">
                {step === 0 && (
                    <EasyApplyUserInfo
                        onNext={(nextStep: number) => setStep(nextStep)}
                        currentStep={step}
                        onUserdata={(uD: any) => setUserData(uD)}
                    />
                )}
                {step === 1 && (
                    <EasyApplyResume
                        onNext={(nextStep: number) => setStep(nextStep)}
                        onBack={(prevStep: number) => setStep(prevStep)}
                        currentStep={step}
                        onResume={(r: any) => setResume(r)}
                    />
                )}
                {step === 2 && isQuestions && (
                    <EasyApplyQuestions
                        job={job}
                        onNext={(nextStep: number) => setStep(nextStep)}
                        onBack={(prevStep: number) => setStep(prevStep)}
                        currentStep={step}
                        onAnswers={(a: any) => setAnswers(a)}
                    />
                )}
                {(step === 2 && !isQuestions) || (step === 3 && isQuestions) && (
                    <EasyApplySubmit
                        data={jobApplicationData}
                        job={job}
                        safeSearchParams={safeSearchParams}
                    />
                )}
            </div>

            <div className='mt-5 w-full flex flex-row items-center justify-between gap-5 border rounded-md p-5'>
                <h6>Submitting this application wont change your JOBIFY profile.</h6>
            </div>
        </div>
    );
};

export default EasyApply;
