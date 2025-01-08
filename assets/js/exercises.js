import clonedProgram from "./Program.js";
import { getCurrentDay } from "./utils.js";

/**
 * Retrieves all exercises from the cloned program.
 * Filters through each training day and collects exercises with a defined name.
 *
 * @returns {object[]} A list of all exercise objects from the program.
 */
function getAllExercises() {
	const exercises = [];
	for (const day of Object.values(clonedProgram)) {
		if (day.type === "Training") {
			exercises.push(...Object.values(day).filter((item) => item.name));
		}
	}
	return exercises;
}

// Create a set of all exercise names (for reference)
const validExerciseNames = new Set();

/**
 * Populates the `validExerciseNames` set with the names of all exercises in the program.
 * Iterates through each training day and extracts the exercise names.
 */
function populateValidExerciseNames() {
	for (const day of Object.values(clonedProgram)) {
		// Skip days without exercises
		if (day.type !== "Training") continue;

		// Iterate over the values of the day's object
		for (const exercise of Object.values(day)) {
			if (exercise?.name) {
				validExerciseNames.add(exercise.name);
			}
		}
	}
}
populateValidExerciseNames();

/**
 * Filters and retrieves the workout details for a specific day.
 * Throws an error if the day does not exist in the program.
 *
 * @param {string} day - The name of the day to retrieve the workout for (e.g., "monday").
 * @returns {Object} The workout object for the specified day.
 * @throws {Error} Throws an error if the day does not exist in the program.
 */
function filterWorkoutByDay(day) {
	const lowerCaseDay = day.toLowerCase().trim();
	if (!clonedProgram[lowerCaseDay]) {
		throw new Error(`Day "${day}" does not exist in the program.`);
	}

	return clonedProgram[day.toLowerCase()];
}

/**
 * Retrieves the tags associated with the current day's workout.
 * Includes tags from rest days and the first tag of each exercise for training days.
 *
 * @returns {Set<string>} A set of unique, capitalised tags for the day's workout.
 */
function getWorkoutTags() {
	const tagSet = new Set();
	const workout = filterWorkoutByDay(getCurrentDay());

	if (!workout) {
		console.warn("No workout found for the day.");
		return tagSet;
	}

	// Handle rest days
	if (
		workout.type !== "Training" &&
		workout.tags &&
		Array.isArray(workout.tags)
	) {
		for (const tag of workout.tags) {
			tagSet.add(capitaliseFirstLetter(tag));
		}
	}

	if (workout.type === "Training") {
		for (const key in workout) {
			const exercise = workout[key]; // Access the actual exercise object
			if (
				exercise?.tags &&
				Array.isArray(exercise.tags) &&
				exercise.tags.length > 0
			) {
				tagSet.add(capitaliseFirstLetter(exercise.tags[0])); // Add only the first tag
			}
		}
	}

	return tagSet;
}

/**
 * Capitalises the first letter of a word and converts the rest to lowercase.
 *
 * @param {string} word - The word to capitalise.
 * @returns {string} The word with the first letter capitalised.
 */
function capitaliseFirstLetter(word) {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export {
	getAllExercises,
	validExerciseNames,
	filterWorkoutByDay,
	getWorkoutTags,
	capitaliseFirstLetter,
};
