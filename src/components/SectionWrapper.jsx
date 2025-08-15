
import React from "react";


export default function SectionWrapper(props) {
    const { children, header, title } = props;


  return (


    <section className="min-h-screen flex flex-col gap-10  p-6">

    <div className="flex flex-col gap-2 items-center justify-center  bg-lime-500 p-6 shadow-lg rounded-lg">
      <p className="text-xl font-semibold text-black">{header}</p>
      <h2 className="font-semi-bold text-3xl sm:text4xl text-black" > {title[0]} <span className="uppercase font-medium">{title[2]}</span> {title[3]} </h2>
    </div>

    <div className="flex flex-col gap-4 items-center justify-center max-w-4xl mx-auto text-black bg-teal-800 p-6 rounded-lg shadow-md hover:bg-teal-500/20 ransition duration-300  hover:scale-110 m-2">
        {children}
     
   
     </div>  

    </section>

  );
}