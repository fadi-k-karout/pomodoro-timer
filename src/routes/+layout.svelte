<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}

<style>
	:global(:root) {
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

		--radius: 0.5rem;
	}

</style>
