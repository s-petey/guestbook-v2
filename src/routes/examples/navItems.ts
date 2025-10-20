import type { ResolvedPathname } from '$app/types';

export const navItems: { name: string; path: ResolvedPathname }[] = [
	{ name: 'Query', path: '/examples' },
	{ name: 'Forms', path: '/examples/forms' },
	{ name: 'Commands', path: '/examples/commands' }
	// TODO: More?
] as const;
