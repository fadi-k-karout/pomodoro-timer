<script lang="ts">
	import PomodoroTimer from './PomodoroTimer.svelte';
</script>

<svelte:head>
	<title>Pomodoro Timer</title>
</svelte:head>
<main>
	<PomodoroTimer />
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 95vh;
		background-color: var(--background);
		font-family: 'Inter', system-ui, sans-serif;
	}
</style>  
