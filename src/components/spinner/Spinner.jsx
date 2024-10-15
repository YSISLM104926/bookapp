import React from 'react';
import './Spinner.css';
const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="lds-roller relative w-20 h-20">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className={`absolute w-[7.2px] h-[7.2px] bg-current rounded-full`} style={{ animationDelay: `${-index * 0.036}s`, transformOrigin: '40px 40px' }}>
                        <div className="block absolute w-[7.2px] h-[7.2px] bg-current rounded-full" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Spinner;
