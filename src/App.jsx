import React, { useState } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import { generateWorkout } from './tools/functions'


function App() {
  const [workoutData, setWorkoutData] = useState(null);
  const [workoutType, setWorkoutType] = useState('individual');
  const [muscle, setMuscle] = useState([]);
  const [workoutgoal, setWorkoutgoal] = useState('strength_power');

  function updateWorkout() {
    // Only generate if all fields are filled
    if (workoutType && workoutgoal) {
      const args = {
        workoutType,
        muscle,
        workoutgoal,
      };
      const newWorkout = generateWorkout(args);
      setWorkoutData(newWorkout);
      window.location.href = '#workout';
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-teal-800 to-teal-950 text-white">
      <Hero />
      <Generator
        workoutType={workoutType}
        setWorkoutType={setWorkoutType}
        muscle={muscle}
        setMuscle={setMuscle}
        workoutgoal={workoutgoal}
        setWorkoutgoal={setWorkoutgoal}
        updateWorkout={updateWorkout}
      />
      {Array.isArray(workoutData) && workoutData.length > 0 && <Workout workout={workoutData} />}
    </main>
  )
}

export default App