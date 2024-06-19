// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import type { PostHog } from 'posthog-node';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: User | null }>;
			session: Session | null;
			user: User | null;
			capturePostHogEvent: (params: Omit<Parameters<PostHog['capture']>[0], 'distinctId'>) => void; // Parameters<PostHog["capture"]>
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
