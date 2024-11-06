import React, { useState, useEffect } from 'react';
import Stepper from './Stepper';
import BasicInfo from '../../components/partner/basicInfo';
import Services from '../../components/partner/Services';
import TeamSize from '../../components/partner/TeamSize';
import Location from '../../components/partner/Location';
// import VerifyData from '../../components/partner/VerifyData';

const Registration = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ['Basic Info', 'Services', 'Team Size', 'Location', 'Verify Data'];

    // Update the last page in localStorage whenever currentStep changes
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
                return <Location nextStep={nextStep} previousStep={previousStep} />;
            case 4:
                return <VerifyData nextStep={nextStep} previousStep={previousStep} />;
            default:
                return <BasicInfo nextStep={nextStep} previousStep={previousStep} />;
        }
    };

    return (
        <div className="flex h-screen mx-6 md:mx-8 lg:mx-16 xl:mx-32">
            <div className="flex flex-col md:flex-row w-full h-w-screen">
    
                {/* Left section for Stepper */}
                <div className="w-1/3 border-gray-300 p-4 flex-shrink-0 flex items-center"> 
                    <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
                </div>

                {/* Right section for step content - full width */}
                <div className="w-full p-4"> 
                    {renderStepContent()}
                </div>
             </div>
    </div>

    );
};

export default Registration;
