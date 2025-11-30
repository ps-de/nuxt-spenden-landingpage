<!--
  DonationForm.vue
  
  Haupt-Spendenformular mit umfassender Validierung und UX-Features:
  
  Features:
  - Zod Schema-Validierung mit deutschen Fehlermeldungen
  - 2-Spalten-Grid-Layout für Name & E-Mail (responsive)
  - Preset-Buttons für schnelle Betragswahl (10€-500€)
  - Custom Amount Input für flexible Beträge
  - Toggle-Switch für Newsletter-Opt-in (statt Checkbox)
   - Scroll-to-Error bei Validierungsfehlern (Desktop & Mobile)
  - Erfolgsbenachrichtigung mit Dismiss-Button
  - Store-Integration für Spenden-Tracking
  
  Validation Rules (Zod):
  - Name: min 2, max 100 Zeichen
  - Email: gültige E-Mail-Adresse
  - Amount: min 5€, max 1.000.000€, ganzzahlig
  - Newsletter: boolean (optional)
  
  Design-Entscheidungen:
  - Flächiges Design: bg-gray-100 Inputs ohne Borders
  - Orange Focus-Ring (ring-4 ring-orange-400)
  - Orange Preset-Selection (bg-orange-600)
  - Kompakte Abstände (py-12, space-y-6) für bessere Button-Sichtbarkeit
  - Toggle-Switch statt Checkbox für modernen Look
