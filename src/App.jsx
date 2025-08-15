import React, { useState } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'


  

function App() {
 
  
const [Workout, setWorkout] = useState(false);
const [workoutType, setWorkoutType] = useState("individual");
const [muscle, setMuscle] = useState([]);
const [workoutgoal, setWorkoutgoal] = useState("strength_power");



 
function genarateWorkout(workoutType, muscle, workoutgoal) { 
  setWorkout(newWorkout);}


 function updateWorkout() {

  if (muscle.length === 0 || workoutType === "" || workoutgoal === "") {
    newWorkout = genarateWorkout(workoutType, muscle, workoutgoal);
    setWorkout(newWorkout);


    window.location.href = "#workout";
  }

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-r from-teal-800 to-teal-950 text-white">

     <Hero />

      <Generator  workoutType = {workoutType} setWorkout={setWorkoutType}
                  muscle ={muscle} setMuscle={setMuscle}
                  workoutgoal={workoutgoal} setWorkoutgoal={setWorkoutgoal}
                  updateWorkout={updateWorkout}
      />

      {Workout && (<Workout Workout ={Workout} />)}
    </main>
  )
}}

export default App

