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
      className="p-6 m-2 rounded-2xl flex flex-col gap-6 bg-gradient-to-br from-slate-900 to-slate-950 sm:flex-row sm:items-center sm:flex-wrap gap-x-6 text-slate-100 shadow-2xl border border-slate-800 hover:border-lime-500/30 transition-all duration-300 hover:shadow-lime-500/10"
      aria-label={`Exercise ${index + 1}: ${(exercise?.name || "").replaceAll("_", " ")}`}
    >
      <div className="bg-gradient-to-br from-lime-400 to-lime-600 text-black rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg shadow-lime-500/50" aria-hidden="true">
        {index + 1}
      </div>

      <span className="bg-teal-600/30 text-lime-400 capitalize text-xs font-bold px-3 py-1 rounded-full border border-teal-500/50" aria-label="Exercise type">
        {exercise?.type || ""}
      </span>

      <h2 className="capitalize text-white truncate max-w-full text-xl sm:text-2xl md:text-3xl flex-1 font-bold">
        {(exercise?.name || "").replaceAll("_", " ")}
      </h2>


      <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
        <h3 className="font-bold text-lime-400 text-sm">TARGET MUSCLES:</h3>
        <p className="capitalize text-white font-semibold" aria-label="Target muscles">
          {(exercise?.muscle || exercise?.muscles || []).join(" & ")}
        </p>
      </div>

      <div className="flex flex-col gap-3 bg-slate-800/30 p-4 rounded-xl border border-slate-700/50 w-full">
        <h3 className="font-bold text-lime-400 text-sm">DESCRIPTION:</h3>
        <div className="capitalize flex flex-col gap-3 text-slate-100" aria-label="Exercise description">
          {(exercise?.description || "").split("___").map((val, i) => (
            <p key={i} className="text-sm text-slate-300 leading-relaxed">
              {val}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full" role="list" aria-label="Exercise details">
        {["reps", "rest", "tempo"].map((info) => (
          <div
            className="flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 p-4 rounded-xl w-full hover:border-lime-500/50 transition-all duration-300 shadow-lg"
            key={info}
            role="listitem"
          >
            <h3 className="uppercase text-lime-400 text-xs font-bold tracking-wide">
              {info === "reps" ? exercise?.unit || info : info}
            </h3>
            <p className="font-bold text-2xl text-white" aria-label={`${info} value`}>
              {exercise?.[info] ?? "-"}
            </p>
          </div>
        ))}

        <button
          onClick={handleSetIncrement}
          aria-label={`Sets completed: ${setsCompleted} out of ${MAX_SETS - 1}`}
          className="bg-gradient-to-r from-lime-500 to-lime-600 text-black px-4 py-4 rounded-xl shadow-xl hover:from-lime-400 hover:to-lime-500 transition-all duration-300 hover:shadow-2xl hover:shadow-lime-500/50 hover:scale-105 border-2 border-lime-400"
        >
          <h3 className="uppercase font-bold text-xs tracking-wide">Sets Completed</h3>
          <p className="font-bold text-2xl mt-1">{setsCompleted}</p>
        </button>
      </div>
    </article>
  );
}
