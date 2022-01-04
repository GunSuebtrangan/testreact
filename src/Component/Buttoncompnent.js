import React from "react";

const Button = ({ children, type, OnClick, className }) => {
  return (
    <button onClick={OnClick} type={type} className={className}>
      {children}
    </button>
  );
};
export default Button;
