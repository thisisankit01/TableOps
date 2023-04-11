import React from "react";

type WhiteColumnProps = {
  children: React.ReactNode;
};

const WhiteColumn = ({ children }: WhiteColumnProps) => {
  return <td className={`border-b border-gray-200 px-6 py-4`}>{children}</td>;
};

export default WhiteColumn;
