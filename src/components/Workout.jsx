import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";

export default function Workout({ Workout }) {
  return (
    <SectionWrapper 
      header={"genarate your workout"}
      title={["The", "Danger", "Zone"]}
      id={"workout"}
    > 
      <div className="flex flex-col gap-4">
        {Workout.map((exercise, i) => (
          <ExerciseCard key={i} i={i} exercise={exercise} />
        ))}
      </div>
    </SectionWrapper>
  );
}
