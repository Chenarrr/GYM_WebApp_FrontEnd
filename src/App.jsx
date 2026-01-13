import React, { useState, useCallback, useRef } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import ErrorBoundary from './components/ErrorBoundary'
import { generateWorkout } from './tools/functions'

function App() {
  const [workoutData, setWorkoutData] = useState(null);
  const [workoutType, setWorkoutType] = useState('individual');
  const [muscle, setMuscle] = useState([]);
  const [workoutgoal, setWorkoutgoal] = useState('strength_power');
  const [error, setError] = useState(null);
  const workoutRef = useRef(null);

  const updateWorkout = useCallback(() => {
    try {
      setError(null);
      // Only generate if all fields are filled
      if (workoutType && workoutgoal) {
        const args = {
          workoutType,
          muscle,
          workoutgoal,
        };
        const newWorkout = generateWorkout(args);
        setWorkoutData(newWorkout);
        
        // Smooth scroll to workout section
        setTimeout(() => {
          workoutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (err) {
      console.error('Error generating workout:', err);
      setError('Failed to generate workout. Please try again.');
    }
  }, [workoutType, muscle, workoutgoal]);

  return (
    <ErrorBoundary>
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-teal-900 to-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400/5 via-transparent to-transparent"></div>
        <div className="relative z-10">
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
        {error && (
          <div className="max-w-4xl mx-auto p-4 bg-red-500/20 border border-red-500 rounded-md text-center">
            <p className="text-red-300">{error}</p>
          </div>
        )}
        {Array.isArray(workoutData) && workoutData.length > 0 && (
          <div ref={workoutRef}>
            <Workout workout={workoutData} />
          </div>
        )}
        </div>
      </main>
    </ErrorBoundary>
  )
}

export default App