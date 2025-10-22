<script lang="ts">
	import { createPerson } from '$lib/remotes/hello.remote';
</script>

<div class="card rounded-lg bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-2xl font-semibold text-green-600">📝 FORM Operations</h2>

	<form {...createPerson} class="space-y-4">
		<div>
			<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
			<input
				{...createPerson.fields.name.as('text')}
				class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
				placeholder="Enter your name"
			/>
		</div>
		{#each createPerson.fields.name.issues() as issue}
			<p class="text-sm text-red-600">{issue.message}</p>
		{/each}

		<div class="flex items-center justify-between">
			<div class="text-sm text-gray-500">
				Form valid: {(createPerson.fields.allIssues()?.length || 0) <= 0 ? '✅' : '❌'}
			</div>
			<button
				type="submit"
				class="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{createPerson.pending > 0 ? 'Submitting...' : 'Submit'}
			</button>
		</div>
	</form>

	{#if createPerson.result}
		<div class="mt-4 rounded bg-green-100 p-3 text-green-700">
			<h3 class="font-semibold">Result:</h3>
			<ul>
				<li>ID: {createPerson.result.id}</li>
				<li>Name: {createPerson.result.name}</li>
				<li>Created At: {createPerson.result.createdAt}</li>
				<li>Updated At: {createPerson.result.updatedAt}</li>
			</ul>
		</div>
	{/if}
</div>
