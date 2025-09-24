import React from 'react';
import { cn } from '@/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = false }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-card',
        hover && 'hover:shadow-card-hover transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
