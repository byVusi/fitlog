import { capitaliseFirstLetter } from "./exercises.js";
import {
	renderExercisePage,
	renderWorkoutPage,
	renderWorkoutPreview,
	renderFeedbackBubble,
	renderLoadingWheel,
	renderSummaryPage,
	renderBrowsePage,
} from "./render.js";

import { createExerciseRecord } from "./storage.js";
import { extractFormInputValues } from "./utils.js";

/**
 * Renders a page based on its name.
 * @param {string} pageName - The name of the page to render.
 */
function renderPageByName(pageName) {
	switch (pageName) {
		case "today":
			renderWorkoutPreview();
			break;
		case "summary":
			renderSummaryPage();
			break;
		case "browse":
			renderBrowsePage();
			break;
		default:
			console.warn(`Unknown page: ${pageName}`);
	}
}

/**
 * Handles the "Start Workout" click event.
 * Triggers the rendering of the full workout page.
 *
 * @function
 */
function handleStartWorkoutClick() {
	renderWorkoutPage();
}

/**
 * Handles navigation back from the current page.
 * @param {string} currentPage - The current page identifier.
 */
function handleBackNavigation(currentPage) {
	if (currentPage === "workout") renderWorkoutPreview();
	else if (currentPage === "exercise") renderWorkoutPage();
}

/**
 * Handles adding data for a workout.
 * @param {string} workout - The workout identifier.
 */
function handleAddData(workout) {
	renderExercisePage(workout);
}

/**
 * Handles saving exercise data.
 */
function handleSaveData() {
	const section = document.querySelector("main section:first-of-type");
	const exerciseName = document.querySelector("form h2").textContent;
	const values = extractFormInputValues();

	if (values.length === 4) {
		createExerciseRecord(exerciseName, ...values);
		renderLoadingWheel(section, ".cta-button");

		setTimeout(() => {
			renderFeedbackBubble(
				section,
				"Data has been successfully saved",
				"success",
				".loading-wheel"
			);
		}, 1000);

		setTimeout(() => {
			renderWorkoutPage();
		}, 3000);
	} else {
		renderFeedbackBubble(
			section,
			"Please fill in all the required fields",
			"danger"
		);
		setTimeout(() => {
			renderExercisePage(exerciseName);
		}, 2000);
	}
}

/**
 * Handles click events in the main section based on the current page.
 * @param {Event} event - The click event object.
 */
function handleMainClick(event) {
	const page = document.querySelector("html").dataset.page;
	const target = event.target.closest(
		".workout-card-link, .cta-link, .cta-button, .workout-preview"
	);

	if (!target) return;

	if (target.classList.contains("workout-card-link") && page === "workout") {
		handleAddData(
			target.closest(".workout-card-link").parentNode.childNodes[0].textContent
		);
	} else if (target.classList.contains("cta-link")) {
		handleBackNavigation(page);
	} else if (target.classList.contains("cta-button")) {
		event.preventDefault();
		handleSaveData();
	} else if (
		target.classList.contains("workout-preview") &&
		target.querySelector("h2").textContent !== "Rest Day"
	) {
		handleStartWorkoutClick();
	} else if (
		target.classList.contains("workout-preview") &&
		target.querySelector("h2").textContent === "Rest Day"
	) {
		renderFeedbackBubble(
			document.querySelector("main"),
			"No workout scheduled today",
			"info"
		);
		setTimeout(() => {
			document.querySelector(".feedback-bubble").remove();
		}, 2000);
	}
}

/**
 * Handles navigation clicks and updates the page view.
 */
function handleNavigationClick(event) {
	const target = event.target.closest(".navigation div");
	if (!target) return;

	// Update active navigation styling
	document
		.querySelectorAll(".navigation div")
		.forEach((navItem) => navItem.classList.remove("active"));
	target.classList.add("active");

	// Render the selected page
	const pageName = target.querySelector("span").textContent.toLowerCase();
	renderPageByName(pageName);

	// Update page heading
	document.querySelector("html").dataset.page = pageName;
	document.querySelector("header h1").textContent =
		capitaliseFirstLetter(pageName);
}

/**
 * Sets up event listeners for the application.
 */
function setupEventListeners() {
	document.querySelector("main").addEventListener("click", handleMainClick);
	document
		.querySelector(".navigation")
		.addEventListener("click", handleNavigationClick);
}

export { setupEventListeners };
