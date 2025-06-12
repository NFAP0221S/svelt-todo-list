import { svelte } from '@sveltejs/vite-plugin-svelte'; // Changed import
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [svelte()], // Changed plugin
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest-setup.js"
  },
  resolve: {
    conditions: ['browser']
  }
});
