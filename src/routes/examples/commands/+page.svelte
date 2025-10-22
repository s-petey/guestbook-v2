<script lang="ts">
	import { helloCommand, resetPeople } from '$lib/remotes/hello.remote';
	import type { Person } from '$lib/schemas/Person';

	let disableMultiple = $state(false);

	let response: readonly Person[] = $state([]);

	let ctr = 0;
</script>

<div class="card rounded-lg bg-white p-6 shadow-lg">
	<h2 class="mb-4 text-2xl font-semibold text-purple-600">⚡ COMMAND Operations</h2>

	<div class="space-y-4">
		<div class="flex flex-wrap gap-2">
			<button
				onclick={async () => {
					ctr++;
					response = await helloCommand({ name: `Bob the ${ctr}` });
				}}
				disabled={disableMultiple ? helloCommand.pending > 0 : false}
				class="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600 disabled:opacity-50"
			>
				Add Hello
			</button>

			<button
				onclick={() => {
					disableMultiple = !disableMultiple;
				}}
				class="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
			>
				{disableMultiple ? 'Enable' : 'Disable'} Multiple
			</button>

			<button
				onclick={async () => {
					await resetPeople();
					response = [];
				}}
				class="rounded bg-purple-500 px-3 py-1 text-sm text-white hover:bg-purple-600"
			>
				Reset people
			</button>

			<pre>Items pending: {helloCommand.pending}</pre>
		</div>
		<section>
			Items added:
			<ul class="list-inside list-disc">
				{#each response as item (item.id)}
					<li>{item.name}</li>
				{/each}
			</ul>
		</section>
	</div>
</div>
