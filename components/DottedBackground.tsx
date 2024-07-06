'use client';

import React from 'react';

interface DottedBackgroundProps {
    children: React.ReactNode;
}

const DottedBackground: React.FC<DottedBackgroundProps> = ({ children }) => {
    return (
        <div className="relative bg-background">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                }}
            />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default DottedBackground;