<script lang="ts">
	import { enhance } from '$app/forms';
	import { createPerson } from '$lib/remotes/hello.remote';

	let data = $props();

	$inspect(data);
</script>

<article class="mx-auto flex w-1/2 flex-col gap-4">
	<h1>Effect Remote Form Example</h1>
	<p>
		This example demonstrates how to use Effect Remote Forms in a SvelteKit application. Fill out
		the form below and submit it to see the result.
	</p>

	<h1 class="text-3xl font-bold underline">Hello Effect Remote Form</h1>

	<form {...createPerson}>
		<label>
			Name:
			<input
				class="form-input"
				{...createPerson.fields.name.as('text')}
				placeholder="Enter your name"
			/>

			{#each createPerson.fields.name.issues() as issue}
				<p class="text-red-600">{issue.message}</p>
			{/each}
		</label>

		<button class="rounded-xl bg-green-600 p-4 text-amber-200" type="submit">Send</button>
	</form>

	<pre>{createPerson.result}</pre>
</article>

<form method="post" use:enhance>
	<input name="name" type="text" placeholder="Enter your name" />
	<button>submit</button>
</form>
