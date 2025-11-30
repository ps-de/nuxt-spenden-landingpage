# 🧡 Spenden-Landingpage

Eine moderne, performance-optimierte Spenden-Landingpage gebaut mit Nuxt 4, Vue 3 und Tailwind CSS v4.

## 📋 Projekt-Übersicht

Diese Single-Page-Landingpage wurde für eine fiktive Hilfsorganisation entwickelt und bietet:

- **Hero-Section** mit Hintergrundbild, Spendenbarometer und animiertem CTA-Button
- **Spendenformular** mit umfassender Validierung (Zod), Fehlerbehandlung und Store-Integration
- **FAQ-Bereich** mit nativen HTML `<details>`/`<summary>` Accordions
- **Echtzeit-Spendenstand** via Pinia State Management
- **Vollständig dokumentierter Code** mit JSDoc und Template-Kommentaren

### 🎯 Features

- ✅ **Lighthouse Score 100%** (Accessibility, Best Practices, SEO)
- ✅ **Responsive Design** - Mobile-First mit Tailwind CSS
- ✅ **SSR/SSG** - Server-Side Rendering mit Nuxt Nitro
- ✅ **Type-Safe** - TypeScript mit Zod-Validierung
- ✅ **Accessibility** - WCAG AA konform, Screen-Reader optimiert
- ✅ **Performance** - Lazy Loading, Code Splitting, optimierte Bilder
- ✅ **CI-Farben** - Orange (orange-600) als primäre Markenfarbe

## 🚀 Quick Start

### Voraussetzungen

- **Node.js**: v18.0.0 oder höher
- **pnpm**: v9.0.0 oder höher (empfohlen)

### Installation

```bash
# Repository klonen
git clone https://github.com/ps-de/nuxt-spenden-landingpage.git
cd nuxt-spenden-landingpage


# Dependencies installieren
pnpm install
```

### Development Server starten

```bash
pnpm dev
```

Die Anwendung ist erreichbar unter: **http://localhost:3000**

### Production Build

```bash
# Build erstellen
pnpm build

# Production Preview
pnpm preview

# Production Server starten
node .output/server/index.mjs
```

## 📁 Projekt-Struktur

```
spenden-landingpage/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css          # Custom Tailwind Styles, CI-Farben, Animationen
│   ├── components/
│   │   ├── DonationBarometer.vue     # Fortschrittsbalken mit Store-Integration
│   │   ├── DonationForm.vue          # Spendenformular mit Zod-Validierung
│   │   ├── FaqSection.vue            # FAQ-Accordion mit Native HTML
│   │   └── HeroSection.vue           # Hero mit Background, CTA, Info-Cards
│   ├── pages/
│   │   └── index.vue                 # Landing Page mit SEO-Meta-Tags
│   └── stores/
│       └── donation.ts               # Pinia Store für Spenden-Management
├── data/
│   └── faq.json                      # FAQ-Daten (id, question, answer)
├── public/
│   └── hero-background.jpg           # Optimiertes Hintergrundbild (616 KB)
├── nuxt.config.ts                    # Nuxt 4 Konfiguration
├── package.json                      # Dependencies & Scripts
└── README.md                         # Diese Datei
```

## 🛠️ Technologie-Stack

### Core Framework
- **Nuxt 4.2.1** – Vue Meta-Framework mit SSR/SSG
- **Vue 3.5.25** – Progressive JavaScript Framework
- **Nitro 2.12.9** – Server Engine für Nuxt

### UI & Styling
- **@nuxt/ui 4.2.1** – Nuxt UI Library mit Komponenten
- **Tailwind CSS v4.1.17** – Utility-First CSS Framework
- **@iconify-json/heroicons** – Icon-Set

### State Management & Validation
- **Pinia 3.0.4** – Official Vue Store (Vuex Nachfolger)
- **Zod 4.1.13** – TypeScript-first Schema-Validierung

### Animations
- **GSAP 3.13.0** – Professionelle Animation-Library
- **v-gsap-nuxt** – GSAP Integration für Nuxt

### Build Tools
- **Vite 7.2.4** – Next Generation Frontend Tooling
- **TypeScript 5.7.2** – Typed JavaScript
- **Terser** – JavaScript Minifier für Production

## 💡 Kurzüberblick: Tech-Entscheidung, KI-Tool-Nutzung, UX

### Tech-Entscheidungen
- **Nuxt 4 + Vue 3** für SSR/SSG und Auto-Import von Komponenten.
- **Tailwind CSS v4 + @nuxt/ui** für schnelles Prototyping, konsistentes Design und gute Responsive Defaults.
- **Pinia + Zod** zur Kombination aus einfachem State-Management (Spendenstand) und strenger Formular-Validierung.

### Einsatz von KI-Tools
- **GitHub Copilot / KI-Assistent** zur Unterstützung bei Boilerplate-Code, Vorschlägen für SEO-/Performance-Tweaks (Lighthouse) und Formulierungen in der README.
- Alle generierten Vorschläge wurden **manuell geprüft, angepasst und konsolidiert**, insbesondere bei UX-Texten, Fehlerbehandlung und Accessibility.

