import React from "react";

export default function Button({ text, func, disabled }) {
  return (
    <button
      onClick={func}
      disabled={disabled}
      className={
        "bg-lime-500 text-black px-6 py-3 rounded-md shadow-md transition duration-300 shadow-lg mx-auto m-2 " +
        (disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-lime-300 hover:shadow-xl hover:scale-110")
      }
    >
      <p>{text}</p>

      
    </button>
  );
}