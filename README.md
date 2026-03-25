# SFA Fiches Projet

Application web permettant aux apprentis ESIG de remplir, sauvegarder et partager des fiches de cadrage projet.

**[Ouvrir l'application](https://fallinov.github.io/sfa-fiches-projet/)**

## Fonctionnalités

- Formulaire interactif avec 5 sections : objectif, personas, fonctionnalités MoSCoW, contraintes, critères de succès
- Sections dynamiques (ajouter/supprimer des personas, fonctionnalités, critères)
- Sauvegarde automatique dans le navigateur (localStorage)
- Partage par lien (URL encodée base64)
- Export/import JSON
- Compatible avec l'ancien format de la fiche devjs.ch
- Responsive mobile-first
- Compatible impression

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
  assets/css/main.css     # Styles globaux + print
  components/
    ActionsBar.vue        # Barre d'actions (partager, export, import, reset)
    form/
      FormHeader.vue      # En-tête : nom, prénom, date
      SectionObjective.vue
      SectionPersonas.vue + PersonaBlock.vue
      SectionFeatures.vue + FeatureRow.vue (tableau MoSCoW)
      SectionConstraints.vue
      SectionCriteria.vue + CriterionRow.vue
  composables/
    useFormData.ts        # State réactif + CRUD
    useFormPersistence.ts # localStorage + URL decoding
    useFormExport.ts      # JSON export + URL sharing
  i18n/fr.ts              # Chaînes UI en français
  utils/url-encoding.ts   # Encodage/décodage base64 + legacy format
  pages/index.vue         # Page unique
  app.vue                 # Layout racine
tests/
  unit/                   # Tests unitaires Vitest
  e2e/                    # Tests e2e Playwright
```

## Déploiement

Le site est déployé automatiquement sur [GitHub Pages](https://fallinov.github.io/sfa-fiches-projet/) via GitHub Actions à chaque push sur `main`.

```bash
# Build local pour GitHub Pages
NUXT_APP_BASE_URL=/sfa-fiches-projet/ npx nuxt build --preset github_pages
```

## Versions

- **v1 (actuelle)** : client-side uniquement, pas de backend
- **v2 (futur)** : comptes élèves/enseignant, BDD MySQL, hébergement Infomaniak

## Lien avec devjs.ch

Cette application remplace la [fiche de cadrage HTML statique](https://devjs.ch/preparer-projet-web/fiche-cadrage-projet.html) sur devjs.ch. Les liens partagés depuis l'ancienne fiche sont automatiquement compatibles grâce à la conversion du format legacy.
