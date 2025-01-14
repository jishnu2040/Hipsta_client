import React from 'react';

const Stepper = ({ steps, currentStep, setCurrentStep }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="max-w-md w-full">
                {steps.map((step, index) => (
                    <div key={index} className="relative flex items-start mb-4">
                        {/* Step Indicator */}
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 ease-in-out ${
                                currentStep >= index
                                    ? 'bg-green-600 text-white border-blue-500'
                                    : 'bg-white text-gray-500 border-gray-300 hover:bg-blue-100 hover:text-blue-500'
                            }`}
                            onClick={() => setCurrentStep(index)}
                            role="button"
                        >
                            {index + 1}
                        </div>

                        {/* Vertical Connecting Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={`absolute bol left-3 top-8  w-0.5 h-full ${
                                    currentStep > index ? 'bg-blue-500' : 'bg-gray-600'
                                }`}

                            />
                        )}

                        {/* Step Label */}
                        <span
                            className={`ml-6 text-lg  font-medium transition-colors duration-200 ${
                                currentStep >= index ? 'text-blue-500' : 'text-gray-500'
                            }`}
                        >
                            {step}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stepper;
