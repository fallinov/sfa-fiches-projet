# SFA Fiches Projet — Fiches de cadrage interactives

Application web permettant aux apprentis ESIG de remplir, sauvegarder et partager des fiches de cadrage projet.

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
| Nuxt 3 | Framework (SSG pour GitHub Pages) |
| Nuxt UI | Composants UI (formulaires, boutons, notifications) |
| Tailwind CSS | Styles (inclus via Nuxt UI) |
| GitHub Pages | Hébergement statique |

## Types de fiches

| Fiche | Phase | Statut |
|-------|-------|--------|
| Fiche de cadrage | Phase 1 — Clarification | Existante (à migrer depuis devjs.ch) |
| Fiche maquettes | Phase 5 — Maquettes | À créer |
| Checklist finale | Phase 9 — Validation | À créer |

## Fonctionnalités v1

- Formulaire interactif avec sections dynamiques (personas, fonctionnalités, critères)
- Auto-save localStorage à chaque modification
- Bouton « Copier le lien » : URL encodée base64 partageable
- Bouton « Télécharger JSON » : export fichier
- Bouton « Importer JSON » : restaurer depuis un fichier
- Bouton « Réinitialiser » avec confirmation
- Responsive (mobile-first)
- Compatible impression (barre cachée en print)

## Liens avec les autres projets

| Projet | Chemin local | Relation |
|--------|-------------|----------|
| **devjs.ch** | `~/WebstormProjects/devjs` | Contient la fiche actuelle en HTML statique (`docs/public/preparer-projet-web/fiche-cadrage-projet.html`). Sera remplacée par un lien vers cette app. |
| **ESIG** | `~/ESIG` | Dossier pédagogique. Les fiches sont utilisées dans les cours 113, 122, 141, 741, 822. |

## Contraintes

- **Pas de CDN externe** : polices et assets self-hosted
- **Accessibilité** : WCAG AA (formulaires accessibles, contraste, navigation clavier)
- **Mobile-first** : les apprentis utilisent souvent leur téléphone
- **Code en anglais**, interface en français

## Migration depuis devjs.ch

La fiche HTML actuelle sur devjs.ch reste en place. Une fois cette app déployée :
1. Reprendre les mêmes champs et la même structure
2. Ajouter le routage Nuxt (une page par type de fiche)
3. Rediriger l'ancienne URL vers la nouvelle app
4. Supprimer le fichier HTML de devjs.ch

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