-->
<template>
  <section id="donation-form" class="py-12 md:py-16 bg-gray-50">
    <UContainer>
      <div class="max-w-2xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Ihre Spende macht den Unterschied
          </h2>
          <p class="text-lg text-gray-700 font-medium">
            Jeder Beitrag hilft uns, unsere Mission zu erfüllen. Vielen Dank für Ihre
            Unterstützung!
          </p>
        </div>

        <UCard
          v-if="showSuccess"
          class="mb-8 bg-linear-to-br from-green-100 to-emerald-100 border-4 border-green-400 shadow-2xl rounded-3xl"
        >
          <div class="flex items-start gap-4 p-6">
            <div class="shrink-0">
              <div
                class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <UIcon name="i-heroicons-check" class="w-8 h-8 text-white" />
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                Vielen Dank für Ihre Spende!
              </h3>
              <p class="text-lg text-gray-800 font-medium">
                Ihre Spende über
                <strong class="text-green-700">{{
                  formatCurrency(lastDonationAmount)
                }}</strong>
                wurde erfolgreich registriert. Sie erhalten in Kürze eine Bestätigung per
                E-Mail.
              </p>
            </div>
            <button
              @click="showSuccess = false"
              class="shrink-0 text-gray-600 hover:text-gray-900"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
        </UCard>

        <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <form @submit.prevent="onSubmit" class="p-6">
            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-base font-bold text-gray-900 mb-2">
                    Ihr Name <span class="text-red-600">*</span>
                  </label>
                  <input
                    v-model="formState.name"
                    type="text"
                    name="name"
                    placeholder="Max Mustermann"
                    class="w-full px-4 py-3 text-base font-semibold border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 bg-gray-100"
                    :class="errors.name ? 'ring-2 ring-red-500' : ''"
                  />
                  <p
                    v-if="errors.name"
                    class="mt-2 text-sm font-semibold text-red-600 flex items-center gap-2"
                  >
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5" />
                    {{ errors.name }}
                  </p>
                </div>

                <div>
                  <label class="block text-base font-bold text-gray-900 mb-2">
                    E-Mail-Adresse <span class="text-red-600">*</span>
                  </label>
                  <input
                    v-model="formState.email"
                    type="text"
                    name="email"
                    placeholder="ihre@email.de"
                    autocomplete="email"
                    class="w-full px-4 py-3 text-base font-semibold border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 bg-gray-100"
                    :class="errors.email ? 'ring-2 ring-red-500' : ''"
                  />
                  <p
                    v-if="errors.email"
                    class="mt-2 text-sm font-semibold text-red-600 flex items-center gap-2"
                  >
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5" />
                    {{ errors.email }}
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-base font-bold text-gray-900 mb-3">
                  Spendenbetrag (mind. 5 €) <span class="text-red-600">*</span>
                </label>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <button
                      v-for="preset in presetAmounts"
                      :key="preset"
                      type="button"
                      @click="selectAmount(preset)"
                      class="px-4 py-3 text-lg font-extrabold rounded-2xl transition-all duration-200 shadow-lg cursor-pointer"
                      :class="
                        Number(formState.amount) === preset
                          ? 'bg-orange-600 text-white shadow-2xl shadow-orange-600/50 scale-110'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-xl hover:scale-105'
                      "
                    >
                      {{ preset }} €
                    </button>
                  </div>

                  <div>
                    <input
                      v-model="formState.amount"
                      type="text"
                      name="amount"
                      placeholder="Eigener Betrag in €"
                      step="1"
                      class="w-full px-4 py-3 text-xl font-bold border-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-400 bg-gray-100"
                      :class="errors.amount ? 'ring-2 ring-red-500' : ''"
                    />
                  </div>
                  <p
                    v-if="errors.amount"
                    class="text-sm font-semibold text-red-600 flex items-center gap-2"
                  >
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5" />
                    {{ errors.amount }}
                  </p>
                </div>
              </div>

              <label
                class="flex items-center justify-between p-4 bg-orange-50 rounded-2xl cursor-pointer hover:bg-orange-100 transition-all shadow-sm"
              >
                <span class="text-base font-semibold text-gray-900 flex-1 pr-4">
                  Ja, ich möchte den Newsletter erhalten und über weitere Projekte
                  informiert werden
                </span>
                <div class="relative inline-block w-14 h-7 shrink-0">
                  <input
                    v-model="formState.newsletter"
                    type="checkbox"
                    class="sr-only peer"
                  />
                  <div
                    class="w-14 h-7 bg-gray-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-orange-400 peer-checked:bg-orange-600 transition-all duration-300"
                  ></div>
                  <div
                    class="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-7"
                  ></div>
                </div>
              </label>

              <div class="p-4 bg-gray-200 rounded-2xl shadow-sm">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-heroicons-shield-check"
                    class="w-6 h-6 text-green-600 shrink-0 mt-0.5"
                  />
                  <div>
                    <p class="text-sm font-bold text-gray-900 mb-1">
                      Ihre Daten sind sicher:
                    </p>
                    <p class="text-sm text-gray-700">
                      Alle Informationen werden ausschließlich zur Spendenabwicklung
                      verwendet und nicht an Dritte weitergegeben.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-5 px-6 text-xl font-extrabold text-white bg-orange-600 rounded-2xl hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-orange-600/60 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
              >
                <UIcon v-if="!isSubmitting" name="i-heroicons-heart" class="w-8 h-8" />
                <UIcon
                  v-else
                  name="i-heroicons-arrow-path"
                  class="w-8 h-8 animate-spin"
                />
                <span>{{
                  isSubmitting ? "Spende wird verarbeitet..." : "Jetzt spenden"
                }}</span>
              </button>
            </div>
          </form>
        </div>

        <div class="mt-8 text-center">
          <p class="text-sm text-gray-700 font-bold mb-3">Sichere Zahlung über:</p>
          <div class="flex justify-center items-center gap-8 flex-wrap">
            <span
              class="text-gray-700 font-bold text-lg px-6 py-3 bg-white rounded-xl shadow-md"
              >PayPal</span
            >
            <span
              class="text-gray-700 font-bold text-lg px-6 py-3 bg-white rounded-xl shadow-md"
              >Kreditkarte</span
            >
            <span
              class="text-gray-700 font-bold text-lg px-6 py-3 bg-white rounded-xl shadow-md"
              >SEPA-Lastschrift</span
            >
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
/**
 * DonationForm Script
 *
 * Umfassende Formular-Validierung mit Zod Schema
 *
 * Dependencies:
 * - zod: TypeScript-first Schema-Validierung
 * - useDonationStore: Pinia Store für Spenden-Management
 *
 * Validation Schema:
 * - name: 2-100 Zeichen, String
 * - email: Gültige E-Mail, 5-100 Zeichen
 * - amount: 5€ - 1.000.000€, ganzzahlig, positiv
 * - newsletter: Boolean (optional)
 *
 * State Management:
 * - formState: Reactive Form-Daten (v-model Bindings)
 * - errors: Reactive Fehler-Objekt (angezeigt unter Inputs)
 * - isSubmitting: Loading-State für Button
 * - showSuccess: Toggle für Erfolgsbenachrichtigung
 *
 * UX Features:
 * - selectAmount(): Preset-Button onClick Handler
 * - validateForm(): Zod-Parsing mit Error-Mapping
 * - Scroll-to-Error: Automatisches Scrollen zum ersten Fehlerfeld
 * - onSubmit(): API-Call Simulation, Store-Update, Success-Display
 */
import { z } from "zod";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useDonationStore } from "~/stores/donation";

gsap.registerPlugin(ScrollToPlugin);

const donationStore = useDonationStore();

