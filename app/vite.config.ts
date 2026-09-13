import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		host: '0.0.0.0',
		port: 5173,
		// Dev-only: izinkan domain preview sandbox (prod pakai adapter-node, tak terpengaruh)
		allowedHosts: ['.e2b.app']
	},
	preview: {
		host: '0.0.0.0',
		port: 5173
	}
});
