import { json } from '@sveltejs/kit';

export const POST = async ({ request, fetch }) => {
	const requestBody = await request.formData();
	const requestFile = requestBody.get('file');
	console.log(requestFile);

	if (requestFile === null) {
		return json({ error: 'File is missing' }, { status: 400 });
	}

	if (!(requestFile instanceof Blob)) {
		return json({ error: 'Invalid file type' }, { status: 400 });
	}
	console.log('Start Fetch');
	const formData = new FormData();
	formData.append('file', requestFile);
	const response = await fetch(`/api/two`, {
		method: 'POST',
		body: formData
	});
	console.log('End Fetch');
	if (response.ok) {
		const data = await response.json();
		return json(data);
	} else if (response.status >= 400 && response.status < 600) {
		console.error(`Received HTTP ${response.status}. Retrying...`);
	} else {
		const errorText = await response.text();
		console.error(`Received HTTP ${response.status}. Not retrying.`);
		console.error(errorText);
		return json(
			{ error: `Received HTTP ${response.status}. Error message: ${errorText}` },
			{ status: response.status }
		);
	}
};
