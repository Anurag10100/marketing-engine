"use client";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-card border border-border-default bg-bg-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}
