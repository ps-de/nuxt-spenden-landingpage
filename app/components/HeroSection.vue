<!--
  HeroSection.vue
  
  Haupt-Hero-Bereich der Spenden-Landingpage mit:
  - Vollbild-Hintergrundbild (Unsplash) mit Grayscale-Filter und leichtem Blur
  - Dunkler Slate-Overlay für bessere Textlesbarkeit
  - Integrierter DonationBarometer für Spendenstand
  - Animierter CTA-Button mit GSAP Smooth-Scroll zum Formular
  - 3 Info-Cards für Projekt-Schwerpunkte (Bildung, Gesundheit, Gemeinschaft)
  
  Design-Entscheidungen:
  - Orange (orange-600) als primäre CI-Farbe
  - Grayscale-Hintergrund für besseren Farbkontrast
  - Kompakte Abstände (py-12) für bessere Button-Sichtbarkeit
  - Flächiges Design ohne Borders bei Cards
-->
<template>
  <section
    class="relative min-h-[540px] sm:min-h-[620px] flex items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0">
      <img
        src="/hero-background.jpg"
        alt="Kinder beim Lernen und Spielen"
        class="w-full h-full object-cover blur-[2px] grayscale"
        loading="eager"
        fetchpriority="high"
        width="1920"
        height="1280"
      />
      <div
        class="absolute inset-0 bg-linear-to-br from-slate-900/85 via-slate-800/80 to-slate-900/85"
      ></div>
      <div
        class="absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent"
      ></div>
    </div>

    <UContainer class="relative z-10 py-8 sm:py-10 md:py-12">
      <div class="text-center max-w-5xl mx-auto space-y-5 md:space-y-6">
        <h1
          class="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl"
        >
          Gemeinsam für eine bessere Zukunft
        </h1>
        <p
          class="text-sm sm:text-base md:text-lg text-white font-medium max-w-2xl mx-auto drop-shadow-lg"
        >
          Unterstützen Sie unser Projekt zur Förderung von Bildung und Gesundheit. Jede
          Spende macht einen Unterschied!
        </p>

        <div class="mt-4 mb-5 md:my-6">
          <DonationBarometer />
        </div>

        <div class="flex justify-center pt-1 md:pt-2">
          <button
            @click="scrollToDonationForm"
            class="group inline-flex items-center gap-3 sm:gap-4 px-8 sm:px-12 md:px-14 py-4 sm:py-5 md:py-7 text-lg sm:text-xl md:text-2xl font-extrabold text-white bg-orange-600 rounded-full hover:bg-orange-500 shadow-[0_16px_48px_rgba(234,88,12,0.45)] hover:shadow-[0_20px_64px_rgba(234,88,12,0.65)] transition-all duration-300 hover:scale-110 animate-pulse-soft cursor-pointer hover:cursor-pointer"
          >
            <UIcon
              name="i-heroicons-heart"
              class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:scale-110 transition-transform"
            />
            Jetzt spenden
            <UIcon
              name="i-heroicons-arrow-right"
              class="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform"
            />
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 md:mt-8">
          <div
            class="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl hover:shadow-orange-600/50 transition-all duration-300 hover:scale-105"
          >
            <div class="flex flex-col items-center text-center gap-2">
              <div
                class="w-16 h-16 flex items-center justify-center bg-orange-600 rounded-full shadow-lg"
              >
                <UIcon name="i-heroicons-academic-cap" class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Bildung fördern</h2>
              <p class="text-xs text-gray-700 font-medium">
                Zugang zu Bildung für über 1.000 Kinder
              </p>
            </div>
          </div>

          <div
            class="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl hover:shadow-orange-600/50 transition-all duration-300 hover:scale-105"
          >
            <div class="flex flex-col items-center text-center gap-2">
              <div
                class="w-16 h-16 flex items-center justify-center bg-orange-600 rounded-full shadow-lg"
              >
                <UIcon name="i-heroicons-heart" class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Gesundheit stärken</h2>
              <p class="text-xs text-gray-700 font-medium">
                Medizinische Versorgung in entlegenen Gebieten
              </p>
            </div>
          </div>

          <div
            class="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl hover:shadow-orange-600/50 transition-all duration-300 hover:scale-105"
          >
            <div class="flex flex-col items-center text-center gap-2">
              <div
                class="w-16 h-16 flex items-center justify-center bg-orange-600 rounded-full shadow-lg"
              >
                <UIcon name="i-heroicons-users" class="w-8 h-8 text-white" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Gemeinschaft stärken</h2>
              <p class="text-xs text-gray-700 font-medium">
                Nachhaltige Projekte mit lokalen Partnern
              </p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * HeroSection Script
 * 
 * GSAP Integration für Smooth-Scrolling zum Donation-Formular
 * 
 * Dependencies:
 * - gsap: Animation-Library für professionelle Scroll-Animationen
 * - ScrollToPlugin: GSAP-Plugin für präzises Scroll-Verhalten
 * 
 * scrollToDonationForm():
 * - Scrollt sanft zum #donation-form Element
 * - Duration: 0.5s für optimale UX
 * - Easing: power2.inOut für natürliche Beschleunigung
 * - offsetY: 0 für exakte Positionierung
 */
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

// GSAP Plugin registrieren (nur im Client)
if (import.meta.client) {
  gsap.registerPlugin(ScrollToPlugin);
}

const scrollToDonationForm = () => {
  if (import.meta.client) {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: "#donation-form", offsetY: 0 },
      ease: "power2.inOut",
    });
  }
};
</script>
