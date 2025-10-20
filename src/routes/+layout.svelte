<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="bg-blue-600 p-4 text-white shadow-md">
	<h1 class="text-2xl font-semibold">Guestbook V2 Examples</h1>

	<nav>
		<a href="/" class="mr-4 hover:underline">Home</a>
		<a href="/examples" class="mr-4 hover:underline">Examples</a>
	</nav>
</header>

{@render children?.()}
