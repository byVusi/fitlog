import {
	buildWorkoutPreview,
	buildWorkoutPage,
	buildExercisePage,
	buildFeedbackBubble,
	buildLoadingWheel,
	buildSummaryPage,
	buildBrowsePage,
} from "./build.js";

/**
 * Updates the page state by setting the `data-page` attribute on the `<html>` element.
 * @param {string} state - The page state to set (e.g., "today", "workout").
 */
function setPageState(state) {
	document.querySelector("html").dataset.page = state;
}

/**
 * Handles the case where the main `<main>` tag is missing.
 * Logs an error and stops execution if the tag is not found.
 * @param {HTMLElement} MainTag - The main container element.
 * @param {string} err - The error message to log.
 */
function handleMissingMainTag(MainTag, err) {
	if (!MainTag) {
		console.error(err);
		return;
	}
}

/**
 * Renders a specific section of the page if it's not already present.
 * @param {string} state - The page state to set.
 * @param {HTMLElement} container - The main container where the content will be rendered.
 * @param {string} sectionSelector - A CSS selector for the section to check.
 * @param {HTMLElement} content - The content to render if the section is missing.
 */
function renderPageSection(state, container, sectionSelector, content) {
	setPageState(state);

	if (!container.querySelector(sectionSelector)) {
		container.innerHTML = "";
		container.appendChild(content);
	}
}

/**
 * Renders the workout preview page.
 */
function renderWorkoutPreview() {
	const mainTag = document.querySelector("main");
	handleMissingMainTag(mainTag, "Main container not found. Cannot render workout preview.");
	renderPageSection("today", mainTag, ".workout-preview", buildWorkoutPreview());
}

/**
 * Renders the workout details page.
 */
function renderWorkoutPage() {
	const mainTag = document.querySelector("main");
	handleMissingMainTag(mainTag, "Main container not found. Cannot render workout page.");
	renderPageSection("workout", mainTag, ".workout-section", buildWorkoutPage());
}

/**
 * Renders the exercise data entry page.
 * @param {string} workout - The name or identifier of the workout.
 */
function renderExercisePage(workout) {
	const mainTag = document.querySelector("main");
	handleMissingMainTag(mainTag, "Main container not found. Cannot render exercise data form.");
	renderPageSection("exercise", mainTag, ".exercise-data-form", buildExercisePage(workout));
}

/**
 * Renders the summary page.
 */
function renderSummaryPage() {
	const mainTag = document.querySelector("main");
	handleMissingMainTag(mainTag, "Main container not found. Cannot render summary page.");
	renderPageSection("summary", mainTag, ".summary-section", buildSummaryPage());
}

/**
 * Renders the browse page.
 */
function renderBrowsePage() {
	const mainTag = document.querySelector("main");
	handleMissingMainTag(mainTag, "Main container not found. Cannot render browse page.");
	renderPageSection("browse", mainTag, ".browse-section", buildBrowsePage());
}

/**
 * Renders a feedback bubble in the specified section.
 * Optionally removes an element before appending the feedback bubble.
 * @param {HTMLElement} section - The container where the feedback bubble will be appended.
 * @param {string} text - The feedback text to display.
 * @param {string} feedbackType - The feedback type (e.g., "success", "error").
 * @param {string} [removeItem=""] - A CSS selector for an element to remove before rendering the bubble.
 */
function renderFeedbackBubble(section, text, feedbackType, removeItem = "") {
	if (removeItem) {
		document.querySelector(removeItem).remove();
	}
	const feedbackBubble = buildFeedbackBubble(text, feedbackType);
	section.appendChild(feedbackBubble);
}

/**
 * Renders a loading wheel in the specified section.
 * Removes an element before appending the loading wheel.
 * @param {HTMLElement} section - The container where the loading wheel will be appended.
 * @param {string} removeItem - A CSS selector for an element to remove before rendering the loading wheel.
 */
function renderLoadingWheel(section, removeItem) {
	document.querySelector(removeItem).remove();
	const loadingWheel = buildLoadingWheel();
	section.appendChild(loadingWheel);
}

export {
	renderWorkoutPreview,
	renderWorkoutPage,
	renderExercisePage,
	renderFeedbackBubble,
	renderLoadingWheel,
	renderSummaryPage,
	renderBrowsePage,
};
