# SFA Fiches Projet

Application web permettant aux apprentis ESIG de remplir, sauvegarder et partager des fiches de projet web.

**[Ouvrir l'application](https://devjs.ch/fiches/)**

## Fiches disponibles

| Route | Fiche | Phase |
|-------|-------|-------|
| `/cadrage` | Fiche de cadrage | Phase 1 — Objectif, personas, MoSCoW, contraintes, critères |
| `/card-sorting` | Card Sorting | Phase 2 — Cartes, participants, résultats, photos, architecture |
| `/design` | Design & identité visuelle | Phase 3 — Couleurs, typographie, espacements |
| `/maquettes` | Maquettes | Phase 5 — Pages, screenshots, tests utilisateurs |
| `/checklist` | Checklist finale | Phase 9 — 91 items, 11 catégories, 3 niveaux de priorité |

## Fonctionnalités

- Dashboard avec accès à toutes les fiches
- **Identité partagée** : Nom/Prénom/Projet saisis une fois, pré-remplis sur toutes les fiches
- **Navigation entre fiches** : liens précédent/suivant en bas de chaque fiche
- Sauvegarde automatique dans le navigateur (localStorage indépendant par fiche)
- Partage par lien (URL encodée base64)
- **Mode consultation** : l'enseignant ouvre le lien d'un élève en lecture seule (pas d'auto-save)
- **Upload d'images** : photos du tri par cartes, captures de maquettes (compression côté client)
- **Lightbox** : clic sur une image pour l'agrandir
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
| [Nuxt 4](https://nuxt.com/) | Framework (SSG) |
| [Nuxt UI v4](https://ui.nuxt.com/) | Composants UI |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styles utilitaires |
| PHP | API upload images (Infomaniak) |
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
  plugins/
    capture-url-data.client.ts  # Capture ?d= avant vue-router (SSG)
  composables/
    useCadrageData.ts           # State fiche cadrage (Phase 1)
    useCardSortingData.ts       # State card sorting (Phase 2)
    useDesignData.ts            # State design (Phase 3)
    useMaquettesData.ts         # State maquettes (Phase 5)
    useChecklistData.ts         # State checklist (Phase 9, 91 items)
    useFormPersistence.ts       # Générique : localStorage + URL
    useFormExport.ts            # Générique : JSON export + URL sharing
    useImageUpload.ts           # Compression + upload vers API PHP
  components/
    ActionsBar.vue              # Barre d'actions (édition / consultation)
    ImageUpload.vue             # Upload image réutilisable + lightbox
    cadrage/ card-sorting/ design/ maquettes/ checklist/
  utils/url-encoding.ts         # Encodage base64 + conversion legacy
  i18n/fr.ts                    # Chaînes UI en français
  pages/                        # Dashboard + une page par fiche
public/
  api/upload.php                # API PHP upload images
  uploads/                      # Images stockées sur Infomaniak
  .htaccess                     # Cache headers
tests/
  unit/                         # Tests unitaires (Vitest)
  e2e/                          # Tests e2e (Playwright)
```

## Déploiement

| Cible | URL | Déclencheur |
|-------|-----|-------------|
| **Infomaniak** (production) | [devjs.ch/fiches/](https://devjs.ch/fiches/) | Push main + workflow_dispatch |
| **GitHub Pages** (dev) | [fallinov.github.io/sfa-fiches-projet/](https://fallinov.github.io/sfa-fiches-projet/) | Push main |

```bash
# Build pour Infomaniak
NUXT_APP_BASE_URL=/fiches/ npx nuxt build --preset github_pages

# Build pour GitHub Pages
NUXT_APP_BASE_URL=/sfa-fiches-projet/ npx nuxt build --preset github_pages
```

## Versions

- **v1.2** (actuelle) : 5 fiches, upload images, identité partagée, navigation, 33 tests
- **v2** (futur) : comptes élèves/enseignant, BDD MySQL

## Lien avec devjs.ch

Les fiches reprennent les phases 1, 2, 3, 5 et 9 du cours [« Préparer un projet web »](https://devjs.ch/preparer-projet-web/) sur devjs.ch. L'application est hébergée dans le sous-dossier `/fiches/` du même serveur Infomaniak.
