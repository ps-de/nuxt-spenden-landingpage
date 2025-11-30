<!--
  FaqSection.vue
  
  FAQ-Bereich mit Accordion-Funktionalität:
  - Native HTML details/summary Pattern (kein JavaScript)
  - FAQ-Daten aus JSON-Datei (~/data/faq.json)
  - Dunkler Slate-Hintergrund für visuelle Abgrenzung
  - Erste Frage standardmäßig geöffnet
  - Kontakt-CTA mit E-Mail und Telefon-Links
  
  Design-Entscheidungen:
  - Slate-900/800 Gradient Background für starken Kontrast
  - Slate-800 Accordion-Items auf dunklem Background
  - Orange-600 CTA-Box für Konsistenz
  - Native <details>/<summary> für Accessibility
  - CSS-Animation für Chevron-Rotation (group-open:rotate-180)
  - SlideDown-Animation definiert in tailwind.css
  
  Data Structure:
  - faq.json: Array mit {id, question, answer}
  - Mapping zu {label, content, defaultOpen} für Accordion
-->
<template>
  <section
    class="py-16 md:py-24 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900"
  >
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
            Häufig gestellte Fragen
          </h2>
          <p class="text-lg text-slate-200">
            Hier finden Sie Antworten auf die wichtigsten Fragen rund um Ihre Spende
          </p>
        </div>

        <div class="space-y-4">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="border-2 border-slate-700 rounded-2xl overflow-hidden transition-colors bg-slate-800 shadow-xl"
          >
            <details class="group" :open="item.defaultOpen">
              <summary
                class="flex items-center justify-between cursor-pointer list-none p-6 hover:bg-slate-700 transition-colors"
              >
                <span class="text-lg font-semibold text-white pr-4">
                  {{ item.label }}
                </span>
                <UIcon
                  name="i-heroicons-chevron-down"
                  class="w-6 h-6 text-slate-300 transition-transform duration-200 group-open:rotate-180 shrink-0"
                />
              </summary>
              <div class="px-6 pb-6 pt-2 border-t border-slate-700">
                <p class="text-slate-200 leading-relaxed text-base">
                  {{ item.content }}
                </p>
              </div>
            </details>
          </div>
        </div>

        <div class="mt-12 text-center bg-orange-600 rounded-2xl p-10 shadow-2xl">
          <div
            class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <UIcon
              name="i-heroicons-question-mark-circle"
              class="w-10 h-10 text-orange-600"
            />
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Weitere Fragen?</h3>
          <p class="text-white mb-6 text-xl font-bold">
            Unser Team steht Ihnen gerne zur Verfügung
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hallo@peter-schulte.de"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-orange-700 bg-white rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <UIcon name="i-heroicons-envelope" class="w-6 h-6" />
              E-Mail schreiben
            </a>
            <a
              href="tel:+491636826267"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-orange-700 rounded-xl hover:bg-orange-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <UIcon name="i-heroicons-phone" class="w-6 h-6" />
              +49 163 6826267
            </a>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * FaqSection Script
 *
 * FAQ-Daten aus JSON-Datei laden und für Accordion formatieren
 *
 * Data Source:
 * - ~/data/faq.json: Array mit {id, question, answer}
 *
 * Data Transformation:
 * - question → label (Accordion Header)
 * - answer → content (Accordion Body)
 * - defaultOpen: true für erste Frage (index 0)
 *
 * TypeScript Interface:
 * - FaqItem: {label, content, defaultOpen?}
 */
import faqData from "~/data/faq.json";

interface FaqItem {
  label: string;
  content: string;
  defaultOpen?: boolean;
}

// FAQ-Daten transformieren und erste Frage default-öffnen
const faqItems: FaqItem[] = faqData.map((item, index) => ({
  label: item.question,
  content: item.answer,
  defaultOpen: index === 0, // Erste Frage standardmäßig geöffnet für bessere UX
}));
</script>
