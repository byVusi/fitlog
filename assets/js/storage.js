import { isExerciseInProgram } from "./utils.js";

/**
 * Creates and stores a new exercise record.
 * @param {string} name - The name of the exercise.
 * @param {number} sets - The number of sets performed.
 * @param {number[]} repetitions - An array of repetitions for each set.
 * @param {number} magnitude - The weight or resistance used in the exercise.
 * @param {string} [measurement="kg"] - The unit of measurement for the magnitude (e.g., "kg", "lbs").
 * @throws Will log and rethrow any validation or storage errors encountered during the process.
 */
export function createExerciseRecord(
	name,
	sets,
	repetitions,
	measurement,
	unit = "kg"
) {
	try {
		// Validate input
		validateExerciseRecordInput(name, sets, repetitions, measurement, unit);

		// Extract, update and store the record
		const storedExerciseRecord = extractExerciseRecord(name);

		storedExerciseRecord.push({
			date: new Date().toISOString(),
			sets: sets,
			repetitions: repetitions,
			measurement: measurement,
			unit: unit,
		});

		storeExerciseRecord(name, storedExerciseRecord);
	} catch (error) {
		console.error("Error creating a new record entry:", error);
	}
}

/**
 * Retrieves an exercise record from localStorage.
 * @param {string} name - The name of the exercise.
 * @returns {Object[]} - An array of stored records for the exercise.
 */
function extractExerciseRecord(name) {
	const record = safelyAccessLocalStorage("get", name);
	if (!record) {
		console.warn(
			`No record found for exercise "${name}". Initialising a new record.`
		);
		return [];
	}
	return record;
}

/**
 * Stores an exercise record in localStorage.
 * @param {string} name - The name of the exercise.
 * @param {Object[]} record - The record array to store.
 */
function storeExerciseRecord(name, record) {
	safelyAccessLocalStorage("set", name, record);
}

/**
 * Safely interacts with localStorage for getting or setting data.
 * @param {"get"|"set"} action - The action to perform ("get" or "set").
 * @param {string} key - The key to access in localStorage.
 * @param {Object|null} [value=null] - The value to set (only required for "set" action).
 * @returns {Object[]|void} - Returns the stored data when using "get", otherwise void.
 * @throws Will throw an error if the localStorage operation fails.
 */
function safelyAccessLocalStorage(action, key, value = null) {
	checkAvailabilityOfLocalStorage();
	try {
		if (action === "get") return JSON.parse(localStorage.getItem(key)) || [];
		if (action === "set") localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(`Error during ${action} operation for key "${key}":`, error);
		throw new Error(`Failed to ${action} data for key: ${key}`);
	}
}

/**
 * Validates the inputs for an exercise record.
 * @param {string} name - The name of the exercise.
 * @param {number} sets - The number of sets performed.
 * @param {number[]} repetitions - An array of repetitions for each set.
 * @param {number} magnitude - The weight or resistance used.
 * @param {string} measurement - The unit of measurement (e.g., "kg", "lbs").
 * @throws Will throw an error if any of the inputs are invalid.
 */
function validateExerciseRecordInput(
	name,
	sets,
	repetitions,
	measurement,
	unit
) {
	if (!name) throw new Error("Exercise name is required.");
	if (typeof sets !== "number") throw new Error("Sets must be a number.");

	// Change later to array, so each value can represent the reps for each set
	if (typeof repetitions !== "number")
		throw new Error("Repetitions must be a number.");

	// The code below must be uncommented once typeof repetitions has been changed to array
	// if (!repetitions.every((rep) => typeof rep === "number")) {
	// 	throw new Error("Each repetition must be a number.");
	// }

	if (typeof measurement !== "number")
		throw new Error("Measurement must be a number.");
	if (typeof unit !== "string") throw new Error("Unit must be a string.");

	if (!isExerciseInProgram(name)) {
		throw new Error(`Exercise "${name}" does not exist in the GYM_PROGRAM.`);
	}
}

/**
 * Checks if localStorage is available in the current environment.
 * @throws Will throw an error if localStorage is not available.
 */
function checkAvailabilityOfLocalStorage() {
	if (typeof localStorage === "undefined") {
		throw new Error("LocalStorage is not available. Data will not persist.");
	}
}
