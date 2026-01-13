import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";

export default function Workout({ workout, exerciseData, updateExerciseData }) {
  if (!Array.isArray(workout) || workout.length === 0) {
    return null;
  }

  return (
    <SectionWrapper 
      header={"Generate your workout"}
      title={["The", "Danger", "Zone"]}
      id={"workout"}
    > 
      <div className="print:hidden mb-4 text-center">
        <button
          onClick={() => window.print()}
          className="bg-gradient-to-r from-lime-500 to-lime-600 text-black px-6 py-3 rounded-xl shadow-lg hover:from-lime-400 hover:to-lime-500 transition-all duration-300 font-semibold"
        >
          🖨️ Print Workout
        </button>
      </div>
      <section className="flex flex-col gap-4" aria-label="Workout exercises">
        {workout.map((exercise, i) => (
          <ExerciseCard 
            key={exercise?.name || i} 
            index={i} 
            exercise={exercise}
            exerciseData={exerciseData?.[exercise?.name] || {}}
            updateExerciseData={(data) => updateExerciseData(exercise?.name, data)}
          />
        ))}
      </section>
    </SectionWrapper>
  );
}
