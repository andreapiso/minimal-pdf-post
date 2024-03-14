import { json } from '@sveltejs/kit';
// import { RAY_API_ROOT } from '$env/static/private';

export const POST = async (event) => {
	console.log('Received request');
	const requestBody = await event.request.formData();
	const requestFile = requestBody.get('file');
	console.log(requestFile);

	if (requestFile === null) {
		return json({ error: 'File is missing' }, { status: 400 });
	}

	if (!(requestFile instanceof Blob)) {
		return json({ error: 'Invalid file type' }, { status: 400 });
	}

	console.log(requestFile);
	return json({ message: 'Success.' }, { status: 200 });
};
