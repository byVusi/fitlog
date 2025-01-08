import { validExerciseNames } from "./exercises.js";
/**
 * Checks if a given exercise name is included in the program's valid exercises.
 * @param {string} name - The name of the exercise to check.
 * @returns {boolean} - Returns `true` if the exercise is in the program, otherwise `false`.
 */
function isExerciseInProgram(name) {
	return validExerciseNames.has(name);
}

/**
 * Creates a deep copy of a given object.
 * @param {Object} obj - The object to clone.
 * @returns {Object} - A deep copy of the original object.
 */
function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}

/**
 * Gets the current day of the week as a string.
 * @returns {string} - The current day of the week (e.g., "Monday").
 */
function getCurrentDay() {
	const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return daysOfTheWeek[new Date().getDay()];
}

/**
 * Extracts and processes input values from a form.
 *
 * - Collects all input values from the form.
 * - Includes only required inputs with non-empty, trimmed values.
 * - Converts numeric input values to numbers.
 * - Adds a unit value (defaulting to "kg" if not provided) at the end of the array.
 *
 * @returns {Array<(number|string)>} An array of processed input values.
 * The first values are numeric, followed by the unit as a string (e.g., "kg").
 */
function extractFormInputValues() {
	const inputValues = document.querySelectorAll("form input");
	const arr = [];
	for (const input of inputValues) {
		if (input.required && input.value && input.value.trim() !== "") {
			arr.push(Number(input.value));
		}
	}

	const unit = inputValues[3];

	if (unit && unit.value.trim() !== "") {
		arr.push(unit.value);
	} else {
		arr.push("kg");
	}
	return arr;
}

export { isExerciseInProgram, cloneObject, getCurrentDay, extractFormInputValues };
