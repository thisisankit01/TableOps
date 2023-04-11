import React from "react";

type GrayColumnProps = {
  // className?: string;
  children: React.ReactNode;
};

const GrayColumn = ({ children }: GrayColumnProps) => {
  return (
    <td
      className={`border-b border-gray-200 px-6 py-4  font-medium text-gray-900 whitespace-nowrap bg-gray-50`}
    >
      {children}
    </td>
  );
};

export default GrayColumn;
