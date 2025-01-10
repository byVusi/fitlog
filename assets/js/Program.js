import { cloneObject } from "./utils.js";

// Constants for commonly used details
const TAGS = {
	PUSH: "push",
	PULL: "pull",
	LEGS: "legs",
	CORE: "core",
	RECOVERY: "recovery",
	CHEST: "chest",
	SHOULDERS: "shoulders",
	TRICEPS: "triceps",
	BACK: "back",
	CARDIO: "cardio",
	FULL_BODY: "full body",
	DUMBBELL: "dumbbell",
	BARBELL: "barbell",
	BENCH: "bench",
	GLUTES: "glutes",
	QUADS: "quads",
	MACHINE: "machine",
	CALVES: "calves",
	BICEPS: "biceps",
	CURLS: "curls",
	CABLES: "cables",
};

const COMMON_IMAGES = {
	WARM_UP: "./assets/media/images/cycling-sq.jpg",
	REST_DAY: "./assets/media/images/rest-day.jpg",
};

const COMMON_DESCRIPTIONS = {
	WARM_UP: "5-10 minutes light cardio or dynamic stretches",
	REST_DAY: "Recovery, light walking, or stretching",
};

/**
 * Creates a warm-up entry.
 * @param {string} description - Warm-up description.
 * @returns {Object} Warm-up exercise entry.
 */
function createWarmUp(description = COMMON_DESCRIPTIONS.WARM_UP, tags = []) {
	return {
		name: "Warm up",
		image: COMMON_IMAGES.WARM_UP,
		alt: "Woman on a stationary bike",
		isReadOnly: true,
		description,
		tags,
	};
}

/**
 * Creates an exercise entry.
 * @param {string} name - Name of the exercise.
 * @param {string} image - Image URL.
 * @param {string} description - Description of the exercise (e.g., sets and reps).
 * @param {Array<string>} tags - Tags associated with the exercise.
 * @returns {Object} Exercise entry.
 */
function createExercise(name, image, alt, description, tags = []) {
	return {
		name,
		image,
		alt,
		isReadOnly: false,
		description,
		record: [],
		tags,
	};
}

/**
 * Creates a rest day entry.
 * @param {string} description - Description of the rest day.
 * @returns {Object} Rest day entry.
 */
function createRestDay(description = COMMON_DESCRIPTIONS.REST_DAY) {
	return {
		image: COMMON_IMAGES.REST_DAY,
		alt: "Woman stretching whilst in bed",
		type: "Rest",
		category: "Rest Day",
		isReadOnly: true,
		description,
		record: [],
		tags: [TAGS.RECOVERY, "light activity", "rest"],
	};
}

/**
 * Represents the gym program for the week, organised by day.
 * Each day contains information about its category, type, associated exercises, and other relevant details.
 * @constant
 * @type {Object}
 * @property {Object} monday - The program for Monday, focused on upper body push exercises.
 * @property {Object} tuesday - The program for Tuesday, focused on lower body exercises.
 * @property {Object} wednesday - The program for Wednesday, a rest day with light activity recommendations.
 * @property {Object} thursday - The program for Thursday, focused on upper body pull exercises.
 * @property {Object} friday - The program for Friday, focused on cardio and core exercises.
 * @property {Object} saturday - The program for Saturday, focused on functional training and HIIT.
 * @property {Object} sunday - The program for Sunday, another rest day with recovery activities.
 */
