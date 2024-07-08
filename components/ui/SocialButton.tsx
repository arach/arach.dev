import React from 'react';
import { Button } from "@/components/ui/button";

export const SocialButton: React.FC<{ icon: React.ElementType, className?: string }> = ({ icon: Icon, className = "" }) => (
    <Button variant="ghost" size="icon" className={`hover:bg-transparent hover:text-inherit ${className}`}>
        <Icon className="h-5 w-5" />
    </Button>
);