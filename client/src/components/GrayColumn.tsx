import React from "react";

type GrayColumnProps = {
  className?: string;
  children: React.ReactNode;
};

const GrayColumn = ({ children, className }: GrayColumnProps) => {
  return (
    <td className={`border-b border-gray-200 px-6 py-4 ${className}`}>
      {children}
    </td>
  );
};

export default GrayColumn;
