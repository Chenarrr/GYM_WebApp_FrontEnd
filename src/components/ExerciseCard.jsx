export function exerciseCard({ exercise }) {
    return (
        <div className="exercise-card bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
            <p className="text-gray-400 mb-2">Type: {exercise.type}</p>
            <p className="text-gray-400 mb-2">Muscles: {exercise.muscles.join(', ')}</p>
            <p className="text-gray-400">Equipment: {exercise.equipment.join(', ')}</p>
        </div>
    );
}