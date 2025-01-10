import {
	capitaliseFirstLetter,
	filterWorkoutByDay,
	getWorkoutTags,
} from "./exercises.js";
import { getCurrentDay } from "./utils.js";

/**
 * Creates a DOM element with optional class names.
 * @param {string} tagName - The tag name of the element.
 * @param {string} [className=""] - Optional class name for the element.
 * @returns {HTMLElement} The created DOM element.
 */
function buildElement(tagName, className = "") {
	const element = document.createElement(tagName);
	if (className.trim()) {
		element.className = className.trim();
	}
	return element;
}

/**
 * Creates a pill element for tags.
 * @param {string} tagText - The tag text.
 * @param {string} backgroundColor - Background color for the pill.
 * @param {string} color - Text color for the pill.
 * @returns {HTMLElement} The created pill element.
 */
function buildPill(tagText, backgroundColor = "lightgray", color = "black") {
	const pill = buildElement("li", "pill");
	pill.textContent = tagText;
	pill.style.backgroundColor = backgroundColor;
	pill.style.color = color;
	return pill;
}

/**
 * Builds a list of pills from a set of tags.
 * @param {Set<string>} tagSet - The set of tags.
 * @param {string} backgroundColor - Background color for the pills.
 * @param {string} color - Text color for the pills.
 * @returns {HTMLElement} The created list element.
 */
function buildListOfPills(tagSet, backgroundColor, color) {
	const list = buildElement("ul", "list-of-pills");
	for (const tag of tagSet) {
		list.appendChild(buildPill(tag, backgroundColor, color));
	}
	return list;
}

/**
 * Creates a heading element.
 * @param {string} text - The text for the heading.
 * @param {string} tagName - The heading tag (e.g., "h1", "h2").
 * @returns {HTMLElement} The created heading element.
 */
function buildHeading(text, tagName) {
	const heading = buildElement(tagName);
	heading.textContent = text;
	return heading;
}

/**
 * Creates a button element with optional text and an icon.
 *
 * @param {string} text - The text to display on the button.
 * @param {string} [iconName=""] - The name of the Material Icons icon to display on the button (optional).
 * @returns {HTMLButtonElement} The constructed button element.
 */
function buildButton(text, iconName = "") {
	const button = buildElement("button", "cta-button");
	const span = buildElement("span");
	span.textContent = text;
	button.appendChild(span);

	if (iconName.trim()) {
		const iconElement = buildElement("i", "material-icons");
		iconElement.textContent = iconName;
		iconElement.style.paddingLeft = "8px";
		button.appendChild(iconElement);
	}

	return button;
}

/**
 * Creates a link element with optional iconName and position.
 * @param {string} text - The link text.
 * @param {string} [iconName=""] - Optional iconName name.
 * @param {string} [className="cta-link"] - Optional class name for the link.
 * @param {string} [position="left"] - Position of the iconName ("left" or "right").
 * @param {string} [href="#"] - The link URL.
 * @returns {HTMLElement} The created link element.
 */
function buildLink(
	text,
	iconName = "",
	className = "cta-link",
	position = "left",
	href = "#"
) {
	const link = buildElement("a", className);
	const span = buildElement("span");
	span.textContent = text;

	if (iconName.trim() !== "") {
		const icon = buildElement("i", "material-icons");
		icon.textContent = iconName;

		if (position === "left") {
			link.appendChild(icon);
			link.appendChild(span);
		} else {
			link.appendChild(span);
			link.appendChild(icon);
		}
	}

	if (href.trim() !== "#") {
		link.setAttribute("href", href);
	}

	return link;
}

/**
 * Builds workout cards from a workout object.
 * @param {Object} workoutObj - The workout object.
 * @returns {HTMLElement[]} Array of workout card elements.
 */
function buildWorkoutCards(workoutObj) {
	return Object.values(workoutObj)
		.filter(
			(workout) =>
				workout && typeof workout === "object" && !Array.isArray(workout)
		)
		.map((workout) => {
			const card = buildElement("div", "workout-card");

			// Image section
			const cardImageSection = buildElement(
				"div",
				"workout-card-image-section"
			);
			const image = buildElement("img", "workout-card-image");
			image.src = workout.image;
			image.alt = workout.alt;
			cardImageSection.appendChild(image);

			// Details section
			const cardDetailsSection = buildElement(
				"div",
				"workout-card-details-section"
			);
			const title = buildHeading(workout.name, "h3");
			const description = buildElement("p", "workout-card-description");
			description.textContent = workout.description;

			cardDetailsSection.append(title, description);

			if (!workout.isReadOnly) {
				const link = buildLink("Add data", "add", "workout-card-link");
				cardDetailsSection.appendChild(link);
			}

			card.append(cardImageSection, cardDetailsSection);

			return card;
		});
}

/**
 * Builds the workout preview section.
 * @param {string} backgroundColor - Background color for the pills.
 * @param {string} color - Text color for the pills.
 * @returns {HTMLElement} The workout preview section.
 */
