/**
 * donation.ts - Pinia Store für Spendenverwaltung
 * 
 * Zentrale State-Management Lösung für Spendenkampagne
 * 
 * State:
 * - currentAmount: Aktueller Spendenstand in EUR (Startwert: 4200)
 * - goalAmount: Kampagnenziel in EUR (10000)
 * - donationCount: Anzahl eingegangener Spenden (Startwert: 42)
 * 
 * Computed Properties:
 * - progress: Berechneter Fortschritt in % (currentAmount / goalAmount * 100)
 * - remainingAmount: Noch benötigter Betrag (goalAmount - currentAmount)
 * 
 * Actions:
 * - addDonation(): Neue Spende hinzufügen, currentAmount und donationCount aktualisieren
 * 
 * Beispiel-Daten:
 * - Start: 4.200€ / 10.000€ = 42%
 * - 42 Spenden bereits eingegangen
 * - Bei neuer Spende: Amount addiert, Count +1
 * 
 * Integration:
 * - DonationBarometer: Anzeige von progress, amounts, count
 * - DonationForm: addDonation() nach erfolgreichem Submit
 */
import { defineStore } from 'pinia'

export const useDonationStore = defineStore('donation', {
  // State: Reactive Spendendaten
  state: () => ({
    currentAmount: 4200,  // Aktueller Spendenstand in EUR (Beispielwert für Demo)
    goalAmount: 10000,    // Kampagnenziel in EUR
    donations: [] as Array<{
      name: string        // Spendername
      email: string       // E-Mail für Spendenbescheinigung
      amount: number      // Spendenbetrag in EUR
      newsletter: boolean // Newsletter-Opt-in
      timestamp: Date     // Zeitstempel der Spende
    }>
  }),

  // Getters: Computed Properties (automatisch reactive)
  getters: {
    /**
     * Progress in % (0-100)
     * Math.min verhindert Werte > 100% bei Übererfüllung
     */
    progress: (state) => {
      return Math.min((state.currentAmount / state.goalAmount) * 100, 100)
    },
    
    /**
     * Noch benötigter Betrag in EUR
     * Math.max verhindert negative Werte bei Übererfüllung
     */
    remainingAmount: (state) => {
      return Math.max(state.goalAmount - state.currentAmount, 0)
    },
    
    /**
     * Anzahl aller Spenden (Array-Length)
     */
    donationCount: (state) => {
      return state.donations.length
    }
  },

  // Actions: Methoden zur State-Manipulation
  actions: {
    /**
     * Neue Spende hinzufügen
     * 
     * 1. Donation-Objekt mit Timestamp zu Array hinzufügen
     * 2. currentAmount um Spendenbetrag erhöhen
     * 
     * Wird aufgerufen von DonationForm nach erfolgreichem Submit
     */
    addDonation(donation: {
      name: string
      email: string
      amount: number
      newsletter: boolean
    }) {
      // Spende mit Timestamp zu Array hinzufügen
      this.donations.push({
        ...donation,
        timestamp: new Date()
      })
      // Aktuellen Spendenstand erhöhen
      this.currentAmount += donation.amount
    }
  }
})
