import type { PageServerLoad } from './$types';

export const load = (async () => {
	const myData = { test: [1, 2, 3] };
	console.log('Server run');
	return { myData: myData };
}) satisfies PageServerLoad;
