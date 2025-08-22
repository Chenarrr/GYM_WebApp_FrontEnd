import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./Workouts"
const exercises = exercisesFlattener(EXERCISES)

export function generateWorkout(args) {
    const { workoutType, muscle, workoutgoal } = args
    let exer = Object.keys(exercises);
    exer = exer.filter((key) => exercises[key].meta.environment !== "home");
    let includedTracker = [];

    // Get scheme info
    const scheme = SCHEMES[workoutgoal];
    const numCompound = scheme.ratio[0];   // Number of compound sets
    const numAccessory = scheme.ratio[1];  // Number of accessory sets
    const repMin = scheme.repRanges[0];
    const repMax = scheme.repRanges[1];

    let listOfMuscles;
    if (workoutType === "individual") {
        listOfMuscles = Array.isArray(muscle) ? muscle : [];
    } else {
        listOfMuscles = (WORKOUTS[workoutType] && Array.isArray(muscle) && muscle.length > 0 && WORKOUTS[workoutType][muscle[0]])
            ? WORKOUTS[workoutType][muscle[0]]
            : [];
    }

    listOfMuscles = new Set(shuffleArray(Array.isArray(listOfMuscles) ? listOfMuscles : []));
    let arrOfMuscles = Array.from(listOfMuscles);

    // Build sets array based on scheme ratio
    let sets = [
        ...[...Array(numCompound).keys()].map(() => "compound"),
        ...[...Array(numAccessory).keys()].map(() => "accessory")
    ].map((setType, index) => ({
        setType,
        muscleGroup: arrOfMuscles[index % arrOfMuscles.length]
    }));

    const { compound: compoundExercises, accessory: accessoryExercises } =
        exer.reduce(
            (acc, curr) => {
                let exerciseHasRequiredMuscle = false;
                for (const musc of exercises[curr].muscles) {
                    if (listOfMuscles.has(musc)) {
                        exerciseHasRequiredMuscle = true;
                    }
                }
                return exerciseHasRequiredMuscle
                    ? {
                        ...acc,
                        [exercises[curr].type]: {
                            ...acc[exercises[curr].type],
                            [curr]: exercises[curr],
                        },
                    }
                    : acc;
            },
            { compound: {}, accessory: {} }
        );

    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data =
            setType === "compound" ? compoundExercises : accessoryExercises;
        const filteredObj = Object.keys(data).reduce((acc, curr) => {
            if (
                includedTracker.includes(curr) ||
                !data[curr].muscles.includes(muscleGroup)
            ) {
                return acc;
            }
            return { ...acc, [curr]: exercises[curr] };
        }, {});
        const filteredDataList = Object.keys(filteredObj);
        const filteredOppList = Object.keys(
            setType === "compound" ? accessoryExercises : compoundExercises
        ).filter((val) => !includedTracker.includes(val));

        let randomExercise =
            filteredDataList[
            Math.floor(Math.random() * filteredDataList.length)
            ] ||
            filteredOppList[
            Math.floor(Math.random() * filteredOppList.length)
            ];

        if (!randomExercise) {
            return {};
        }

        // Reps based on scheme
        let repsOrDuration =
            exercises[randomExercise].unit === "reps"
                ? repMin + Math.floor(Math.random() * (repMax - repMin + 1))
                : Math.floor(Math.random() * 40) + 20;

        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        if (exercises[randomExercise].unit === "reps") {
            const tempoSum = tempo
                .split(" ")
                .reduce((acc, curr) => acc + parseInt(curr), 0);
            if (tempoSum * parseInt(repsOrDuration) > 85) {
                repsOrDuration = Math.floor(85 / tempoSum);
            }
        } else {
            repsOrDuration = Math.ceil(parseInt(repsOrDuration) / 5) * 5;
        }
        includedTracker.push(randomExercise);

        return {
            name: randomExercise,
            tempo,
            rest: scheme.rest[setType === "compound" ? 0 : 1],
            reps: repsOrDuration,
            ...exercises[randomExercise],
        };
    });

    return genWOD.filter(
        (element) => Object.keys(element).length > 0
    );
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function exercisesFlattener(exercisesObj) {
    const flattenedObj = {}

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!("variants" in val)) {
            flattenedObj[key] = val
        } else {
            for (const variant in val.variants) {
                let variantName = variant + "_" + key
                let variantSubstitutes = Object.keys(val.variants).map((element) => {
                    return element + ' ' + key
                }).filter(element => element.replaceAll(' ', '_') !== variantName)

                flattenedObj[variantName] = {
                    ...val,
                    description: val.description + '___' + val.variants[variant],
                    substitutes: [
                        ...val.substitutes, variantSubstitutes
                    ].slice(0, 5)
                }
            }
        }
    }
    return flattenedObj
}