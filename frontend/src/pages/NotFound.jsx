import React from 'react';
import FuzzyText from '@/components/FuzzyText';
import Galaxy from '@/components/Galaxy';

const NotFound = () => {
    return (
        <div className='flex items-center justify-center min-h-screen relative'>
            <Galaxy
                mouseRepulsion={false}
                mouseInteraction={false}
            />
            <div className='z-2 text-xs md:text-base'>
                <FuzzyText
                    baseIntensity={0.2}
                    hoverIntensity={0.7}
                    enableHover={true}
                >
                    404 - NOT FOUND
                </FuzzyText>
            </div>
        </div>
    );
}

export default NotFound;