
# Svelte with shadcn, Supabase and Posthog

This template is set up with:
- SvelteKit
- Tailwind CSS
- shadcn
- Iconify (Web Component)
- Supabase (with SSR)
- Posthog

***Note: This project is meant to be used with the node adapter and deployed with Node.js***
## Installation

**1. Clone this repository and branch**
```bash
git clone -b svelte-ui-supabase-posthog --single-branch https://github.com/cameron-dryden/svelte-templates.git
```

**2. Install packages with npm**
```bash
cd svelte-templates
npm install
```

**3. Update Environment Variables**

- Create a `.env` file in the root directory
- Paste in the below and change `<...>` to your details

```bash
PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
PUBLIC_SUPABASE_ANON_KEY=<YOUR_SUPABASE_KEY>

PUBLIC_POSTHOG_API_KEY=<YOUR_POSTHOG_KEY>
PUBLIC_POSTHOG_API_HOST=<YOUR_POSTHOG_HOST>
```

**4. Start Developing!**
```bash
npm run dev
```
## Usage/Configuration

### UI

There are multiple adjustments that can be made to change how the project bahaves out of the box.

#### 1. Theming
This project makes use of shadcn for UI elements. You can view their documentation for more details regarding theming https://www.shadcn-svelte.com/docs/theming.


`src/app.css`
```css
<!-- Default Theme -->
:root {
		--background: 0 0% 100%;
		--foreground: 222.2 84% 4.9%;

		--muted: 210 40% 96.1%;
		--muted-foreground: 215.4 16.3% 46.9%;

		--popover: 0 0% 100%;
		--popover-foreground: 222.2 84% 4.9%;

		--card: 0 0% 100%;
		--card-foreground: 222.2 84% 4.9%;

		--border: 214.3 31.8% 91.4%;
		--input: 214.3 31.8% 91.4%;

		--primary: 222.2 47.4% 11.2%;
		--primary-foreground: 210 40% 98%;

		--secondary: 210 40% 96.1%;
		--secondary-foreground: 222.2 47.4% 11.2%;

		--accent: 210 40% 96.1%;
		--accent-foreground: 222.2 47.4% 11.2%;

		--destructive: 0 72.2% 50.6%;
		--destructive-foreground: 210 40% 98%;

		--ring: 222.2 84% 4.9%;

		--radius: 0.5rem;
	}

	.dark {
		--background: 222.2 84% 4.9%;
		--foreground: 210 40% 98%;

		--muted: 217.2 32.6% 17.5%;
		--muted-foreground: 215 20.2% 65.1%;

		--popover: 222.2 84% 4.9%;
		--popover-foreground: 210 40% 98%;

		--card: 222.2 84% 4.9%;
		--card-foreground: 210 40% 98%;

		--border: 217.2 32.6% 17.5%;
		--input: 217.2 32.6% 17.5%;

		--primary: 210 40% 98%;
		--primary-foreground: 222.2 47.4% 11.2%;

		--secondary: 217.2 32.6% 17.5%;
		--secondary-foreground: 210 40% 98%;

		--accent: 217.2 32.6% 17.5%;
		--accent-foreground: 210 40% 98%;

		--destructive: 0 62.8% 30.6%;
		--destructive-foreground: 210 40% 98%;

		--ring: hsl(212.7, 26.8%, 83.9);
	}
```

#### 2. Dark Mode
By default, this project will take on the user's preference for dark mode by using their system mode. View more: https://www.shadcn-svelte.com/docs/dark-mode/svelte


#### 3. Adding Components
You can add components by using the terminal (example below) or install the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=Selemondev.vscode-shadcn-svelte)
```bash 
npx shadcn-svelte@latest add <component-name>
```
For a full list of components go to https://www.shadcn-svelte.com/docs/components

#### 4. Using Icons
Iconify offers an extensive list of icons from multiple providers. You can use it by including `<iconify-icon icon:"mdi:home" />` anywhere in your svelte files.

View all icons: https://icon-sets.iconify.design/  
Docs: https://iconify.design/docs/iconify-icon/

### Supabase
Supabase offers multiple useful features which makes it easy to include Auth, Realtime connections, Database management and more.
Docs: https://supabase.com/docs

This project is set up to have a public section and a private section.

#### Public Section
The public section includes all routes accept for the `src/routes/admin/` folder which can only be accessed by an authorized user.

The public section is completely server-side rendered and setup to behave as public facing website. You can make use of Supabase to get to any publicly-available data in your database.

- **For server files (i.e. +page.server.ts):** You can access the supabase client using `locals` and more specifically `locals.supabase`
- **For client files (i.e. +page.svelte):** Use the `export const data: PageData` to access the data available after loading. This will give you access to `data.supabase`, `data.session` and `data.user`

#### Private Section
The private section (route `src/routes/admin/` and it's children routes) are not server-side rendered as it reduces the load on the server. This can be changed in the `+layout.ts` file without any modifications to the rest of the project.

This route has an Auth Guard to prevent unauthorized users from accessing any private sections.

The way to access the Supabase client is the same as above, you will just have access to User data.

### Posthog
Posthog allows you to capture events that happen on your site to monitor traffic, user experience, manage new features and more. Docs: https://posthog.com/docs

By default, autocapture is turned off. This is to prevent events from being captured without you knowing about it.

When a user logs in, they are automatically mapped to their instance while in the public section and while send events with the current user as well. Currently only the email is sent as meta data but more can be added in `src/routes/admin/+layout.svelte` file in the `onMount` function.

- **For server files (i.e. +page.server.ts):** You can make use of `locals.capturePostHogEvent(<event-params>)` to capture events with the user automatically included. If you want to do more with the posthog client, you will have to instantiate it in your implementation (see https://posthog.com/docs/libraries/node).
- **For client files (i.e. +page.svelte):** You can access the posthog client by importing it (`import posthog from 'posthog-js';`) and using it as is.