// Zod Validierungsschema mit deutschen Fehlermeldungen
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Der Name muss mindestens 3 Zeichen lang sein" })
    .max(100, { message: "Der Name darf maximal 100 Zeichen lang sein" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿÄÖÜäöüß .'-]+$/, {
      message: "Bitte geben Sie einen gültigen Namen ohne Sonderzeichen oder Code ein",
    }),

  email: z
    .string()
    .trim()
    .min(5, { message: "Die E-Mail-Adresse ist zu kurz" })
    .max(100, { message: "Die E-Mail-Adresse ist zu lang" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
      message: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    }),

  amount: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, {
      message: "Bitte geben Sie einen ganzzahligen Betrag ohne Komma oder Punkt ein",
    })
    .transform((val) => Number(val))
    .refine((val) => !Number.isNaN(val), {
      message: "Bitte geben Sie einen gültigen Betrag ein",
    })
    .refine((val) => val >= 5, {
      message: "Der Mindestbetrag beträgt 5 €",
    })
    .refine((val) => val <= 1_000_000, {
      message: "Der Maximalbetrag beträgt 1.000.000 €",
    }),

  newsletter: z.boolean(),
});

// Formular State (reactive für v-model Bindings)
const formState = reactive({
  name: "",
  email: "",
  amount: "",
  newsletter: false,
});

// Fehler State (reactive für dynamische Error-Anzeige)
const errors = reactive({
  name: "",
  email: "",
  amount: "",
});

// Vordefinierte Spendenbeträge (Preset-Buttons)
const presetAmounts = [10, 25, 50, 100, 250, 500];

// UI State
const isSubmitting = ref(false); // Loading-Indicator für Submit-Button
const showSuccess = ref(false); // Toggle für Erfolgsbenachrichtigung
const lastDonationAmount = ref(0); // Betrag für Success-Message

/**
 * Currency Formatter (Deutsch, ohne Nachkommastellen)
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Preset Amount Selection
 * Setzt Amount und löscht vorherigen Fehler
 */
const selectAmount = (amount: number) => {
  formState.amount = String(amount);
  errors.amount = "";
};

/**
 * Form Validation mit Zod
 *
 * Validiert formState gegen Schema
 * Mapped Zod-Errors auf errors-Objekt
 * Scrollt automatisch zum ersten Fehlerfeld (UX-Verbesserung)
 *
 * @returns true wenn valid, false wenn Fehler vorhanden
 */
const validateForm = (): boolean => {
  // Fehler zurücksetzen vor neuer Validierung
  errors.name = "";
  errors.email = "";
  errors.amount = "";

  try {
    // Zod Schema-Parsing
    schema.parse(formState);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      let firstErrorField: string | null = null;

      // Mapping Zod-Issues auf errors-Objekt
      error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors;
        if (field in errors) {
          errors[field] = issue.message;
          // Track erstes Fehlerfeld für Scroll-to-Error
          if (!firstErrorField) {
            firstErrorField = field;
          }
        }
      });

      // Scroll-to-Error: Automatisches Scrollen zum ersten Fehlerfeld
      // 100ms Timeout für DOM-Update nach Error-Anzeige
      if (firstErrorField && import.meta.client) {
        setTimeout(() => {
          const errorElement = document.querySelector<HTMLInputElement>(
            `input[name="${firstErrorField}"], input[type="${
              firstErrorField === "amount" ? "number" : "text"
            }"]:focus`
          );
          if (errorElement) {
            gsap.to(window, {
              duration: 0.6,
              scrollTo: {
                y: errorElement,
                offsetY: 120,
              },
              ease: "power2.out",
              onComplete: () => errorElement.focus(),
            });
          }
        }, 100);
      }
    }
    return false;
  }
};

/**
 * Form Submit Handler
 *
 * Flow:
 * 1. Validierung (validateForm) - early return bei Fehler
 * 2. Loading-State aktivieren (isSubmitting)
 * 3. API-Call Simulation (1.5s timeout)
 * 4. Store-Update (addDonation Action)
 * 5. Success-Message anzeigen
 * 6. Formular zurücksetzen
 * 7. Scroll zur Erfolgsbenachrichtigung
 *
 * Error Handling: Console-Log, isSubmitting cleanup in finally
 */
const onSubmit = async () => {
  // Early return wenn Validation fehlschlägt
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    // Simuliere API-Call (1.5s für realistische UX)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Spende zum Pinia Store hinzufügen
    donationStore.addDonation({
      name: formState.name,
      email: formState.email,
      amount: Number(formState.amount),
      newsletter: formState.newsletter,
    });

    // Erfolgsbenachrichtigung vorbereiten
    lastDonationAmount.value = Number(formState.amount);
    showSuccess.value = true;

    // Formular State zurücksetzen
    formState.name = "";
    formState.email = "";
    formState.amount = "";
    formState.newsletter = false;

    // Scroll zur Erfolgsbenachrichtigung (oben im Form-Bereich)
    const formElement = document.querySelector("#donation-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } catch (error) {
    console.error("Fehler beim Absenden der Spende:", error);
  } finally {
    // Cleanup: Loading-State deaktivieren
    isSubmitting.value = false;
  }
};
</script>
