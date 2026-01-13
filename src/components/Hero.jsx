import React from "react";
import Button from "./Button";

export default function Hero() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-screen flex flex-col gap-10 items-center justify-center max-w-4xl mx-auto px-4" aria-labelledby="hero-heading">
      <header className="flex flex-col gap-4 items-center justify-center text-center">
        <p className="text-xl">You have to get your</p>
        <h1 id="hero-heading" className="uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Workouts<span className="text-lime-400"> Tracked</span>
        </h1>
      </header>
      <p className="text-sm md:text-base font-light mt-4 text-center">
        Monitor your progress, and achieve your fitness <span className="text-lime-400 font-medium">goals</span> with ease.
      </p>
      <p className="text-sm md:text-base font-light text-center">
        <span className="text-lime-400 font-medium">Join</span> the community and start your <span className="text-lime-400 font-medium">fitness</span> journey today!
      </p>
      <Button func={scrollToGenerator} text={"Get Started"} aria-label="Get started with workout generator" />
    </section>
  );
}