# SFA Fiches Projet

Application web permettant aux apprentis ESIG de remplir, sauvegarder et partager des fiches de projet web.

**[Ouvrir l'application](https://fallinov.github.io/sfa-fiches-projet/)**

## Fiches disponibles

| Route | Fiche | Phase |
|-------|-------|-------|
| `/cadrage` | Fiche de cadrage | Phase 1 — Objectif, personas, MoSCoW, contraintes, critères |
| `/card-sorting` | Card Sorting | Phase 2 — Cartes, participants, résultats, architecture |
| `/design` | Design & identité visuelle | Phase 3 — Couleurs, typographie, espacements |
| `/maquettes` | Maquettes | Phase 5 — Pages, tests utilisateurs, itérations |
| `/checklist` | Checklist finale | Phase 9 — 91 items, 11 catégories, 3 niveaux de priorité |

## Fonctionnalités

- Dashboard avec accès à toutes les fiches
- Sauvegarde automatique dans le navigateur (localStorage indépendant par fiche)
- Partage par lien (URL encodée base64)
- Export/import JSON
- Impression optimisée (print styles)
- Validation client (champs obligatoires)
- Compteur de progression par fiche
- Raccourcis clavier (Ctrl+Entrée pour ajouter un élément)
- Compatible avec l'ancien format de la fiche devjs.ch
- Accessible WCAG AA
- Responsive mobile-first

## Stack technique

| Technologie | Rôle |
|-------------|------|
| [Nuxt 4](https://nuxt.com/) | Framework (SSG pour GitHub Pages) |
| [Nuxt UI v4](https://ui.nuxt.com/) | Composants UI |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styles utilitaires |
| [Playwright](https://playwright.dev/) | Tests e2e |
| [Vitest](https://vitest.dev/) | Tests unitaires |

## Installation

```bash
npm install
```

## Commandes

```bash
npm run dev          # Serveur de développement
npm run build        # Build production
npm run lint         # Vérification ESLint
npm run typecheck    # Vérification TypeScript
npm run test:unit    # Tests unitaires (Vitest)
npm run test:e2e     # Tests e2e (Playwright)
npm run test         # Tous les tests
```

## Structure du projet

```
app/
  types/forms.ts                # Types partagés (ChecklistItem)
  composables/
    useCadrageData.ts           # State fiche cadrage (Phase 1)
    useCardSortingData.ts       # State card sorting (Phase 2)
    useDesignData.ts            # State design (Phase 3)
    useMaquettesData.ts         # State maquettes (Phase 5)
    useChecklistData.ts         # State checklist (Phase 9, 91 items)
    use*Validation.ts           # Validation + progression par fiche
    useFormPersistence.ts       # Générique : localStorage + URL
    useFormExport.ts            # Générique : JSON export + URL sharing
  components/
    ActionsBar.vue              # Barre d'actions générique
    cadrage/                    # Composants Phase 1
    card-sorting/               # Composants Phase 2
    design/                     # Composants Phase 3
    maquettes/                  # Composants Phase 5
    checklist/                  # Composants Phase 9
  utils/url-encoding.ts         # Encodage base64 + conversion legacy
  i18n/fr.ts                    # Chaînes UI en français
  pages/                        # Dashboard + une page par fiche
tests/
  unit/                         # Tests unitaires (Vitest)
  e2e/                          # Tests e2e (Playwright)
```

## Déploiement

Déployé automatiquement sur [GitHub Pages](https://fallinov.github.io/sfa-fiches-projet/) via GitHub Actions à chaque push sur `main`.

```bash
# Build local pour GitHub Pages
NUXT_APP_BASE_URL=/sfa-fiches-projet/ npx nuxt build --preset github_pages
```

## Versions

- **v1 (actuelle)** : client-side uniquement, 5 fiches, 32 tests
- **v2 (futur)** : comptes élèves/enseignant, BDD MySQL, hébergement Infomaniak

## Lien avec devjs.ch

Les fiches reprennent les phases 1, 2, 3, 5 et 9 du cours [« Préparer un projet web »](https://devjs.ch/preparer-projet-web/) sur devjs.ch. Les liens partagés depuis l'ancienne fiche HTML sont automatiquement compatibles.
