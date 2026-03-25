# Rapport d'audit UX/UI — SFA Fiches Projet

**Date** : 25 mars 2026
**Auditeur** : Claude Code
**Pages/ecrans audites** : Page unique (fiche de cadrage)
**Stack** : Nuxt 4 + Nuxt UI v4 + Tailwind CSS v4
**Regles UX du projet appliquees** : Aucune KB specifique

---

## Resume executif

| Categorie | Score | Poids | Statut |
|-----------|-------|-------|--------|
| Accessibilite | 6/10 | 30% | orange |
| Utilisabilite | 7/10 | 25% | orange |
| Coherence | 8/10 | 15% | vert |
| Mobile | 5/10 | 20% | orange |
| Flux UX | 8/10 | 10% | vert |
| **Score global pondere** | **6.5/10** | | **orange** |

| Sous-critere | Evaluation |
|--------------|------------|
| Daltonisme | non conforme (MoSCoW = couleur seule) |
| Lecteur d'ecran | a ameliorer (checkbox + combobox sans label) |
| Navigation clavier | conforme |
| Responsive | a ameliorer (tableau MoSCoW tronque sur mobile) |

---

## Problemes critiques (bloquants)

| # | Categorie | Probleme | Impact | Utilisateurs affectes | Solution | Effort |
|---|-----------|----------|--------|----------------------|----------|--------|
| C1 | A11y | MoSCoW: priorite transmise uniquement par la couleur (WCAG 1.4.1) | Daltoniens ne distinguent pas les priorites | ~6% des utilisateurs males | Ajouter un badge textuel ou icone a chaque priorite | 1h |
| C2 | A11y | Checkboxes criteres sans label accessible (WCAG 4.1.2) | Lecteur d'ecran dit « checkbox » sans contexte | Utilisateurs malvoyants | Ajouter `aria-label` sur chaque UCheckbox | 15min |
| C3 | A11y | Combobox priorite sans label accessible | Lecteur d'ecran dit « combobox » sans nom | Utilisateurs malvoyants | Ajouter `aria-label="Priorite fonctionnalite N"` | 15min |
| C4 | Mobile | Touch targets < 44px (size="xs" = ~24px) | Difficulte a cliquer sur les boutons supprimer | Utilisateurs mobiles (majorite) | Passer tous les `size="xs"` a `size="sm"` minimum | 30min |

---

## Problemes majeurs (a corriger)

