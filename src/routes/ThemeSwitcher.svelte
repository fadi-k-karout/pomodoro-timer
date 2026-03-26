<script>
	import { Sun, MoonStar } from '@lucide/svelte';
	let isDark = $state(false);

	// Initialize from localStorage or System Preference
	$effect(() => {
		const savedTheme = localStorage.getItem('theme');
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
	});

	// Update the DOM and LocalStorage whenever isDark changes
	$effect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	});

	function toggle() {
		isDark = !isDark;
	}
</script>

<div class="tooltip">
	<button onclick={toggle} type="button" aria-label="Toggle Theme">
		{#if isDark}
			<MoonStar />
		{:else}
			<Sun />
		{/if}
	</button>
	<span class="tooltiptext">{isDark ? 'Switch To Light' : 'Switch To Dark'}</span>
</div>

<style>
	button {
		display: flex; 
		align-items: center;
		justify-content: center;
		padding: 0.8rem; 
		cursor: pointer;
		border-radius: 999px; 
		border: 1px solid var(--text-color);
		background: var(--bg-color);
		color: var(--text-color);
		transition: all 0.2s ease;
	}

	.tooltip {
		position: relative;
		display: inline-block;
		cursor: pointer;
	}

	.tooltiptext {
		visibility: hidden;
		width: 130px;
		background-color: var(--background);
		color: var(--foreground);
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		position: absolute;
		right: 115%;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}

	/* Show the tooltip text on hover */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
