import React from "react";
import SectionWrapper from "./SectionWrapper";
import ExerciseCard from "./ExerciseCard";

export default function Workout({ workout }) {
  return (
    <SectionWrapper 
      header={"genarate your workout"}
      title={["The", "Danger", "Zone"]}
      id={"workout"}
    > 
      <div className="flex flex-col gap-4">
        {(Array.isArray(workout) ? workout : []).map((exercise, i) => (
          <ExerciseCard key={i} index={i} exercise={exercise} />
        ))}
      </div>
    </SectionWrapper>
  );
}
