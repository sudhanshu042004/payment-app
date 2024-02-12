import React from "react";

const Button = ({ name, handleClick }) => {
  return (
    <button className="w-32" onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
