import type { Auth } from "better-auth";
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module "better-auth" {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface BetterAuthTypes extends Auth {}
}

export {};
