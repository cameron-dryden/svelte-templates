import type { PageLoad } from './$types';

export const load = (async () => {
	console.log('This happens in page.ts');
	return {};
}) satisfies PageLoad;
