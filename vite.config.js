import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico', 
        'apple-touch-icon.png', 
        'mask-icon.svg', 
        'robots.txt' // Include robots.txt for SEO and crawlers
      ],
      manifest: {
        name: 'Hipsta',
        short_name: 'Hipsta',
        description: 'Go & Glow book your Flow',
        theme_color: '#ffffff',
        background_color: '#ffffff', // Sets splash screen background
        display: 'standalone', // Full-screen experience without browser UI
        orientation: 'portrait-primary', // Locks the app to portrait mode
        start_url: '/', // Ensure it aligns with your app’s root URL
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'dashbrd.png',
            sizes: '861x513',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: 'dashbrd.png',
            sizes: '861x513',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // Cache up to 4 MB files
        globPatterns: ['**/*.{js,css,html,png,svg,ico,jpg,jpeg}'], // Cache common file types
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:8000\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
              },
            },
          },
          {
            urlPattern: /^https:\/\/api\.example\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10, // Fallback to cache if API request takes longer when network available.
            },
          },
        ],
      },
    }),
  ],
});
