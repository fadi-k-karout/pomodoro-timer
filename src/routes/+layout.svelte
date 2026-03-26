<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script>
		// Prevent FOUC (Flash of Unstyled Content) by applying the correct theme class before Svelte hydrates
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>
{@render children()}

<style>
	:global(:root) {
		--background-gradient: linear-gradient(90deg, #efd5ff 0%, #515ada 100%);
		--background: hsl(210 40% 98%);
		--foreground: hsl(222 47% 11%);
		--card: hsl(0 0% 100%);
		--border: hsl(214 32% 91%);

		--primary: hsl(221 83% 53%);
		--primary-foreground: hsl(210 40% 98%);
		--primary-border: hsl(221 83% 45%);

		--secondary: hsl(210 40% 96%);
		--secondary-foreground: hsl(222 47% 11%);
		--secondary-border: hsl(214 32% 85%);

		--muted-background: hsla(0, 0%, 0%, 0.05);
		--muted-foreground: hsl(222 47% 11%);

		--radius: 0.5rem;
	}
	:global(.dark) {
		--background-gradient: linear-gradient(90deg, #515ada 0%, #efd5ff 100%);
		--background: hsl(210, 50%, 4%);
		--foreground: hsl(210 40% 98%);
		--card: hsl(222 47% 11%);
		--border: hsl(214 32% 85%);

		--primary: hsl(221 83% 45%);
		--primary-foreground: hsl(210 40% 98%);
		--primary-border: hsl(221 83% 53%);

		--secondary: hsl(216, 26%, 20%);
		--secondary-foreground: hsl(210 40% 98%);
		--secondary-border: hsl(214 32% 91%);

		--muted-background: hsla(0, 15%, 5%, 0.542);
		--muted-foreground: hsl(210 40% 98%);

		--radius: 0.5rem;
	}

	:global(body) {
		min-height: 95dvh;
		background: var(--background-gradient);
	}
	:global(*) {
		box-sizing: border-box;
	}
	:global(html, body) {
		overflow-x: hidden;
	}
</style>
