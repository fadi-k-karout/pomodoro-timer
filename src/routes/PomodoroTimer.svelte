<script lang="ts">
	import { Play, Pause, RotateCcw } from '@lucide/svelte';
	const TIME_OPTIONS = [15, 25, 45] as const;
	type TimeOption = (typeof TIME_OPTIONS)[number];
	let startMinutes = $state(25);
	let seconds = $derived(60 * startMinutes);
	let isRunning = $state(false);
	let intervalId: number | undefined;

	const displayTime = $derived.by(() => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
	});

	$effect(() => {
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});

	function toggleTimer() {
		clearInterval(intervalId);
		isRunning = !isRunning;

		if (isRunning) {
			intervalId = window.setInterval(() => {
				if (seconds > 0) {
					seconds -= 1;
				} else {
					stop();
					alert('Time is up');
				}
			}, 1000);
		} else {
			clearInterval(intervalId);
		}
	}

	function stop() {
		isRunning = false;
		clearInterval(intervalId);
	}

	function resetTimer() {
		stop();
		seconds = 60 * startMinutes;
	}

	/**
	 * Sets the timer duration.
	 * @param minutes - The duration in minutes.
	 */
	function setTimer(minutes: TimeOption) {
		if (!TIME_OPTIONS.includes(minutes)) return;
		if (startMinutes === minutes) return; // No change needed

		stop();
		startMinutes = minutes;
	}
</script>

<div class="pomodoro-container">
	<div class="tabs-container">
		{#each TIME_OPTIONS as minutes (minutes)}
			<button
				onclick={() => setTimer(minutes)}
				type="button"
				class="tab-btn"
				class:active={startMinutes === minutes}>{minutes} min</button
			>
		{/each}
	</div>
	<h1 class="timer-display">{displayTime}</h1>
	<div class="controls">
		<button onclick={toggleTimer} type="button" class="primary-btn">
			{#if isRunning}
				<Pause /> Pause
			{:else}
				<Play /> Play
			{/if}
		</button>
		<button onclick={resetTimer} class="secondary-btn">
			<RotateCcw /> Reset
		</button>
	</div>
</div>

<style>
	.pomodoro-container {
		display: flex;
		flex-direction: column;
		max-width: 100%;
		align-items: center;
		padding: 3rem;
		background-color: var(--card);
		border: 1px solid var(--border);
		border-radius: calc(var(--radius) * 2);
		box-sizing: border-box;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}
	.tabs-container {
		display: flex;
		background-color: var(--secondary); /* A muted light gray/offset color */
		padding: 4px;
		border-radius: var(--radius);
		gap: 4px;
		margin-bottom: 2rem;
	}

	.tab-btn {
		flex: 1;
		padding: 8px 16px;
		border: none;
		background: transparent;
		color: var(--secondary-foreground);
		font-weight: 500;
		cursor: pointer;
		border-radius: calc(var(--radius) - 2px);
		transition: all 0.1s ease;
	}

	.tab-btn.active {
		background-color: var(--background); /* Matches the card/page background */
		color: var(--primary);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.tab-btn:hover:not(.active) {
		background-color: var(--muted-background);
		color: var(--muted-foreground);
	}

	.timer-display {
		color: var(--foreground);
		font-size: clamp(3rem, 10vw, 6rem);
		font-weight: 800;
		font-variant-numeric: tabular-nums; /* Prevents text jumping while counting */
		margin: 0;
		letter-spacing: -2px;
	}

	.controls {
		margin-top: 3rem;
		display: flex;
		gap: 15px;
	}

	.primary-btn,
	.secondary-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;

		padding: 10px 30px;
		font-size: 1.1rem;
		font-weight: 600;

		border-radius: 999px;
		border: 2px solid transparent;

		cursor: pointer;
		transition: all 0.2s ease;
		user-select: none;
	}

	.primary-btn {
		background-color: var(--primary);
		color: var(--primary-foreground);
		border: 1px solid var(--primary-border);
		border-radius: var(--radius);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.primary-btn:active {
		transform: scale(0.95);
	}

	.secondary-btn {
		background-color: var(--secondary);
		color: var(--secondary-foreground);
		border: 1px solid var(--secondary-border);
		border-radius: var(--radius);
	}
</style>
