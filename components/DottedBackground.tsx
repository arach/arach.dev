'use client';

import React from 'react';

const DottedBackground: React.FC = () => {
    return (
        <div
            className="fixed inset-0 z-0"
            style={{
                backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.08) 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px',
            }}
        />
    );
};

export default DottedBackground;