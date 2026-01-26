

## Povzetek sprememb

Ta načrt bo povečal slike v sliderju projektov in poenotil razmike (margin/padding) z ostalimi sekcijami na strani.

---

## Tehnične podrobnosti

### 1. Povečanje velikosti slike

Trenutno stanje:
- Slika ima `aspect-[4/3]` razmerje stranic
- Širina slide-a je `flex-[0_0_75%]` na mobilnem, `flex-[0_0_45%]` na tablici, `flex-[0_0_35%]` na namiznem

Spremembe:
- Povečaj razmerje slike na `aspect-[16/10]` za višjo sliko
- Povečaj širino slide-ov za večji prikaz:
  - Mobilno: `flex-[0_0_85%]` (namesto 75%)
  - Tablica: `flex-[0_0_55%]` (namesto 45%)
  - Namizno: `flex-[0_0_45%]` (namesto 35%)

### 2. Standardizacija razmikov (margin/padding)

Primerjava s standardom:
- CollaborationSection: `py-16 md:py-24`
- PricingSection: `py-16 md:py-24`
- ProjectSlider (trenutno): `py-12 md:py-0` ❌

Sprememba:
- Posodobi ProjectSlider na `py-16 md:py-24` za konsistentnost

---

## Datoteke za spremembo

**src/components/ProjectSlider.tsx**
- Vrstica 115: Spremeni `py-12 md:py-0` → `py-16 md:py-24`
- Vrstica 123: Spremeni slide širine na večje vrednosti
- Vrstica 132: Spremeni `aspect-[4/3]` → `aspect-[16/10]`