| # | Categorie | Probleme | Impact | Solution | Effort |
|---|-----------|----------|--------|----------|--------|
| M1 | Typo | h2 de section = text-base (16px) = meme taille que le corps | Hierarchie visuelle affaiblie | Passer a `text-lg font-bold` | 15min |
| M2 | Typo | Pas d'interligne explicite (leading-*) | Lisibilite non garantie WCAG | Ajouter `leading-relaxed` au body | 10min |
| M3 | Mobile | Tableau MoSCoW tronque sur 375px (colonne Priorite coupee) | Fonctionnalite inutilisable mobile | Elargir le select ou passer en layout vertical sur mobile | 1h |
| M4 | A11y | Criteres coches : opacity-60 = contraste insuffisant en dark mode | Texte illisible | Utiliser `opacity-70` + `text-muted` | 10min |
| M5 | UX | Pas de validation cote client (Nielsen #5, #9) | Utilisateur ne sait pas quoi corriger | Ajouter validation legere sur les champs cles | 2h |
| M6 | A11y | Colonne vide dans l'en-tete du tableau MoSCoW | Confus pour technologies d'assistance | Ajouter `aria-label="Actions"` | 5min |
| M7 | A11y | Contraste boutons ghost sur fond gris-900 (ActionsBar) | Boutons export/import peu visibles | Verifier ratio et ajuster si < 3:1 | 15min |

---

## Ameliorations recommandees

| # | Categorie | Constat | Recommandation | Effort |
|---|-----------|---------|----------------|--------|
| R1 | UX | Boutons « Exporter JSON », « Importer JSON » = jargon technique | Utiliser « Telecharger la fiche », « Charger une fiche » | 10min |
| R2 | UX | Indicateur « Sauvegarde auto » en text-xs (12px), cache sur mobile | Augmenter en text-sm + icone check-circle + visible sur mobile | 15min |
| R3 | A11y | Sections formulaire sans `fieldset`/`legend` | Envelopper chaque section dans un fieldset semantique | 30min |
| R4 | UX | Pas de raccourcis clavier (Ctrl+Entree pour ajouter, Suppr) | Ajouter pour les power users (Nielsen #7) | 1h |
| R5 | Typo | Descriptions de section en text-sm (14px) | Ajouter `lg:text-base` pour desktop | 10min |
| R6 | Mobile | ActionsBar ne collapse pas sur tres petits ecrans | Icons-only sur mobile, labels sur desktop | 30min |
| R7 | UX | Placeholder MoSCoW priority = « — » (ambigu) | Changer en « Selectionner une priorite » | 5min |

---

## Points positifs

- HTML semantique : `<nav>`, `<main>`, `<header>`, `<footer>` avec landmarks corrects
- Un seul `<h1>` par page, hierarchie h1 → h2 coherente
- Tous les inputs dans `<UFormField>` = labels associes automatiquement
- `aria-label` descriptifs sur tous les boutons icon-only (« Supprimer fonctionnalite 3 »)
- `autocomplete="family-name"` / `"given-name"` sur les champs identite
- `type="date"`, `type="number"` avec `min`/`max` sur les champs adaptes
- `<html lang="fr">` defini
- Palette de couleurs coherente et limitee (teal + slate)
- Icones Lucide coherentes dans tout le projet
- Architecture Atomic Design respectee (composants reutilisables)
- i18n centralise (pret pour l'internationalisation)
- Auto-save avec debounce + beforeunload + visibilitychange
- Console navigateur propre : 0 erreurs, 0 warnings
- Responsive grid (1 colonne mobile → 2-3 colonnes desktop)

---

## Plan d'action recommande

### Phase 1 — Accessibilite (priorite maximale)
1. [ ] C1: Ajouter badges textuels aux couleurs MoSCoW
2. [ ] C2: `aria-label` sur les checkboxes des criteres
3. [ ] C3: `aria-label` sur les combobox de priorite
4. [ ] C4: Augmenter touch targets (size="xs" → size="sm")
5. [ ] M6: `aria-label="Actions"` sur la colonne vide du tableau

### Phase 2 — Typographie & Mobile
6. [ ] M1: h2 sections → `text-lg font-bold`
7. [ ] M2: Ajouter `leading-relaxed` au corps de texte
8. [ ] M3: Adapter le tableau MoSCoW pour mobile
9. [ ] M4: Corriger contraste criteres coches (opacity)
10. [ ] R2: Ameliorer indicateur auto-save

### Phase 3 — UX
11. [ ] M5: Validation legere cote client
12. [ ] R1: Revoir les libelles des boutons
13. [ ] R6: ActionsBar responsive (icons-only mobile)
14. [ ] R4: Raccourcis clavier

---

## Checklist de validation finale

- [ ] Contraste AA sur tous les textes (verifier avec Axe DevTools)
- [ ] Navigation clavier complete (Tab, Shift+Tab, Entree, Echap)
- [ ] Touch targets >= 44px sur tous les elements interactifs
- [ ] Pas de scroll horizontal mobile
- [ ] Feedback sur toutes les actions (toast, indicateur)
- [ ] Messages d'erreur explicites (validation)
- [ ] Info non transmise par la couleur seule (MoSCoW)
- [ ] Lecteur d'ecran : tous les inputs/boutons identifies
- [ ] Test daltonisme (protanopie + deuteranopie)

---

## Bareme de notation

| Score | Signification |
|-------|---------------|
| 9-10 | Excellent — Aucun probleme majeur |
| 7-8 | Bon — Quelques ameliorations mineures |
| 5-6 | Acceptable — Problemes a corriger |
| 3-4 | Insuffisant — Problemes majeurs |
| 0-2 | Critique — Inutilisable |
