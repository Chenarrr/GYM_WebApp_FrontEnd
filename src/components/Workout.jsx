import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";

export default function Workout({ workout }) {
  if (!Array.isArray(workout) || workout.length === 0) {
    return null;
  }

  return (
    <SectionWrapper 
      header={"Generate your workout"}
      title={["The", "Danger", "Zone"]}
      id={"workout"}
    > 
      <section className="flex flex-col gap-4" aria-label="Workout exercises">
        {workout.map((exercise, i) => (
          <ExerciseCard key={exercise?.name || i} index={i} exercise={exercise} />
        ))}
      </section>
    </SectionWrapper>
  );
}
