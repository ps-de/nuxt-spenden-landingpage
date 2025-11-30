<!--
  pages/index.vue - Landing Page
  
  Hauptseite der Spenden-Landingpage
  
  Komponenten-Struktur (Top→Bottom):
  1. HeroSection: Hero mit Background, Barometer, CTA, Info-Cards
  2. DonationForm: Spendenformular mit Validation
  3. FaqSection: FAQ-Accordion mit Kontakt-CTA
  
  Design-Flow:
  - Hero (dunkel) → Form (hell) → FAQ (dunkel)
  - Visueller Rhythmus durch Kontrast-Wechsel
  - Scroll-to-Form via GSAP aus Hero-CTA
  
  SEO/Meta:
  - ✅ Title & Description für Lighthouse SEO-Score
  - ✅ Open Graph Tags für Social Media Sharing
  - ✅ Viewport & Charset automatisch von Nuxt gesetzt
  - TODO: Structured Data für Spenden-Organisation (JSON-LD)
-->
<template>
  <div>
    <h1 class="sr-only">Jetzt Spenden - Gemeinsam für eine bessere Zukunft</h1>
    <HeroSection />
    <LazyDonationForm />
    <LazyFaqSection />
  </div>
</template>

<script setup lang="ts">
/**
 * SEO Meta Tags & Performance Optimizations
 * 
 * useSeoMeta() - SEO-optimierte Meta-Tags
 * useHead() - Advanced Head Management mit Performance-Hints
 * 
 * SEO Tags:
 * - title, description, og:* Tags für Social Sharing
 * 
 * Performance Optimizations:
 * - theme-color: Verbessert PWA-Erlebnis
 * - Lazy Loading: DonationForm & FaqSection below the fold
 * 
 * Lighthouse Requirements:
 * ✅ Document has <title> element
 * ✅ Document has meta description
 * ✅ Lazy loading für below-the-fold Content
 */
useSeoMeta({
  title: 'Jetzt Spenden - Gemeinsam für eine bessere Zukunft | Hilfsorganisation',
  description: 'Unterstützen Sie unser Projekt zur Förderung von Bildung und Gesundheit. Jede Spende macht einen Unterschied. Transparent, sicher und direkt wirkungsvoll.',
  ogTitle: 'Jetzt Spenden - Gemeinsam für eine bessere Zukunft',
  ogDescription: 'Unterstützen Sie unser Projekt zur Förderung von Bildung und Gesundheit. Jede Spende macht einen Unterschied.',
  ogType: 'website',
  themeColor: '#ea580c', // Orange-600 für Browser-Chrome
  // ogImage: '/og-image.jpg', // TODO: Upload Share-Image (1200x630px empfohlen)
})

// Performance: Mobile-optimierte Viewport-Einstellungen
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
  ]
})
</script>
