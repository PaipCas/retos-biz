import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	test: {
		globals: true,          // Habilita describe, it, expect de forma global
		environment: 'jsdom',   // Simula el DOM del navegador
		setupFiles: './src/setup.js', // Archivo donde cargaremos jest-dom
	},
});