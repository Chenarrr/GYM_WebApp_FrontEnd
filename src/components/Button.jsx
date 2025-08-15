import React from "react";

export default function Button({ text , functions }) {


  return (
    <button
      onClick={functions}
      className = "bg-lime-500 text-black px-6 py-3 rounded-md shadow-md hover:bg-lime-300 transition duration-300 shadow-lg hover:shadow-xl hover:scale-110 m-2 mx-auto">
      
      <button ><p>{text}</p></button>

    </button>
  );
}