### Wichtige UX-Überlegungen
- **Klarer Funnel**: Hero mit Spendenbarometer und CTA führt direkt zum Formular; FAQ folgt darunter und baut Vertrauen auf.
- **Niedrige Einstiegshürde**: Vordefinierte Beträge, verständliche Fehlermeldungen und Scroll-to-Error reduzieren Friktion beim Spenden.
- **Vertrauen & Transparenz**: Echtzeit-Spendenstand, klare Sprache, keine überladenen Animationen und Fokus auf Lesbarkeit/Kontrast.

## 📦 Verfügbare Scripts

```bash
# Development
pnpm dev              # Startet Dev-Server mit HMR
pnpm build            # Erstellt Production Build
pnpm preview          # Preview des Production Builds

# Code Quality
pnpm typecheck        # TypeScript Type-Checking
```

## 🎨 Design-Entscheidungen

### Farbschema
- **Primärfarbe**: Orange (#ea580c / orange-600)
- **Background Hero**: Slate-900/800 Gradient mit Grayscale-Bild
- **Background Form**: Gray-50 (hell)
- **Background FAQ**: Slate-900/800 (dunkel)

### Typografie
- **System Font Stack**: -apple-system, BlinkMacSystemFont, Segoe UI, etc.
- **Headings**: Extrabold (font-extrabold)
- **Body**: Medium bis Semibold

### Layout-Prinzipien
- **Mobile-First**: Responsive von 320px bis Desktop
- **Kontrast-Wechsel**: Hell/Dunkel für visuellen Rhythmus
- **Flächiges Design**: Keine Borders, bg-gray-100 für Inputs
- **Kompakte Abstände**: Optimiert für Button-Sichtbarkeit

## 🔒 Validierung & Sicherheit

### Zod Schema (DonationForm)
```typescript
{
  name: min 2, max 100 Zeichen
  email: Gültige E-Mail-Adresse
  amount: 5€ - 1.000.000€, ganzzahlig
  newsletter: Boolean (optional)
}
```

### Error Handling
- Client-seitige Validierung mit sofortigem Feedback
- Scroll-to-Error für bessere UX
- Deutsche Fehlermeldungen

## 📊 Performance-Optimierungen

### Implementierte Optimierungen
1. **Bildoptimierung**: Hero-Hintergrundbild lokal ausgeliefert und in der Dateigröße reduziert.
2. **Lazy Loading**: DonationForm & FaqSection below-the-fold
3. **Code Splitting**: Vendor Chunks (Vue, GSAP separat)
4. **Minification**: Terser mit console.log removal
5. **Compression**: Gzip/Brotli für statische Assets
6. **Prerendering**: SSG für `/` Route

### Bundle Sizes (Production)
```
Client Bundle:  ~504 KB (189 KB gzip)
Server Bundle:  ~320 KB (91.5 KB gzip)
Total Assets:   4.65 MB (1.1 MB gzip)
```

## ♿ Accessibility (A11y)

### WCAG AA Compliance
- ✅ `<html lang="de">` Attribut
- ✅ Semantische HTML-Struktur (H1-H3)
- ✅ Ausreichende Farbkontraste (4.5:1+)
- ✅ Keyboard-Navigation für alle interaktiven Elemente
- ✅ Screen-Reader-Only Elements (`sr-only` für H1)
- ✅ Alt-Texte für alle Bilder
- ✅ Native `<details>` für Accordions

## 🔍 SEO-Optimierungen

### Meta Tags
- `<title>` - Jetzt Spenden - Gemeinsam für eine bessere Zukunft
- `<meta name="description">` - 155 Zeichen optimiert
- Open Graph Tags (og:title, og:description, og:type)
- `theme-color` für PWA-Support

### Strukturierte Daten
- HTML5-Semantik (`<section>`, `<nav>`, `<article>`)
- Schema.org Markup (TODO: JSON-LD für Non-Profit)

## 📝 Code-Dokumentation

Alle Komponenten sind vollständig dokumentiert:
- **Template-Header**: Komponenten-Übersicht und Design-Entscheidungen
- **JSDoc**: Funktionen, Props, Validierungsregeln
- **Inline-Kommentare**: Komplexe Logik und UX-Features

Beispiel siehe: `app/components/DonationForm.vue`

## 🤝 Contribution Guidelines

### Code-Style
- Bevorzugt TypeScript für neue Dateien (insb. Logik/Stores)
- Vue 3 Composition API (`<script setup>`)
- Tailwind Utility Classes (keine custom CSS außer Animationen)
- JSDoc für zentrale Export-APIs (insb. Store)


## 📄 Lizenz

Dieses Projekt wurde für Bewerbungszwecke erstellt.

**Hintergrundbild-Lizenz**: Unsplash (kostenlos für kommerzielle Nutzung)  
Quelle: https://unsplash.com/photos/1488521787991-ed7bbaae773c

## 👨‍💻 Autor

**Entwickelt von**: Peter Schulte  
**Kontakt**: hallo@peter-schulte.de  
**GitHub**: [@ps-de](https://github.com/ps-de)

## 🙏 Danksagungen

- **Nuxt Team** - Für das exzellente Meta-Framework
- **Tailwind Labs** - Für Tailwind CSS v4
- **Unsplash** - Für das kostenlose Bildmaterial
- **GreenSock (GSAP)** - Für die Animation-Library

---

**Last Updated**: November 2025
