<script lang="ts">
	import PomodoroTimer from './PomodoroTimer.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
</script>

<svelte:head>
	<title>Pomodoro Timer</title>
</svelte:head>
<div class="wrapper">
	<nav class="navbar">
		<h1 class="logo">Pomodoro Timer</h1>
		<ThemeSwitcher />
	</nav>

	<main>
		<PomodoroTimer />
	</main>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Inter', system-ui, sans-serif;
		width: 100%;
		overflow: auto;
	}

	.navbar {
		display: flex;
		align-items: center; /* Vertically centers the items */
		justify-content: space-between; /* Pushes Logo left, Switcher right */
		padding: 1rem 2rem;
		margin-bottom: 100px;
		transition: background-color 0.3s ease;
	}

	.logo {
		margin: 0;
		font-size: 1.5rem;
		color: var(--foreground);
	}
</style>
