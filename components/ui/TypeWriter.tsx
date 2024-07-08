import React, { useState, useEffect } from 'react';

interface TypewriterEffectProps {
    text: string;
    speed?: number;
    className?: string;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ text, speed = 150, className = '' }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        } else {
            setIsTypingComplete(true);
        }
    }, [displayedText, text, speed]);

    return (
        <span className={className}>
            {displayedText}
            {isTypingComplete && (
                <span className="animate-blink">|</span>
            )}
        </span>
    );
};

export default TypewriterEffect;