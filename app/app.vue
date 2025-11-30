<!--
  app.vue - Root Application Component
  
  Haupt-Layout-Wrapper für gesamte Applikation
  
  Features:
  - Globales Background-Gradient (primary-50/30 für subtilen Farbton)
  - NuxtRouteAnnouncer: Accessibility-Feature für Screen-Reader
  - NuxtPage: Dynamisches Page-Rendering (pages/index.vue)
  
  Layout-Strategie:
  - Min-Height: 100vh für Full-Page-Layout
  - Dark-Mode-Support: dark:from-gray-950 etc.
  - Gradients: Top→Middle→Bottom für Tiefe
  
  Routing:
  - Single-Page-App mit page-based Routing
  - Aktuelle Pages: ~/pages/index.vue
-->
<template>
  <div
    class="min-h-screen flex flex-col bg-linear-to-b from-white via-primary-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
  >
    <NuxtRouteAnnouncer />
    <div class="flex-1 flex flex-col">
      <NuxtPage />
    </div>
    <footer class="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
      <div
        class="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-3 text-sm text-gray-600 text-center md:text-left"
      >
        <span class="font-semibold text-gray-800">
          © {{ new Date().getFullYear() }} Nuxt Spenden Landingpage
        </span>
        <div
          class="flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-4"
        >
          <span>
            Fiktive Hilfsorganisation · Persönliche Coding-Challenge von
            <span class="font-semibold">Peter Schulte</span>
            · Nur Demo-Zwecke
          </span>
          <span class="hidden sm:inline text-gray-300">·</span>
          <a
            href="#donation-form"
            class="inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <UIcon name="i-heroicons-heart" class="w-4 h-4" />
            Jetzt spenden
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
