/**
 * nuxt.config.ts - Nuxt 4 Configuration
 * 
 * Modules:
 * - @nuxt/ui: Nuxt UI Library mit Tailwind v4
 *   Komponenten: UContainer, UCard, UIcon, UButton
 *   Icons: Heroicons via @iconify-json/heroicons
 * 
 * - @pinia/nuxt: State Management
 *   Store: ~/stores/donation.ts
 *   Auto-Import: useDonationStore verfügbar in allen Komponenten
 * 
 * - v-gsap-nuxt: GSAP Integration
 *   Smooth Scrolling: ScrollToPlugin für Hero CTA
 *   Auto-Import: gsap verfügbar ohne expliziten Import
 * 
 * CSS:
 * - ~/assets/css/tailwind.css: Custom Styles, CI-Farben, Animations
 * 
 * Performance Optimizations:
 * - Nitro Prerendering für statische Seiten
 * - Vite Build Optimizations (Minify, Treeshaking)
 * - Router Options (prefetchLinks für schnellere Navigation)
 * 
 * Compatibility:
 * - Date: 2025-07-15 (Nuxt 4 Format)
 * 
 * DevTools: Enabled für Development-Modus
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // HTML Attributes für Accessibility
  app: {
    head: {
      htmlAttrs: {
        lang: 'de' // Lighthouse A11y: <html> muss [lang] Attribut haben
      },
      link: [
        // Preconnect für System-Fonts (falls externe Fonts geladen werden)
        { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }
      ]
    }
  },
  
  // Nuxt Modules
  modules: [
    '@nuxt/ui',        // UI Library mit Tailwind v4
    '@pinia/nuxt',     // State Management
    'v-gsap-nuxt'      // GSAP Animation Library
  ],

  // Global CSS
  css: ['~/assets/css/tailwind.css'],
  
  // Performance Optimizations
  nitro: {
    compressPublicAssets: true, // Gzip/Brotli für statische Assets
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  
  // Experimental Features für bessere Performance
  experimental: {
    payloadExtraction: false, // Reduziert initiale Payload-Größe
    componentIslands: false // Deaktiviert für einfache SPA
  },
  
  // Vite Build Optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // Entferne console.logs in Production
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor-Splitting für besseres Caching
            'vendor-vue': ['vue', 'vue-router'],
            'vendor-gsap': ['gsap']
          }
        }
      }
    }
  }
})
