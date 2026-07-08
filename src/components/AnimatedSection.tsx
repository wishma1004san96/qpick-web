'use client';

import React from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  animation,
  delay,
}) => {
  const style = delay ? ({ transitionDelay: `${delay}ms` } as React.CSSProperties) : undefined;
  return (
    <div className={className} data-animation={animation} style={style}>
      {children}
    </div>
  );
};

export default AnimatedSection;