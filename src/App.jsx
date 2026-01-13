import React, { useState, useCallback, useRef, useEffect } from 'react'
import Hero from './components/Hero'
import Generator from './components/Generator'
import Workout from './components/Workout'
import ErrorBoundary from './components/ErrorBoundary'
import DarkModeToggle from './components/DarkModeToggle'
import { DarkModeProvider } from './context/DarkModeContext'
import { generateWorkout } from './tools/functions'

function AppContent() {
  const [workoutData, setWorkoutData] = useState(null);
  const [workoutType, setWorkoutType] = useState('individual');
  const [muscle, setMuscle] = useState([]);
  const [workoutgoal, setWorkoutgoal] = useState('strength_power');
  const [error, setError] = useState(null);
  const [exerciseData, setExerciseData] = useState(() => {
    const saved = localStorage.getItem('exerciseData');
    return saved ? JSON.parse(saved) : {};
  });
  const workoutRef = useRef(null);

  // Save exercise data to localStorage
  useEffect(() => {
    localStorage.setItem('exerciseData', JSON.stringify(exerciseData));
  }, [exerciseData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Print with Ctrl+P
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        window.print();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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

  const updateExerciseData = useCallback((exerciseName, data) => {
    setExerciseData(prev => ({
      ...prev,
      [exerciseName]: { ...prev[exerciseName], ...data }
    }));
  }, []);

  return (
    <ErrorBoundary>
      <main className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:via-teal-900 dark:to-slate-950 text-gray-900 dark:text-white relative overflow-hidden print:bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-400/10 via-transparent to-transparent print:hidden"></div>
        <DarkModeToggle />
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
          <div className="max-w-4xl mx-auto p-4 bg-red-500/20 border border-red-500 rounded-md text-center print:hidden">
            <p className="text-red-300">{error}</p>
          </div>
        )}
        {Array.isArray(workoutData) && workoutData.length > 0 && (
          <div ref={workoutRef}>
            <Workout 
              workout={workoutData} 
              exerciseData={exerciseData}
              updateExerciseData={updateExerciseData}
            />
          </div>
        )}
        </div>
      </main>
    </ErrorBoundary>
  )
}

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App