import React, { useState, useCallback, useMemo } from "react";
import SectionWrapper from "./SectionWrapper"; 
import { SCHEMES, WORKOUTS } from "../tools/Workouts";
import Button from "./Button";

const BUTTON_BASE_CLASSES = "bg-gradient-to-r from-lime-500 to-lime-600 text-black px-6 py-3 rounded-xl shadow-lg hover:from-lime-400 hover:to-lime-500 transition-all duration-300 font-semibold hover:shadow-2xl hover:shadow-lime-500/50 hover:scale-105 border border-lime-400/20";
const BUTTON_SELECTED_CLASSES = " from-lime-300 to-lime-400 shadow-2xl shadow-lime-400/60 ring-4 ring-lime-400/30 scale-105 ";

function Header({ index, title, description }) {
  return (
    <div className="flex flex-col gap-4 text-center mb-8 print:mb-4">
      <div className="flex gap-4 items-center justify-center">
        <div className="bg-gradient-to-br from-lime-400 to-lime-600 text-black rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center font-bold text-xl sm:text-2xl shadow-lg shadow-lime-500/50 print:shadow-none" aria-label={`Step ${index}`}>
          {index}
        </div>
        <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white print:text-black">{title}</h4>
      </div>
      {description && <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed print:text-black">{description}</p>}
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

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {
              setSelectedWorkout(!selectedWorkout);
              setSelectedBlock(null); 
            }}
            aria-expanded={selectedWorkout}
            aria-label="Toggle workout selection menu"
            className="bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-4 rounded-xl shadow-xl hover:from-teal-500 hover:to-teal-600 transition-all duration-300 shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-400/50 hover:scale-105 w-full max-w-md border border-teal-400/30"
          >
            <p className="text-xl font-bold">Choose Today's Workout</p>
            <p className="block text-sm opacity-80 mt-1">Click to select...</p>
          </button>
        </div>

        {selectedWorkout && (
          <div className="flex flex-col gap-3 mt-8 items-center text-white justify-center bg-gradient-to-br from-teal-900/40 to-teal-800/40 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-teal-500/30 max-w-md mx-auto">
            {selectedBlock ? (
              <div className="bg-gradient-to-br from-lime-500 to-lime-600 text-black px-6 py-5 rounded-xl shadow-xl w-full text-center border-2 border-lime-300">
                <p className="text-xl font-bold capitalize mb-2">
                  {selectedBlock.replaceAll("_", " ")}
                </p>
                {Array.isArray(WORKOUTS[workoutType][selectedBlock]) && (
                  <p className="text-sm mt-2 text-black/80 font-medium">
                    {WORKOUTS[workoutType][selectedBlock].join(", ")}
                  </p>
                )}
                <button
                  onClick={() =>{setSelectedBlock(null)
                                 setSelectedWorkout(false)}}
                  className="mt-4 text-sm text-black font-semibold underline hover:text-black/80 transition-colors"
                >
                  Change Selection
                </button>
              </div>
            ) : (
              Object.keys(WORKOUTS[workoutType]).map((type, typeIndex) => (
                <button
                  key={typeIndex}
                  onClick={() => handleBlockSelection(type)} 
                  className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-5 py-3 rounded-xl shadow-lg hover:from-lime-500 hover:to-lime-600 hover:text-black transition-all duration-300 shadow-slate-900/50 hover:shadow-2xl hover:shadow-lime-500/50 hover:scale-105 w-full font-semibold border border-slate-700 hover:border-lime-400"
                >
                  <p className="capitalize text-base">{type.replaceAll("_", " ")}</p>
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
