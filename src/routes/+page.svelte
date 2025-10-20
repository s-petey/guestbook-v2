<script lang="ts">
	import { helloForm } from '$lib/remotes/hello.remote';
</script>

<article class="mx-auto flex w-1/2 flex-col gap-4">
	<h1>Effect Remote Form Example</h1>
	<p>
		This example demonstrates how to use Effect Remote Forms in a SvelteKit application. Fill out
		the form below and submit it to see the result.
	</p>

	<h1 class="text-3xl font-bold underline">Hello Effect Remote Form</h1>

	<form {...helloForm}>
		<label>
			Name:
			<input
				class="form-input"
				{...helloForm.fields.name.as('text')}
				placeholder="Enter your name"
			/>

			{#each helloForm.fields.name.issues() as issue}
				<p class="text-red-600">{issue.message}</p>
			{/each}
		</label>

		<button class="rounded-xl bg-green-600 p-4 text-amber-200" type="submit">Send</button>
	</form>

	<pre>{helloForm.result}</pre>
</article>
