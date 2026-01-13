import React, { useState, useCallback, useEffect, useRef } from "react";

const MAX_SETS = 6;

export default function ExerciseCard({ exercise, index, exerciseData = {}, updateExerciseData }) {
  const [setsCompleted, setSetsCompleted] = useState(exerciseData.setsCompleted || 0);
  const [setWeights, setSetWeights] = useState(exerciseData.setWeights || {});
  const [notes, setNotes] = useState(exerciseData.notes || '');
  const [showNotes, setShowNotes] = useState(false);
  const cardRef = useRef(null);

  const handleSetIncrement = useCallback(() => {
    const newSets = (setsCompleted + 1) % MAX_SETS;
    setSetsCompleted(newSets);
    updateExerciseData?.({ setsCompleted: newSets });
  }, [setsCompleted, updateExerciseData]);

  const handleWeightChange = useCallback((setNumber, value) => {
    const newSetWeights = { ...setWeights, [setNumber]: value };
    setSetWeights(newSetWeights);
    updateExerciseData?.({ setWeights: newSetWeights });
  }, [setWeights, updateExerciseData]);

  const handleNotesChange = useCallback((e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    updateExerciseData?.({ notes: newNotes });
  }, [updateExerciseData]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!cardRef.current?.contains(document.activeElement)) return;
      
      if (e.key === ' ' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleSetIncrement();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSetIncrement]);

  if (!exercise) {
    return null;
  }

  return (
    <article 
      ref={cardRef}
      tabIndex={0}
      className="p-6 m-2 rounded-2xl flex flex-col gap-6 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 sm:flex-row sm:items-start sm:flex-wrap gap-x-6 text-gray-900 dark:text-slate-100 shadow-lg dark:shadow-2xl border border-gray-300 dark:border-slate-800 hover:border-lime-500/50 dark:hover:border-lime-500/30 transition-all duration-300 print:bg-white print:border print:border-gray-400 print:shadow-none print:break-inside-avoid print:mb-4 print:text-black"
      aria-label={`Exercise ${index + 1}: ${(exercise?.name || "").replaceAll("_", " ")}`}
    >
      <div className="bg-gradient-to-br from-lime-400 to-lime-600 text-black rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-lg shadow-lime-500/50 print:shadow-none print:border-2 print:border-lime-600" aria-hidden="true">
        {index + 1}
      </div>

      <span className="bg-teal-100 dark:bg-teal-600/30 text-teal-800 dark:text-lime-400 capitalize text-xs font-bold px-3 py-1 rounded-full border border-teal-300 dark:border-teal-500/50 print:bg-gray-200 print:text-black print:border-gray-400" aria-label="Exercise type">
        {exercise?.type || ""}
      </span>

      <h2 className="capitalize text-gray-900 dark:text-white truncate max-w-full text-xl sm:text-2xl md:text-3xl flex-1 font-bold print:text-black">
        {(exercise?.name || "").replaceAll("_", " ")}
      </h2>


      <div className="flex flex-col sm:flex-row sm:items-center gap-2 bg-lime-50 dark:bg-slate-800/50 px-4 py-2 rounded-lg border border-lime-200 dark:border-slate-700 print:bg-gray-100 print:border-gray-300">
        <h3 className="font-bold text-lime-700 dark:text-lime-400 text-sm print:text-black">TARGET MUSCLES:</h3>
        <p className="capitalize text-gray-900 dark:text-white font-semibold print:text-black" aria-label="Target muscles">
          {(exercise?.muscle || exercise?.muscles || []).join(" & ")}
        </p>
      </div>

      <div className="flex flex-col gap-3 bg-gray-50 dark:bg-slate-800/30 p-4 rounded-xl border border-gray-200 dark:border-slate-700/50 w-full print:bg-gray-50 print:border-gray-300">
        <h3 className="font-bold text-teal-700 dark:text-lime-400 text-sm print:text-black">DESCRIPTION:</h3>
        <div className="capitalize flex flex-col gap-3 text-gray-700 dark:text-slate-100" aria-label="Exercise description">
          {(exercise?.description || "").split("___").map((val, i) => (
            <p key={i} className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed print:text-black">
              {val}
            </p>
          ))}
        </div>
      </div>

      {/* Exercise Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full" role="list" aria-label="Exercise details">
        {["reps", "rest", "tempo"].map((info) => (
          <div
            className="flex flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 border-2 border-gray-300 dark:border-slate-700 p-4 rounded-xl w-full hover:border-lime-500/50 transition-all duration-300 shadow-sm dark:shadow-lg print:shadow-none print:border-gray-400 print:bg-white"
            key={info}
            role="listitem"
          >
            <h3 className="uppercase text-teal-700 dark:text-lime-400 text-xs font-bold tracking-wide print:text-black">
              {info === "reps" ? exercise?.unit || info : info}
            </h3>
            <p className="font-bold text-2xl text-gray-900 dark:text-white print:text-black" aria-label={`${info} value`}>
              {exercise?.[info] ?? "-"}
            </p>
          </div>
        ))}
      </div>

      {/* Weight Tracking Per Set */}
      <div className="w-full">
        <h3 className="font-bold text-teal-700 dark:text-lime-400 text-sm mb-3 print:text-black">WEIGHT PER SET:</h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {[...Array(MAX_SETS - 1)].map((_, setNum) => (
            <div key={setNum} className="flex flex-col gap-1">
              <label 
                htmlFor={`weight-${index}-${setNum}`} 
                className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-center print:text-black"
              >
                Set {setNum + 1}
              </label>
              <input
                id={`weight-${index}-${setNum}`}
                type="text"
                value={setWeights[setNum] || ''}
                onChange={(e) => handleWeightChange(setNum, e.target.value)}
                placeholder="0"
                className="w-full bg-white dark:bg-slate-800 text-center font-bold text-lg text-gray-900 dark:text-white p-2 rounded-lg border-2 border-gray-300 dark:border-slate-600 focus:border-lime-500 dark:focus:border-lime-500 outline-none transition-colors print:border print:border-gray-400 print:bg-white print:text-black"
                aria-label={`Weight for set ${setNum + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sets Counter */}
      <div className="w-full flex justify-center print:hidden">
        <button
          onClick={handleSetIncrement}
          aria-label={`Sets completed: ${setsCompleted} out of ${MAX_SETS - 1}. Press space to increment`}
          className="bg-gradient-to-r from-lime-500 to-lime-600 text-black px-8 py-4 rounded-xl shadow-xl hover:from-lime-400 hover:to-lime-500 transition-all duration-300 hover:shadow-2xl hover:shadow-lime-500/50 hover:scale-105 border-2 border-lime-400"
        >
          <h3 className="uppercase font-bold text-sm tracking-wide">Sets Completed (Press Space)</h3>
          <p className="font-bold text-3xl mt-1">{setsCompleted} / {MAX_SETS - 1}</p>
        </button>
      </div>

      {/* Notes Section */}
      <div className="w-full mt-2">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="text-teal-700 dark:text-lime-400 text-sm font-semibold hover:text-teal-600 dark:hover:text-lime-300 transition-colors flex items-center gap-2 print:hidden"
        >
          📝 {showNotes ? 'Hide Notes' : 'Add Notes / PR'}
        </button>
        {(showNotes || notes) && (
          <div className="mt-3">
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Add personal notes, PRs, or form tips..."
              className="w-full bg-gray-100 dark:bg-slate-800/50 text-gray-900 dark:text-slate-100 p-3 rounded-lg border border-gray-300 dark:border-slate-700 focus:border-lime-500 outline-none transition-colors text-sm print:border print:border-gray-400 print:bg-white print:text-black"
              rows="3"
              aria-label="Exercise notes"
            />
            {notes && (
              <p className="hidden print:block mt-2 text-sm text-black border-t border-gray-300 pt-2">
                <strong>Notes:</strong> {notes}
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
