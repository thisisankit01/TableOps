import React from "react";

interface TableHeaderProps {
  key: string;
  text: string;
}

function TableHeader({ key, text }: TableHeaderProps) {
  return (
    <th key={key} className="px-6 py-3">
      {text}
    </th>
  );
}

export default TableHeader;
