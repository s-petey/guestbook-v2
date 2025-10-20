<script lang="ts">
	import { page } from '$app/state';
	import { navItems } from './navItems.js';

	let { children } = $props();
</script>

<div class="min-h-screen bg-gray-50">
	<nav class="border-b bg-white shadow-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 justify-between">
				<div class="flex space-x-8">
					{#each navItems as item}
						<a
							href={item.path}
							class="inline-flex items-center px-1 pt-1 text-sm font-medium {page.url.pathname ===
							item.path
								? 'border-b-2 border-blue-500 text-gray-900'
								: 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</nav>

	<main class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
		<div class="px-4 py-6 sm:px-0">
			{@render children()}
		</div>
	</main>
</div>
