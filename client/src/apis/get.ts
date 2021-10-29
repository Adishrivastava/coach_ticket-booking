import { baseUrl } from '../utils/constants';

const Get = async (url: string) =>
	await fetch(`${baseUrl}${url}`, {
		method: 'GET',
		// mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res: any) => res.json())
		.catch((e) => console.log(e));

export default Get;
