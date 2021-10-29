import { baseUrl } from '../utils/constants';

const Put = async (url: string, data: any) =>
	await fetch(`${baseUrl}${url}`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.catch((e) => console.log(e));

export default Put;
