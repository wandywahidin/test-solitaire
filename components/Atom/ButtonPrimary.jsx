import React from "react";

const ButtonPrimary = ({ children, addClass, disabled=false, type, onClick }) => {
  return (
    <button
    type={type}
    onClick={onClick}
      className={
        "py-3 lg:py-4 px-12 lg:px-16 text-white-500 font-semibold rounded-lg bg-orange-500 hover:shadow-orange-md transition-all outline-none " +
        addClass
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;