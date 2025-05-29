import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

export default defineConfig({
    vite: {
        plugins: [tailwindcss()],
    },
    integrations: [react()],
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'es'],
        routing: {
            prefixDefaultLocale: true,
        }
    }
});