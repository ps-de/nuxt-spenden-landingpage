<!--
  DonationBarometer.vue
  
  Visueller Fortschrittsbalken für Spendenkampagne mit:
  - Aktueller Spendenstand vs. Spendenziel (gleichgroße Beträge)
  - Animierter Progress-Bar mit Prozentanzeige
  - Statistik-Grid mit "Noch benötigt" und "Anzahl Spenden"
  
  Pinia Store Integration:
  - currentAmount: Aktueller Spendenstand (€4.200)
  - goalAmount: Spendenziel (€10.000)
  - progress: Berechneter Fortschritt in % (42%)
  - remainingAmount: Noch benötigter Betrag
  - donationCount: Anzahl der Spenden
  
  Design-Entscheidungen:
  - Orange Progress-Bar auf dunklem Slate-Hintergrund für Kontrast
  - Weiße Card ohne Borders (flächiges Design)
  - Orangene Top-Border als Trenner für Statistik-Grid
  - Currency Formatierung: Deutsch, ohne Nachkommastellen
-->
<template>
  <div class="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
    <div class="space-y-4">
      <div class="flex justify-between items-end gap-4">
        <div>
          <p class="text-sm text-gray-700 font-bold mb-1">Aktueller Spendenstand</p>
          <p class="text-3xl md:text-5xl font-extrabold text-orange-600 drop-shadow-sm inline-block min-w-30 text-left">
            {{ formatCurrency(donationStore.currentAmount) }}
          </p>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-700 font-bold mb-1">Spendenziel</p>
          <p class="text-3xl md:text-5xl font-extrabold text-orange-700 drop-shadow-sm inline-block min-w-30 text-right">
            {{ formatCurrency(donationStore.goalAmount) }}
          </p>
        </div>
      </div>

      <div class="relative">
        <div class="h-10 bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <div 
            class="h-full bg-linear-to-r from-orange-600 via-orange-500 to-orange-600 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
            :style="{ width: `${animatedProgress}%` }"
          >
            <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-lg font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            {{ Math.round(animatedProgress) }}%
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4 pt-4 border-t-4 border-orange-600">
        <div class="text-center p-4 bg-white rounded-2xl shadow-md">
          <p class="text-sm text-gray-700 font-bold mb-1">Noch benötigt</p>
          <p class="text-2xl md:text-3xl font-extrabold text-orange-600 drop-shadow-sm">
            {{ formatPlainNumber(displayRemainingAmount) }} €
          </p>
        </div>
        <div class="text-center p-4 bg-white rounded-2xl shadow-md">
          <p class="text-sm text-gray-700 font-bold mb-1">Anzahl Spenden</p>
          <p class="text-2xl md:text-3xl font-extrabold text-orange-600 drop-shadow-sm">
            {{ Math.round(displayDonationCount) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * DonationBarometer Script
 * 
 * Pinia Store Integration für Echtzeit-Spendenstatus
 * 
 * Store Properties (computed):
 * - currentAmount: Aktueller Spendenstand
 * - goalAmount: Kampagnenziel
 * - progress: Automatisch berechneter Fortschritt in %
 * - remainingAmount: Differenz zwischen Ziel und aktuellem Stand
 * - donationCount: Anzahl eingegangener Spenden
 * 
 * formatCurrency():
 * - Formatiert Beträge nach deutschem Standard
 * - Währung: EUR, keine Nachkommastellen
 * - Beispiel: 4200 → "4.200 €"
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useDonationStore } from '~/stores/donation'

const donationStore = useDonationStore()

const animatedProgress = ref(0)
const displayRemainingAmount = ref(0)
const displayDonationCount = ref(0)

const animationDurationMs = 800

const animateValue = (target: number, stateRef: { value: number }) => {
  const startValue = stateRef.value
  const delta = target - startValue
  if (delta === 0) return

  const startTime = performance.now()

  const step = (now: number) => {
    const elapsed = now - startTime
    const t = Math.min(elapsed / animationDurationMs, 1)
    // einfache Ease-Out-Kurve
    const eased = 1 - Math.pow(1 - t, 3)
    stateRef.value = startValue + delta * eased
    if (t < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

onMounted(() => {
  animatedProgress.value = 0
  displayRemainingAmount.value = donationStore.goalAmount
  displayDonationCount.value = 0

  animateValue(donationStore.progress, animatedProgress)
  animateValue(donationStore.remainingAmount, displayRemainingAmount)
  animateValue(donationStore.donationCount, displayDonationCount)
})

watch(
  () => donationStore.progress,
  (newVal) => {
    animateValue(newVal, animatedProgress)
  }
)

watch(
  () => donationStore.remainingAmount,
  (newVal) => {
    animateValue(newVal, displayRemainingAmount)
  }
)

watch(
  () => donationStore.donationCount,
  (newVal) => {
    animateValue(newVal, displayDonationCount)
  }
)

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const formatPlainNumber = (amount: number): string => {
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>
