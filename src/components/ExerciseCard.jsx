import React, { useState, useCallback } from "react";

const MAX_SETS = 6;

export default function ExerciseCard({ exercise, index }) {
  const [setsCompleted, setSetsCompleted] = useState(0);

  const handleSetIncrement = useCallback(() => {
    setSetsCompleted((prev) => (prev + 1) % MAX_SETS);
  }, []);

  if (!exercise) {
    return null;
  }

  return (
    <article 
      className="p-2 m-2 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-row sm:items-center sm:flex-wrap gap-x-4 text-slate-100"
      aria-label={`Exercise ${index + 1}: ${(exercise?.name || "").replaceAll("_", " ")}`}
    >
      <div className="text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-300 shadow shadow-slate-800 p-2 rounded-md" aria-hidden="true">
        0{index + 1}
      </div>

      <span className="text-slate-100 capitalize text-sm gap-1" aria-label="Exercise type">
        {exercise?.type || ""}
      </span>

      <h2 className="capitalize whitespace-nowrap text-slate-100 truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 md:text-center">
        {(exercise?.name || "").replaceAll("_", " ")}
      </h2>


      <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-slate-200">
        <h3 className="font-semibold">Muscle:</h3>
        <p className="capitalize text-slate-100" aria-label="Target muscles">
          {(exercise?.muscle || exercise?.muscles || []).join(" & ")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 p-2">
        <h3 className="font-semibold">Description:</h3>
        <div className="capitalize flex flex-col gap-4 text-slate-100" aria-label="Exercise description">
          {(exercise?.description || "").split("___").map((val, i) => (
            <p key={i} className="text-sm text-slate-400">
              {val}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:place-items-center" role="list" aria-label="Exercise details">
        {["reps", "rest", "tempo"].map((info) => (
          <div
            className="flex flex-col items-center gap-1 border border-slate-600 p-2 rounded-md w-full"
            key={info}
            role="listitem"
          >
            <h3 className="capitalize text-slate-100 text-sm font-semibold">
              {info === "reps" ? exercise?.unit || info : info}
            </h3>
            <p className="font-medium text-slate-400" aria-label={`${info} value`}>
              {exercise?.[info] ?? "-"}
            </p>
          </div>
        ))}

        <button
          onClick={handleSetIncrement}
          aria-label={`Sets completed: ${setsCompleted} out of ${MAX_SETS - 1}`}
          className="bg-lime-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-lime-300 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <h3 className="capitalize font-semibold">Sets completed</h3>
          <p className="font-medium">{setsCompleted}</p>
        </button>
      </div>
    </article>
  );
}
