<script lang="ts">
	let files: FileList;
	let uploading = false;

	async function uploadFiles() {
		uploading = true;
		const result = await uploadFile(files[0]);
		uploading = false;
		console.log(result);
	}

	async function uploadFile(uploadedFile: File) {
		const formData = new FormData();
		formData.append('file', uploadedFile);

		try {
			const response = await fetch('/api/one', {
				method: 'POST',
				body: formData
			});
			if (!response.ok) {
				throw new Error('Error connecting to the model');
			}
			const data = await response.json();
			return data;
		} catch (error: any) {
			console.error('Error in chunkFile:', error);
			return { error: error.message }; // or return a string like 'Error connecting to the model'
		} finally {
		}
	}
</script>

{#if uploading}
	Uploading...
{:else}
	<div class="grid w-5 max-w-sm items-center gap-1.5">
		<label class="cursor-pointer" for="many">"Upload PDF"</label>
		<input bind:files on:change={uploadFiles} id="many" multiple type="file" class="hidden" />
	</div>
{/if}

{#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if}
