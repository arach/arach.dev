import React from 'react';
import { Button } from "@/components/ui/button";

export const SocialButton: React.FC<{ icon: React.ElementType, className?: string }> = ({ icon: Icon, className = "" }) => (
    <Button variant="ghost" size="icon" className={`text-gray-400  hover:text-gray-100 transition-colors duration-300 ${className}`}>
        <Icon className="h-5 w-5" />
    </Button>
);