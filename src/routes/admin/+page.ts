import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	console.log('This happens in page.ts');
	return { ...data, someTest: 'test' };
}) satisfies PageLoad;
