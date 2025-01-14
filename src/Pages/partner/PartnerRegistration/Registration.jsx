import React, { useState, useEffect } from 'react';
import Stepper from './Stepper';
import BasicInfo from '../../../components/partner/registration/basicInfo';
import Services from '../../../components/partner/registration/Services';
import TeamSize from '../../../components/partner/registration/TeamSize';
import FileUpload from '../../../components/partner/registration/FileUpload';
import Location from '../../../components/partner/registration/Location';
import VerifyData from '../../../components/partner/registration/VerifyData';

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        'Personal Info',
        'Services',
        'Team',
        'Documents',
        'Location',
        'Review'
      ];


    // moving to last visited page , info collecting from Local storage
    useEffect(() => {
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
            const savedStep = steps.indexOf(lastPage);
            if (savedStep !== -1) {
                setCurrentStep(savedStep);
            }
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('lastPage', steps[currentStep]);
    }, [currentStep]);

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const previousStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <BasicInfo nextStep={nextStep} previousStep={previousStep} />;
            case 1:
                return <Services nextStep={nextStep} previousStep={previousStep} />;
            case 2:
                return <TeamSize nextStep={nextStep} previousStep={previousStep} />;
            case 3:
                return <FileUpload nextStep={nextStep} previousStep={previousStep} />;
            case 4:
                return <Location nextStep={nextStep} previousStep={previousStep} />;
            case 5:
                return <VerifyData nextStep={nextStep} previousStep={previousStep} />;
            default:
                return <BasicInfo nextStep={nextStep} previousStep={previousStep} />;
        }
    };

    return (
        <div className="flex md:mx-8 lg:mx-16 xl:mx-32">
            <div className="flex flex-col md:flex-row w-full h-w-screen">
    
                {/* Left---Stepper */}
                <div className="w-1/3 border-gray-300 p-4 sm:flex hidden items-center  "> 
                    <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
                </div>

                {/* Right-- step content */}
                <div className="w-full"> 
                    {renderStepContent()}
                </div>
             </div>
    </div>

    );
};

export default Registration;
