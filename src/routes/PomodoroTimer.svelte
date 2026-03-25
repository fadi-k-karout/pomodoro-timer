<script lang="ts">
	let startMinutes: number = 25;
	let seconds: number = $state(60 * startMinutes);
	let isRunning: boolean = $state(false);
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
</script>

<div class="pomodoro-container">
	<h1 class="timer-display">{displayTime}</h1>
	<div class="controls">
		<button onclick={toggleTimer} class="primary-btn"> {isRunning ? 'Pause' : 'Start'}</button>
		<button onclick={resetTimer} class="secondary-btn">Reset</button>
	</div>
</div>

<style>
	.pomodoro-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 450px;
		padding: 3rem;
		background-color: var(--card);
		border: 1px solid var(--border);
		border-radius: calc(var(--radius) * 2);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
	}
	.timer-display {
		font-size: 6rem;
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
		padding: 12px 32px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.1s;
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
