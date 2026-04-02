# SFA Fiches Projet — Fiches de projet web interactives

Application web permettant aux apprentis ESIG de remplir, sauvegarder et partager des fiches de projet web (cadrage, card sorting, design, maquettes, checklist).

## Versions

### v1 (actuelle) — Client-side + API upload
- Persistance : **localStorage** (auto-save) + **URL encodée** (partage) + **JSON** (export/import)
- Upload d'images via **API PHP** sur Infomaniak
- L'apprenti remplit sa fiche, copie le lien, et le partage à l'enseignant
- L'enseignant ouvre le lien en **mode consultation** (lecture seule, pas d'auto-save)
- Hébergement : **Infomaniak** (production) + **GitHub Pages** (dev/preview)

### v2 (futur) — Avec comptes et BDD
- Auth : comptes élèves + rôle enseignant
- BDD : MySQL Infomaniak
- Dashboard enseignant

## Stack technique

| Technologie | Rôle |
|-------------|------|
| Nuxt 4 | Framework (SSG) |
| Nuxt UI v4 | Composants UI (Reka UI + Tailwind) |
| Tailwind CSS v4 | Styles utilitaires |
| PHP | API upload images (Infomaniak) |
| Vitest | Tests unitaires |
| Playwright | Tests e2e |

## Hébergement

| Cible | URL | Rôle |
|-------|-----|------|
| Infomaniak (FTP) | `devjs.ch/fiches/` | Production |
| GitHub Pages | `fallinov.github.io/sfa-fiches-projet/` | Dev/preview |

## Routes et fiches

| Route | Fiche | Phase du cours |
|-------|-------|----------------|
| `/` | Dashboard | — |
| `/cadrage` | Fiche de cadrage | Phase 1 — Clarification |
| `/card-sorting` | Card Sorting + photos | Phase 2 — Architecture info |
| `/design` | Design & identité visuelle | Phase 3 — Charte graphique |
| `/maquettes` | Maquettes + screenshots | Phase 5 — Wireframes |
| `/checklist` | Checklist finale (101 items, 11 catégories) | Phase 9 — Validation |

## Architecture

```
app/
  types/forms.ts              # Types partagés (ChecklistItem, BaseFormData)
  plugins/
    capture-url-data.client.ts # Capture ?d= avant que vue-router ne le supprime
  composables/
    useCadrageData.ts          # State + CRUD fiche cadrage (+ repoUrl, siteUrl)
    useCardSortingData.ts      # State + CRUD card sorting (ArchitectureNode[], photos[])
    useDesignData.ts           # State + CRUD design (couleurs, polices, logo, moodboard, arrondis, ombres, icônes, identité)
    useMaquettesData.ts        # State + CRUD maquettes (+ mockupUrl, screenshotUrl)
    useChecklistData.ts        # State + CRUD checklist (101 items)
    use*Validation.ts          # Validation + progression par fiche
    useFormPersistence.ts      # Générique : localStorage + URL (paramétrisé)
    useFormExport.ts           # Générique : JSON export + URL sharing
    useImageUpload.ts          # Compression canvas + POST vers API PHP
    useStudentIdentity.ts      # Identité partagée entre fiches (localStorage)
  components/
    ActionsBar.vue             # Barre d'actions générique (props, mode consultation)
    ImageUpload.vue            # Upload image réutilisable (clic + drag & drop, preview, lightbox)
    FormNavigation.vue         # Navigation précédent/suivant + lien cours devjs.ch + version
    cadrage/                   # Composants Phase 1
    card-sorting/              # Composants Phase 2 (arborescence interactive, photos avec lightbox nav/zoom, impression cartes)
    design/                    # Composants Phase 3 (10 sections : moodboard, identité, logo, couleurs/contraste, typo, icônes, espacements, arrondis, ombres, checklist + tooltips bonnes pratiques)
    maquettes/                 # Composants Phase 5
    checklist/                 # Composants Phase 9
  utils/url-encoding.ts        # Encodage/décodage base64 + conversion legacy
  i18n/fr.ts                   # Toutes les chaînes UI
  pages/                       # Une page par fiche + dashboard index
public/
  api/upload.php               # API PHP upload images (déployé via FTP)
  uploads/                     # Images uploadées (créé par PHP sur Infomaniak)
  .htaccess                    # Cache headers (no-cache HTML, immutable assets)
```

## Conventions

- **Composables par fiche** : chaque fiche a son propre `use*Data.ts` avec types, defaults, CRUD
- **Composables génériques** : `useFormPersistence` et `useFormExport` reçoivent `formData` + `importData` en paramètres
- **ActionsBar** : générique, reçoit les fonctions via props (pas d'import direct de composables). Le partage ne valide plus les champs obligatoires
- **localStorage** : une clé par fiche (`fiche-cadrage-data`, `card-sorting-data`, etc.) + `student-identity` partagé
- **Identité partagée** : `useStudentIdentity` sauve Nom/Prénom/Projet dans un localStorage commun, pré-remplit les nouvelles fiches
- **Auto-save** : debounce 500ms + beforeunload + visibilitychange. Désactivé en mode consultation (?d=)
- **Palette** : teal devjs.ch (`primary` = `#0F766E`), utiliser `text-primary` / `bg-primary/5` (pas emerald/green)
- **useState = shallowRef** : toujours `formData.value = { ...formData.value, ...raw }` + `triggerRef(formData)`, jamais `Object.assign`
- **Icônes** : bundlées côté client via `icon.clientBundle.scan: true` (pas de CDN iconify)
- **URL partagée** : le `?d=` est capturé par un plugin client AVANT que vue-router ne le supprime en SSG
- **Architecture card sorting** : `ArchitectureNode[]` (id, label, depth) — liste plate avec indentation visuelle, rétrocompatible avec l'ancien format string
- **Version** : exposée via `runtimeConfig.public.appVersion` depuis `package.json`, affichée dans le footer
- **Lightbox photos** : navigation clavier (←/→/Escape), boutons prev/next, zoom au clic, compteur

## Pièges SSG connus

1. `useState` est un `shallowRef` → spread + `triggerRef`, jamais `Object.assign`
2. vue-router supprime les query params en SSG → plugin `capture-url-data.client.ts`
3. Nuxt Icon charge depuis CDN en navigation SPA → `clientBundle.scan: true`
4. `package-lock.json` doit correspondre à la version Node du CI (Node 24)
5. Cache navigateur sur Infomaniak → `.htaccess` no-cache sur HTML

## Liens avec les autres projets

| Projet | Chemin local | Relation |
|--------|-------------|----------|
| **devjs.ch** | `~/WebstormProjects/devjs` | Cours source + hébergement Infomaniak partagé |
| **ESIG** | `~/ESIG` | Dossier pédagogique. Cours 113, 122, 141, 741, 822. |

## Contraintes

- **Pas de CDN externe** : polices système, icônes bundlées, pas d'API iconify
- **Souveraineté** : hébergé chez Infomaniak (Suisse), images stockées sur le même serveur
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

# Build pour Infomaniak
NUXT_APP_BASE_URL=/fiches/ npx nuxt build --preset github_pages
```
