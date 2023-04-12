import React, { useState } from "react";

type TransactionColumn = {
  key: string;
  text: string;
};

type DropdownButtonProps = {
  options: TransactionColumn[];
  label: string;
  handleSelect: (selectedItem: string) => void;
};

function DropdownButton({ options, label, handleSelect }: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(key: string) {
    setSelectedItem(key);
    handleSelect(key);
    setIsOpen(false);
  }

  return (
    <div className="max-w-fit pb-4">
      <button
        className=" text-white px-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-xl py-4 text-center inline-flex"
        onClick={handleClick}
      >
        {label}
      </button>
      {isOpen && (
        <div className="pt-2 border-2 place">
          {options.map((option) => (
            <div
              className="dropdown-option"
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
            >
              {option.text}
            </div>
          ))}
        </div>
      )}
      {selectedItem && <p>You selected: {selectedItem}</p>}
    </div>
  );
}

export default DropdownButton;