const GYM_PROGRAM = {
	monday: {
		image: "./assets/media/images/overhead-press.jpg",
		alt: "Man doing overhead presses with dumbbells",
		type: "Training",
		category: "Upper Body - Push",
		warmUp: createWarmUp(),
		barbellBenchPress: createExercise(
			"Barbell Bench Press",
			"./assets/media/images/barbell-bench-press-sq.jpg",
			"Man doing barbell bench presses",
			"4 sets x 8-10 reps",
			[TAGS.CHEST, TAGS.BARBELL, TAGS.BENCH, TAGS.PUSH]
		),
		inclineDumbbellPress: createExercise(
			"Incline Dumbbell Press",
			"./assets/media/images/incline-bench-press-sq.jpg",
			"Man doing an incline dumbbell press ",
			"3 sets x 10-12 reps",
			[TAGS.CHEST, TAGS.DUMBBELL, TAGS.BENCH, TAGS.PUSH]
		),
		overheadShoulderPress: createExercise(
			"Overhead Shoulder Press",
			"./assets/media/images/overhead-press-sq.jpg",
			"Man doing overhead shoulder press",
			"3 sets x 8-10 reps",
			[TAGS.SHOULDERS, TAGS.BARBELL, TAGS.BENCH, TAGS.PUSH]
		),
		tricepDips: createExercise(
			"Tricep Dips",
			"./assets/media/images/tricep-dips-sq.jpg",
			"Man doing tricep dips",
			"3 sets to failure",
			[TAGS.TRICEPS, TAGS.PUSH]
		),
		plank: createExercise(
			"Plank",
			"./assets/media/images/plank-sq.jpg",
			"Woman and man doing planks next to each other",
			"3 sets x 30-60 seconds",
			[TAGS.CORE]
		),
	},
	tuesday: {
		image: "./assets/media/images/deadlifts.jpg",
		alt: "Man doing deadlifts",
		type: "Training",
		category: "Lower Body",
		warmUp: createWarmUp(),
		barbellSquats: createExercise(
			"Barbell Squats",
			"./assets/media/images/barbell-squats-sq.jpg",
			"Man doing barbell squats",
			"4 sets x 8-10 reps",
			[TAGS.LEGS, TAGS.GLUTES, TAGS.BARBELL, TAGS.PUSH]
		),
		deadlifts: createExercise(
			"Deadlifts",
			"./assets/media/images/deadlifts-sq.jpg",
			"Man doing deadlifts",
			"3 sets x 10-12 reps",
			[TAGS.LEGS, TAGS.GLUTES, TAGS.BARBELL, TAGS.PULL]
		),
		walkingLunges: createExercise(
			"Walking Lunges",
			"./assets/media/images/walking-lunges-sq.jpg",
			"Woman doing walking lunges",
			"3 sets x 12-15 steps per leg",
			[TAGS.LEGS, TAGS.QUADS, TAGS.DUMBBELL, TAGS.PUSH]
		),
		legPress: createExercise(
			"Leg Press",
			"./assets/media/images/legpress-sq.jpg",
			"Man doing legpresses on a machine",
			"3 sets x 10-12 reps",
			[TAGS.LEGS, TAGS.GLUTES, TAGS.MACHINE, TAGS.PUSH]
		),
		calfRaises: createExercise(
			"Calf Raises",
			"./assets/media/images/calf-raises-sq.jpg",
			"Calves as they are busy doing calf raises",
			"4 sets x 15-20 reps",
			[TAGS.LEGS, TAGS.CALVES, TAGS.MACHINE, TAGS.PUSH]
		),
	},
	wednesday: createRestDay(),
	thursday: {
		image: "./assets/media/images/pullups.jpeg",
		alt: "Man doing pull ups",
		type: "Training",
		category: "Upper Body - Pull",
		warmUp: createWarmUp(),
		pullUps: createExercise(
			"Pull Ups",
			"./assets/media/images/pullups-sq.jpeg",
			"Man doing pull ups",
			"3 sets x 10-12 reps",
			[TAGS.BACK, TAGS.LATTS, TAGS.PULL]
		),
		dumbbellRows: createExercise(
			"Dumbbell Rows",
			"./assets/media/images/dumbbell-rows-sq.jpg",
			"Man doing dumbbell rows",
			"3 sets x 8-10 reps",
			[TAGS.BACK, TAGS.LATTS, TAGS.DUMBBELL, TAGS.BENCH, TAGS.PULL]
		),
		dumbbellBicepCurls: createExercise(
			"Dumbbell Bicep Curls",
			"./assets/media/images/bicep-curls-sq.jpg",
			"Man sitting down doing dumbbell bicep curls",
			"3 sets x 12-15 reps",
			[TAGS.BICEPS, TAGS.CURLS, TAGS.DUMBBELL, TAGS.PULL]
		),
		facePulls: createExercise(
			"Face Pulls",
			"./assets/media/images/face-pulls-sq.jpg",
			"Man doing face pulls on the machine",
			"3 sets x 10-12 reps",
			[TAGS.BACK, TAGS.MACHINE, TAGS.CABLES, TAGS.PULL]
		),
	},
	friday: {
		image: "./assets/media/images/cardio.jpg",
		alt: "Man running down the road",
		type: "Training",
		category: "Cardio and Core",
		lightCardio: createWarmUp(
			"30-40 minutes steady-state cardio (e.g., treadmill incline walk or cycling)",
			[TAGS.CARDIO]
		),
		legRaises: createExercise(
			"Leg Raises",
			"./assets/media/images/leg-raises-sq.jpg",
			"Woman lying down on a mat and doing leg raises",
			"3 sets x 12-15 reps",
			[TAGS.CORE]
		),
		russianTwists: createExercise(
			"Russian Twists",
			"./assets/media/images/russian-twists-sq.jpeg",
			"Woman doing russian twist with a medicine ball",
			"3 sets x 20 twists (with or without weight)",
			[TAGS.CORE, "medicine ball", TAGS.PULL]
		),
		sidePlanks: createExercise(
			"Side Planks",
			"./assets/media/images/side-plank-sq.jpg",
			"Man doing side planks on a mat",
			"2 sets x 30-45 seconds (each side)",
			[TAGS.CORE, "obliques"]
		),
	},
	saturday: {
		image: "./assets/media/images/push-ups.jpg",
		alt: "Woman doing push ups",
		type: "Training",
		category: "Functional and HIIT",
		warmUp: createWarmUp(),
		hiit: createExercise(
			"HIIT",
			"./assets/media/images/kettlebell-swings-sq.jpg",
			"Man doing kettlebell swings",
			"Repeat 3 rounds, 20 seconds work, 20 seconds rest): Burpees, Kettlebell Swings, Jump Squats, Push-ups, Mountain Climbers",
			["HIIT", "functional", TAGS.FULL_BODY, "kettlebells", "jumping"]
		),
		coolDown: createExercise(
			"Cool Down",
			"./assets/media/images/cool-down-sq.jpg",
			"Woman stretching on the mat",
			"10 minutes light walking and stretching"
		),
	},
	sunday: createRestDay(),
};

/**
 * A cloned version of the `GYM_PROGRAM` object.
 * This ensures immutability of the original program by creating a deep copy.
 * @constant
 * @type {Object}
 */
const clonedProgram = cloneObject(GYM_PROGRAM);

export default clonedProgram;