function buildWorkoutPreview(backgroundColor = "lightgray", color = "black") {
	const currentWorkout = filterWorkoutByDay(getCurrentDay());
	document.querySelector("html").dataset.page = "today";

	const section = buildElement("section", "workout-preview");
	const backgroundImage = buildElement(
		"div",
		"workout-preview-background-image"
	);
	backgroundImage.style.backgroundImage = `url(${currentWorkout.image})`;

	const overlay = buildElement("div", "overlay");
	const previewText = buildElement("div", "workout-preview-text");

	const title = buildHeading(currentWorkout.category, "h2");
	const tags = getWorkoutTags();
	const list = buildListOfPills(tags, backgroundColor, color);

	previewText.append(title, list);
	section.append(backgroundImage, overlay, previewText);

	return section;
}

/**
 * Builds the main workout page.
 * @returns {HTMLElement} The workout page section.
 */
function buildWorkoutPage() {
	const currentWorkout = filterWorkoutByDay(getCurrentDay());
	const section = buildElement("section", "workout-section");
	const sectionTitle = buildHeading("Workout", "h2");

	const cards = buildWorkoutCards(currentWorkout);

	section.append(createBackNavigation(), sectionTitle, ...cards);
	return section;
}

/**
 * Builds a form field with a label and an input element.
 *
 * @param {string[]} id - An array where the first element is the input's ID and the second is the label's text.
 * @param {string} [type="text"] - The type of the input field (e.g., "text", "number").
 * @returns {HTMLElement} A div element containing the label, input, and a line break.
 */
function buildFormField(id, text, type = "text") {
	const formField = buildElement("div", "form-field");

	const container = buildElement("div");

	const label = buildElement("label");
	label.for = id;
	label.textContent = capitaliseFirstLetter(text);

	const input = buildElement("input");
	input.id = id;
	input.type = type;

	if (type === "number") {
		input.min = 0;
		input.setAttribute("required", "true");
	}

	container.appendChild(label);
	formField.append(container, input, buildElement("br"));
	return formField;
}

/**
 * Creates a back navigation element containing a "Back" link.
 *
 * @returns {HTMLElement} The constructed back navigation element.
 */
function createBackNavigation() {
	const linkContainer = buildElement("div", "secondary-nav");
	const backLink = buildLink("Back", "keyboard_arrow_left");
	linkContainer.appendChild(backLink);

	return linkContainer;
}

/**
 * Builds a complete exercise page section with a title, form fields, and a save button.
 *
 * @param {string} title - The title of the exercise page.
 * @returns {HTMLElement} A section element containing the exercise page content.
 */
function buildExercisePage(title) {
	const DEFAULTS = {
		sets: { id: "sets", text: "sets" },
		repetitions: { id: "repetitions", text: "reps" },
		measurement: { id: "measurement", text: "meas" },
		unit: { id: "unit", text: "unit" },
	};

	const section = buildElement("section");
	const formElement = buildElement("form");
	const sectionTitle = buildHeading(title, "h2");

	// Create form fields
	const setsField = buildFormField(
		DEFAULTS.sets.id,
		DEFAULTS.sets.text,
		"number"
	);
	const repetitionsField = buildFormField(
		DEFAULTS.repetitions.id,
		DEFAULTS.repetitions.text,
		"number"
	);
	const measurementField = buildFormField(
		DEFAULTS.measurement.id,
		DEFAULTS.measurement.text,
		"number"
	);
	const unitField = buildFormField(DEFAULTS.unit.id, DEFAULTS.unit.text);

	// Create button
	const button = buildButton("Save data");

	formElement.append(
		sectionTitle,
		setsField,
		repetitionsField,
		measurementField,
		unitField,
		button
	);
	section.append(createBackNavigation(), formElement);

	return section;
}

/**
 * Creates a feedback bubble element with the specified text and styling class.
 *
 * @param {string} text - The text to display inside the feedback bubble.
 * @param {string} stylingClass - The CSS class to apply to the feedback bubble for styling.
 * @returns {HTMLElement} The constructed feedback bubble element.
 */
function buildFeedbackBubble(text, stylingClass) {
	const feedbackBubble = buildElement("div", "feedback-bubble");
	feedbackBubble.classList.add(stylingClass);
	const para = buildElement("p", "feedback-bubble-text");
	para.textContent = text;

	feedbackBubble.appendChild(para);

	return feedbackBubble;
}

/**
 * Creates a loading wheel element with an embedded GIF.
 *
 * @returns {HTMLElement} The constructed loading wheel element.
 */
function buildLoadingWheel() {
	const loadingWheel = buildElement("div", "loading-wheel");
	const gif = buildElement("img");
	gif.src = "./assets/media/gifs/loading.gif";
	loadingWheel.appendChild(gif);
	return loadingWheel;
}

function buildSummaryPage() {
	const section = buildElement("section", "summary-section");
	return section;
}

function buildBrowsePage() {
	const section = buildElement("section", "summary-section");
	return section;
}

export {
	buildLink,
	buildButton,
	buildListOfPills,
	buildElement,
	buildWorkoutPreview,
	buildWorkoutPage,
	buildWorkoutCards,
	buildExercisePage,
	buildFeedbackBubble,
	buildLoadingWheel,
	buildSummaryPage,
	buildBrowsePage,
};
