import React from "react";
import Button from "./Button";

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-xl"> You have to get your </p>
        <h1 className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl ">Workouts<span className="text-lime-400"> Tracked</span></h1>
      </div>
      <p className="text-sm md:text-base font-light mt-4">Monitor your progress, and achieve your fitness <span className="text-lime-400 font-medium">goals</span> with ease.</p>
      <p className="text-sm md:text-base font-light"><span className="text-lime-400 font-medium">Join</span> the community and start your <span className="text-lime-400 font-medium">fitness</span> journey today!</p>
      <Button func={() => { window.location.href = "#generator"; }} text={"Get Started"} />
    </div>
  );
}