<script lang="ts">
	import { Play, Pause, RotateCcw } from '@lucide/svelte';
	import { createTimer, TIME_OPTIONS } from './Timer.svelte.ts';

	let timer = createTimer();
</script>

<div class="pomodoro-container">
	<div class="tabs-container">
		{#each TIME_OPTIONS as opt (opt)}
			<button
				onclick={() => timer.set(opt)}
				type="button"
				class="tab-btn"
				class:active={timer.startMinutes === opt}>{opt} min</button
			>
		{/each}
	</div>
	<h1 class="timer-display">{timer.displayTime}</h1>
	<div class="controls">
		<button onclick={timer.toggle} type="button" class="primary-btn">
			{#if timer.isRunning}
				<Pause /> Pause
			{:else}
				<Play /> Start
			{/if}
		</button>
		<button onclick={timer.reset} type="button" class="secondary-btn">
			<RotateCcw /> Reset
		</button>
	</div>
</div>

<style>
	.pomodoro-container {
		display: flex;
		flex-direction: column;
		width: 520px;
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
		background-color: var(--secondary);
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
		background-color: var(--background);
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
