<script lang="ts">
	import { helloQuery } from '$lib/remotes/hello.remote';

	const query = helloQuery();
</script>

<div class="card rounded-lg bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-2xl font-semibold text-blue-600">Query Operations</h2>

	<div class="mb-4">
		<button
			disabled={query.loading}
			onclick={() => query.refresh()}
			class="btn btn-primary rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
		>
			{query.loading ? 'Loading...' : 'Refresh hello'}
		</button>
	</div>

	{#if query.loading}
		<div class="flex items-center justify-center py-8">
			<div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
		</div>
	{:else if query.error}
		<div class="alert alert-error rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
			<strong>Error:</strong>
			{query.error}
		</div>
	{:else if query.current}
		<div class="space-y-2">
			<h3 class="font-medium text-gray-700">({query.current}):</h3>
		</div>
	{/if}
</div>
