import React from 'react';

interface FlexibleHeadingProps {
  children: React.ReactNode;
}

const FlexibleHeading: React.FC<FlexibleHeadingProps> = ({ children }) => {
  return (
    <div className="text-4xl font-bold sm:text-6xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#468BF4]">
        {children}
      </span>
    </div>
  );
};

export default FlexibleHeading;
