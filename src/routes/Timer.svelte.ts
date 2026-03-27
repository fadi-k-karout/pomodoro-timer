import { untrack } from 'svelte';

export const TIME_OPTIONS = [15, 25, 45] as const;
export type TimeOption = (typeof TIME_OPTIONS)[number];
export function createTimer(initialMinutes: TimeOption = 25) {
	let startMinutes = $state(initialMinutes);
	let isRunning = $state(false);
	let elapsedSeconds = $state(0);

	const totalSeconds = $derived(startMinutes * 60);
	const remainingSeconds = $derived(Math.max(0, totalSeconds - elapsedSeconds));

	const displayTime = $derived.by(() => {
		const mins = Math.floor(remainingSeconds / 60);
		const secs = remainingSeconds % 60;
		return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
	});

	// The main effect that manages the timer's ticking logic.
	$effect(() => {
		if (!isRunning) return;

		const isTimeOver = remainingSeconds <= 0;
		if (isTimeOver) {
			isRunning = false;
			alert('Time is up!');
			return;
		}

		const id = setInterval(() => {
			// We use untrack so the effect doesn't re-run
			// every time elapsedSeconds changes.
			untrack(() => elapsedSeconds++);
		}, 1000);
		return () => clearInterval(id);
	});

	return {
		/** * The initial duration in minutes set for this timer session.
		 * Updating this will reset the countdown logic.
		 * @readonly
		 */
		get startMinutes() {
			return startMinutes;
		},

		/** * A reactive string formatted as `mm:ss` for UI display.
		 * Automatically handles padding for single-digit values.
		 * @example "25:00", "09:59"
		 */
		get displayTime() {
			return displayTime;
		},

		/** * Current execution state of the timer.
		 * `true` if the countdown is actively ticking.
		 */
		get isRunning() {
			return isRunning;
		},

		/** * A normalized value representing elapsed time.
		 * @returns A float between `0` (start) and `1` (finished).
		 * Useful for SVG circular loaders or progress bars.
		 */
		get progress() {
			return elapsedSeconds / totalSeconds;
		},

		/** * Starts or pauses the timer based on the current **isRunning** state.
		 * Internal effects handle the interval cleanup automatically when paused.
		 */
		toggle: () => {
			isRunning = !isRunning;
		},

		/** * Halts the timer and returns **elapsedSeconds** to 0.
		 * Does not change the **startMinutes** configuration.
		 */
		reset: () => {
			isRunning = false;
			elapsedSeconds = 0;
		},

		/** * Reconfigures the timer with a new preset duration.
		 * Automatically stops the current timer and resets progress to 0.
		 * @param mins - A valid duration from the **TimeOption** type.
		 */
		set: (mins: TimeOption) => {
			startMinutes = mins;
			elapsedSeconds = 0;
			isRunning = false;
		}
	};
}
