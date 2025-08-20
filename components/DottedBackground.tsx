'use client';

import React from 'react';

const DottedBackground: React.FC = () => {
    return (
        <div
            className="fixed inset-0 -z-20"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
            }}
        />
    );
};

export default DottedBackground;