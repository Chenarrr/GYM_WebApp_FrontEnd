import React from "react";
import Button from "./Button";

export default function Hero() {
  const scrollToGenerator = () => {
    document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="min-h-screen flex flex-col gap-10 items-center justify-center max-w-5xl mx-auto px-4" aria-labelledby="hero-heading">
      <div className="relative">
        <div className="absolute inset-0 blur-3xl opacity-30 bg-lime-400/20 rounded-full"></div>
        <header className="relative flex flex-col gap-6 items-center justify-center text-center">
          <p className="text-xl md:text-2xl font-light tracking-wide text-gray-300 animate-fade-in">You have to get your</p>
          <h1 id="hero-heading" className="uppercase font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-white via-lime-200 to-lime-400 bg-clip-text text-transparent drop-shadow-2xl">
            Workouts<span className="text-lime-400"> Tracked</span>
          </h1>
        </header>
      </div>
      <div className="flex flex-col gap-4 max-w-2xl">
        <p className="text-base md:text-lg font-light text-center text-gray-300 leading-relaxed">
          Monitor your progress, and achieve your fitness <span className="text-lime-400 font-semibold">goals</span> with ease.
        </p>
        <p className="text-base md:text-lg font-light text-center text-gray-300 leading-relaxed">
          <span className="text-lime-400 font-semibold">Join</span> the community and start your <span className="text-lime-400 font-semibold">fitness</span> journey today!
        </p>
      </div>
      <div className="mt-4">
        <Button func={scrollToGenerator} text={"Get Started"} aria-label="Get started with workout generator" />
      </div>
    </section>
  );
}