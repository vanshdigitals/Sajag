import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'bordered';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default' }) => {
  return (
    <div className={`${styles.card} ${styles[variant]} ${className || ''}`}>
      {children}
    </div>
  );
};

interface SubCardProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<SubCardProps> = ({ children, className }) => (
  <div className={`${styles.header} ${className || ''}`.trim()}>{children}</div>
);

export const CardTitle: React.FC<SubCardProps> = ({ children, className }) => (
  <h3 className={`${styles.title} ${className || ''}`.trim()}>{children}</h3>
);

export const CardContent: React.FC<SubCardProps> = ({ children, className }) => (
  <div className={`${styles.content} ${className || ''}`.trim()}>{children}</div>
);

export const CardFooter: React.FC<SubCardProps> = ({ children, className }) => (
  <div className={`${styles.footer} ${className || ''}`.trim()}>{children}</div>
);
