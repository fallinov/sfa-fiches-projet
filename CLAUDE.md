# SFA Fiches Projet — Fiches de projet web interactives

Application web permettant aux apprentis ESIG de remplir, sauvegarder et partager des fiches de projet web (cadrage, card sorting, design, maquettes, checklist).

## Versions

### v1 (actuelle) — Client-side uniquement
- Pas de backend, pas de BDD, pas de comptes
- Persistance : **localStorage** (auto-save) + **URL encodée** (partage) + **JSON** (export/import)
- L'apprenti remplit sa fiche, copie le lien, et le partage à l'enseignant
- Hébergement : **GitHub Pages** (statique)

### v2 (futur) — Avec comptes et BDD
- Auth : comptes élèves + rôle enseignant
- BDD : MySQL Infomaniak
- Dashboard enseignant
- Hébergement : Infomaniak (souveraineté suisse)

## Stack technique (v1)

| Technologie | Rôle |
|-------------|------|
| Nuxt 4 | Framework (SSG pour GitHub Pages) |
| Nuxt UI v4 | Composants UI (Reka UI + Tailwind) |
| Tailwind CSS v4 | Styles utilitaires |
| Vitest | Tests unitaires |
| Playwright | Tests e2e |
| GitHub Pages | Hébergement statique |

## Routes et fiches

| Route | Fiche | Phase du cours |
|-------|-------|----------------|
| `/` | Dashboard | — |
| `/cadrage` | Fiche de cadrage | Phase 1 — Clarification |
| `/card-sorting` | Card Sorting | Phase 2 — Architecture info |
| `/design` | Design & identité visuelle | Phase 3 — Charte graphique |
| `/maquettes` | Maquettes | Phase 5 — Wireframes |
| `/checklist` | Checklist finale (91 items, 11 catégories) | Phase 9 — Validation |

## Architecture

```
app/
  types/forms.ts              # Types partagés (ChecklistItem, BaseFormData)
  composables/
    useCadrageData.ts          # State + CRUD fiche cadrage
    useCardSortingData.ts      # State + CRUD card sorting
    useDesignData.ts           # State + CRUD design
    useMaquettesData.ts        # State + CRUD maquettes
    useChecklistData.ts        # State + CRUD checklist (91 items)
    use*Validation.ts          # Validation + progression par fiche
    useFormPersistence.ts      # Générique : localStorage + URL (paramétrisé par storageKey)
    useFormExport.ts           # Générique : JSON export + URL sharing
  components/
    ActionsBar.vue             # Barre d'actions générique (props)
    cadrage/                   # Composants Phase 1
    card-sorting/              # Composants Phase 2
    design/                    # Composants Phase 3
    maquettes/                 # Composants Phase 5
    checklist/                 # Composants Phase 9
  utils/url-encoding.ts        # Encodage/décodage base64 + conversion legacy
  i18n/fr.ts                   # Toutes les chaînes UI
  pages/                       # Une page par fiche + dashboard index
```

## Conventions

- **Composables par fiche** : chaque fiche a son propre `use*Data.ts` avec types, defaults, CRUD
- **Composables génériques** : `useFormPersistence` et `useFormExport` reçoivent `formData` + `importData` en paramètres
- **ActionsBar** : générique, reçoit les fonctions via props (pas d'import direct de composables)
- **localStorage** : une clé par fiche (`fiche-cadrage-data`, `card-sorting-data`, `design-data`, `maquettes-data`, `checklist-data`)
- **Auto-save** : debounce 500ms + beforeunload + visibilitychange
- **Palette** : teal devjs.ch (`primary` = `#0F766E`), utiliser `text-primary` / `bg-primary/5` (pas emerald/green)

## Liens avec les autres projets

| Projet | Chemin local | Relation |
|--------|-------------|----------|
| **devjs.ch** | `~/WebstormProjects/devjs` | Cours source. Les fiches reprennent les phases 1, 2, 3, 5, 9. |
| **ESIG** | `~/ESIG` | Dossier pédagogique. Cours 113, 122, 141, 741, 822. |

## Contraintes

- **Pas de CDN externe** : polices et assets self-hosted (polices système)
- **Accessibilité** : WCAG AA (formulaires accessibles, contraste, navigation clavier)
- **Mobile-first** : les apprentis utilisent souvent leur téléphone
- **Code en anglais**, interface en français

## Commandes

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run lint         # Vérification ESLint
npm run typecheck    # Vérification TypeScript
npm run test:unit    # Tests unitaires (Vitest)
npm run test:e2e     # Tests e2e (Playwright)
npm run test         # Tous les tests

# Build pour GitHub Pages
NUXT_APP_BASE_URL=/sfa-fiches-projet/ npx nuxt build --preset github_pages
```
