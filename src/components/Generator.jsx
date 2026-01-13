import React, { useState, useCallback, useMemo } from "react";
import SectionWrapper from "./SectionWrapper"; 
import { SCHEMES, WORKOUTS } from "../tools/Workouts";
import Button from "./Button";

const BUTTON_BASE_CLASSES = "bg-lime-500 text-black px-4 py-2 rounded-md shadow-md hover:bg-lime-300 transition duration-300 mt-6 shadow-lg hover:shadow-xl hover:scale-105";
const BUTTON_SELECTED_CLASSES = " bg-lime-100 shadow-lg shadow-lime-600 ";

function Header({ index, title, description }) {
  return (
    <div className="flex flex-col gap-4 text-center">
      <div className="flex gap-2 items-center justify-center">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-lime-400" aria-label={`Step ${index}`}>
          {index}
        </p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      {description && <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}

export default function Generator(props) {
  const { workoutType, setWorkoutType, muscle, setMuscle, workoutgoal, setWorkoutgoal } = props;
  const [selectedWorkout, setSelectedWorkout] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleBlockSelection = useCallback((blockName) => {
    setSelectedBlock(blockName);
    if (props.setMuscle) {
      props.setMuscle([blockName]);
    }
  }, [props]);

  const handleWorkoutTypeChange = useCallback((type) => {
    setWorkoutType(type);
    const firstBlock = Object.keys(WORKOUTS[type])[0];
    setSelectedBlock(firstBlock);
    if (props.setMuscle) {
      props.setMuscle([firstBlock]);
    }
  }, [setWorkoutType, props]);

  const workoutTypes = useMemo(() => Object.keys(WORKOUTS), []);
  const schemes = useMemo(() => Object.keys(SCHEMES), []);

  return (
    <SectionWrapper 
      header={"Get Your Workout Plan"}
      title={["it's", "Huge", "o'clock"]}
      id="generator"
    >
      <Header
        index={"01"}
        title={"Pick your workout"}
        description={""}
      />

      <div className="flex gap-4 flex-wrap items-center justify-center max-w-4xl mx-auto m-4" role="group" aria-label="Workout type selection">
        {workoutTypes.map((type, typeIndex) => (
          <button
            onClick={() => handleWorkoutTypeChange(type)}
            key={typeIndex}
            aria-pressed={type === workoutType}
            aria-label={`Select ${type.replaceAll("_", " ")} workout`}
            className={
              BUTTON_BASE_CLASSES +
              (type === workoutType ? BUTTON_SELECTED_CLASSES : " bg-lime-500")
            }
          >
            <p className="capitalize">{type.replaceAll("_", " ")}</p>
          </button>
        ))}
      </div>

      <div className="mt-20">
        <Header index={"02"} title={"Lock on your workout"} description={""} />

        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              setSelectedWorkout(!selectedWorkout);
              setSelectedBlock(null); 
            }}
            aria-expanded={selectedWorkout}
            aria-label="Toggle workout selection menu"
            className="bg-lime-500 text-black px-6 py-3 rounded-md shadow-md hover:bg-lime-300 transition duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full max-w-md"
          >
            <p className="text-lg font-semibold">Choose Today's Workout</p>
            <p className="block text-sm opacity-80">Click Here...</p>
          </button>
        </div>

        {selectedWorkout && (
          <div className="flex flex-col gap-2 mt-6 items-center text-white justify-center bg-teal-600/20 p-4 rounded-lg shadow-md max-w-md mx-auto">
            {selectedBlock ? (
              <div className="bg-black text-white px-4 py-4 rounded-md shadow-md w-full text-center">
                <p className="text-lg font-semibold capitalize">
                  {selectedBlock.replaceAll("_", " ")}
                </p>
                {Array.isArray(WORKOUTS[workoutType][selectedBlock]) && (
                  <p className="text-sm mt-2 text-gray-300">
                    {WORKOUTS[workoutType][selectedBlock].join(", ")}
                  </p>
                )}
                <button
                  onClick={() =>{setSelectedBlock(null)
                                 setSelectedWorkout(false)}}
                  className="mt-4 text-sm text-lime-400 underline hover:text-lime-300"
                >
                  Change Selection
                </button>
              </div>
            ) : (
              Object.keys(WORKOUTS[workoutType]).map((type, typeIndex) => (
                <button
                  key={typeIndex}
                  onClick={() => handleBlockSelection(type)} 
                  className="bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-lime-300 hover:text-black transition duration-300 mt-2 shadow-lg hover:shadow-xl hover:scale-105 w-full"
                >
                  <p className="capitalize">{type.replaceAll("_", " ")}</p>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      <div className="mb-12 mt-20">
        <Header index={"03"} title={"Choose your workout goal"} description={""} />
        <div className="flex gap-4 flex-wrap items-center justify-center max-w-4xl mx-auto" role="group" aria-label="Workout goal selection">
          {schemes.map((scheme, schemeIndex) => (
            <button
              onClick={() => setWorkoutgoal(scheme)}
              key={schemeIndex}
              aria-pressed={scheme === workoutgoal}
              aria-label={`Select ${scheme.replaceAll("_", " ")} goal`}
              className={
                BUTTON_BASE_CLASSES +
                (scheme === workoutgoal ? BUTTON_SELECTED_CLASSES : " bg-lime-500")
              }
            >
              <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
            </button>
          ))}
        </div>
      </div>
      <Button func={selectedBlock ? props.updateWorkout : undefined} text="Start Now" disabled={!selectedBlock} aria-label="Generate workout plan" />
    </SectionWrapper>
  );
}
