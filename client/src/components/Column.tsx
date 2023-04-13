import React from "react";

type ColumnProps = {
  // className?: string;
  children: React.ReactNode;
};

export const GrayColumn = ({ children }: ColumnProps) => {
  return (
    <td
      className={`border-b border-gray-200 px-6 py-4  font-medium text-gray-900 whitespace-nowrap bg-gray-50`}
    >
      {children}
    </td>
  );
};

export const WhiteColumn = ({ children }: ColumnProps) => {
  return <td className={`border-b border-gray-200 px-6 py-4`}>{children}</td>;
};
