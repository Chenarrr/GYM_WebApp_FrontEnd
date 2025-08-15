import React, { useState } from "react";

export default function ExerciseCard({ exercise, index }) {
  const [setsCompleted, setSetsCompleted] = useState(0);

  function handleSetIncrement() {
    setSetsCompleted((prev) => (prev + 1) % 6);
  }

  return (
    <div className="p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-row sm:items-center sm:flex-wrap gap-x-4">
      <h4 className="text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400">
        0{index + 1}
      </h4>

      <h2 className="capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 md:text-center">
        {exercise.name.replaceAll("-", " ")}
      </h2>

      <p className="text-sm text-slate-400 capitalize">{exercise.type}</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <h3>Muscle groups</h3>
        <p className="capitalize">{exercise.muscle.join(" % ")}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-2">
        <h3>Description</h3>
        <div className="capitalize flex flex-col gap-1">
          {exercise.description.split("___").map((val, i) => (
            <div key={i} className="text-sm">
              {val}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:place-items-center">
        {["reps", "rest", "tempo"].map((info) => (
          <div
            className="flex flex-col items-center gap-1 border border-slate-600 p-2 rounded-md w-full"
            key={info}
          >
            <h3 className="capitalize">
              {info === "reps" ? exercise.unit : info}
            </h3>
            <p className="font-medium">{exercise[info]}</p>
          </div>
        ))}

        <button
          onClick={handleSetIncrement}
          className="bg-lime-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-lime-300 transition duration-300 mt-6 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <h3 className="capitalize">Sets completed</h3>
          <p className="font-medium">{setsCompleted}</p>
        </button>
      </div>
    </div>
  );
}
