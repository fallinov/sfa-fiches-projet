import type { ChecklistItem } from '~/types/forms'

export type Priority = 'essential' | 'important' | 'recommended'

export interface ChecklistCategory {
  id: string
  title: string
  items: (ChecklistItem & { priority: Priority })[]
}

export interface ChecklistData {
  studentLastName: string
  studentFirstName: string
  date: string
  projectName: string
  categories: ChecklistCategory[]
  exceptions: string
  knownBugs: string
  testedDevices: string
  testedBrowsers: string
  decision: '' | 'ready' | 'reservations' | 'corrections'
}

let idCounter = 0

function generateId(): string {
  return `cl-${++idCounter}`
}

function item(text: string, priority: Priority): ChecklistItem & { priority: Priority } {
  return { id: generateId(), checked: false, text, priority }
}

function createDefaultData(): ChecklistData {
  return {
    studentLastName: '',
    studentFirstName: '',
    date: '',
    projectName: '',
    categories: [
      {
        id: generateId(),
        title: '1. Clarification du projet',
        items: [
          item('Objectif du site défini en une phrase claire', 'essential'),
          item('Public cible identifié', 'essential'),
          item('Persona créé', 'important'),
          item('Fonctionnalités listées et priorisées (MoSCoW)', 'essential'),
          item('Contraintes documentées', 'important'),
          item('Critères de succès définis', 'important')
        ]
      },
      {
        id: generateId(),
        title: '2. Architecture de l\'information',
        items: [
          item('Structure de navigation définie', 'essential'),
          item('Card sorting effectué (3+ personnes)', 'important'),
          item('Menu logique et clair', 'essential'),
          item('Fil d\'Ariane prévu (si site > 2 niveaux)', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '3. Design et identité visuelle',
        items: [
          item('Palette de couleurs définie (3-4 couleurs max)', 'essential'),
          item('Couleurs accessibles (contrastes validés)', 'essential'),
          item('Maximum 2 familles de polices', 'essential'),
          item('Taille de police ≥ 16px pour le corps de texte', 'essential'),
          item('Échelle typographique définie', 'important'),
          item('Espacements standardisés (multiples de 8px)', 'important'),
          item('Charte graphique documentée', 'important'),
          item('Règle 60-30-10 appliquée aux couleurs', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '4. Ergonomie et UX',
        items: [
          item('Ratio de contraste ≥ 4.5:1 (texte normal)', 'essential'),
          item('Ratio de contraste ≥ 3:1 (grand texte ≥18px)', 'essential'),
          item('Longueur des lignes ≈ 65-80 caractères', 'essential'),
          item('Interligne de 1.5 minimum', 'important'),
          item('Texte aligné à gauche', 'important'),
          item('Zones cliquables ≥ 48×48px sur mobile', 'essential'),
          item('Espacement suffisant entre éléments cliquables', 'essential'),
          item('Feedback pour toutes les actions utilisateur', 'essential'),
          item('Messages d\'erreur clairs et constructifs', 'essential'),
          item('États hover/focus/active définis', 'important'),
          item('Indicateurs de chargement prévus', 'important'),
          item('Logo cliquable vers l\'accueil', 'essential'),
          item('Menu visible et cohérent sur toutes les pages', 'essential'),
          item('Indicateur de page active', 'essential'),
          item('Possibilité de revenir en arrière', 'important'),
          item('Labels visibles pour tous les champs', 'essential'),
          item('Champs obligatoires clairement indiqués', 'essential'),
          item('Validation avec messages explicites', 'essential'),
          item('Nombre de champs minimisé', 'important'),
          item('Types de champs appropriés', 'important'),
          item('Autocomplétion activée où pertinent', 'recommended'),
          item('Placement des éléments clés suit le pattern Z (logo haut-gauche, CTA bas-droite)', 'important'),
          item('Éléments liés regroupés visuellement — loi de proximité', 'important'),
          item('Navigation limitée à 5-7 items principaux — loi de Miller', 'important')
        ]
      },
      {
        id: generateId(),
        title: '5. Maquettes',
        items: [
          item('Maquettes créées avant le code', 'essential'),
          item('Version mobile ET desktop maquettées', 'important'),
          item('Tests utilisateurs effectués', 'important'),
          item('Retours intégrés et itérés', 'important'),
          item('Interactions documentées', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '6. Accessibilité',
        items: [
          item('HTML sémantique (header, nav, main, footer)', 'essential'),
          item('Hiérarchie des titres respectée (h1 → h2 → h3)', 'essential'),
          item('Un seul <h1> par page', 'essential'),
          item('Langue de la page déclarée', 'essential'),
          item('Landmarks ARIA correctement utilisés', 'important'),
          item('Alt text sur toutes les images informatives', 'essential'),
          item('Alt="" sur les images décoratives', 'essential'),
          item('Vidéos sous-titrées', 'important'),
          item('Transcriptions audio disponibles', 'recommended'),
          item('Information jamais transmise par la couleur seule', 'essential'),
          item('Couleur + icône/texte/motif pour les états', 'essential'),
          item('Test daltonisme effectué', 'important'),
          item('Palette compatible daltonisme', 'recommended'),
          item('Tous les éléments interactifs accessibles au clavier', 'essential'),
          item('Focus visible sur tous les éléments', 'essential'),
          item('Ordre de tabulation logique', 'essential'),
          item('Pas de piège clavier', 'important'),
          item('Skip link vers le contenu principal', 'recommended'),
          item('Labels associés aux champs (for/id)', 'essential'),
          item('Erreurs identifiées et décrites', 'essential'),
          item('aria-describedby pour les instructions', 'important'),
          item('aria-invalid pour les champs en erreur', 'important')
        ]
      },
      {
        id: generateId(),
        title: '7. Performance',
        items: [
          item('Temps de chargement < 3 secondes', 'essential'),
          item('Score Lighthouse Performance > 70', 'essential'),
          item('Images optimisées', 'important'),
          item('Lazy loading pour les images hors écran', 'important'),
          item('Score Lighthouse Performance > 90', 'recommended'),
          item('CSS/JS minifiés', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '8. Responsive design',
        items: [
          item('Site utilisable sur mobile (320px minimum)', 'essential'),
          item('Pas de scroll horizontal', 'essential'),
          item('Images responsives (max-width: 100%)', 'essential'),
          item('Texte lisible sans zoom', 'essential'),
          item('Breakpoints testés', 'important'),
          item('Menu adapté au mobile', 'important'),
          item('Images srcset pour différentes résolutions', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '9. Tests sur appareils réels',
        items: [
          item('Testé sur au moins 1 smartphone iOS', 'essential'),
          item('Testé sur au moins 1 smartphone Android', 'essential'),
          item('Testé sur ordinateur', 'essential'),
          item('Testé en orientation portrait ET paysage', 'important'),
          item('Testé sur tablette', 'important'),
          item('Bugs critiques corrigés', 'important'),
          item('Testé avec connexion lente (3G)', 'recommended'),
          item('Testé en conditions réelles', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '10. Validation technique',
        items: [
          item('HTML valide (W3C Validator)', 'essential'),
          item('CSS valide', 'important'),
          item('Pas d\'erreurs JavaScript en console', 'important'),
          item('Score Lighthouse Accessibility > 90', 'important'),
          item('Score WAVE sans erreurs', 'recommended'),
          item('Testé avec lecteur d\'écran', 'recommended')
        ]
      },
      {
        id: generateId(),
        title: '11. Contenu',
        items: [
          item('Pas de Lorem Ipsum en production', 'essential'),
          item('Orthographe vérifiée', 'essential'),
          item('Liens fonctionnels', 'essential'),
          item('Contenu à jour', 'important'),
          item('Mentions légales présentes', 'important'),
          item('Politique de confidentialité', 'recommended')
        ]
      }
    ],
    exceptions: '',
    knownBugs: '',
    testedDevices: '',
    testedBrowsers: '',
    decision: ''
  }
}

export function useChecklistData() {
  const formData = useState<ChecklistData>('checklist-data', () => createDefaultData())

  function resetForm() {
    formData.value = createDefaultData()
    triggerRef(formData)
  }

  function importData(raw: unknown) {
    const data = raw as ChecklistData
    if (data.categories) {
      data.categories.forEach((cat) => {
        if (!cat.id) cat.id = generateId()
        if (cat.items) {
          cat.items.forEach((it) => {
            if (!it.id) it.id = generateId()
          })
        }
      })
    }
    formData.value = { ...formData.value, ...data }
    triggerRef(formData)
  }

  function stats() {
    let essential = 0
    let essentialChecked = 0
    let important = 0
    let importantChecked = 0
    let recommended = 0
    let recommendedChecked = 0

    for (const cat of formData.value.categories) {
      for (const it of cat.items) {
        if (it.priority === 'essential') {
          essential++
          if (it.checked) essentialChecked++
        } else if (it.priority === 'important') {
          important++
          if (it.checked) importantChecked++
        } else {
          recommended++
          if (it.checked) recommendedChecked++
        }
      }
    }

    return {
      essential, essentialChecked,
      important, importantChecked,
      recommended, recommendedChecked,
      total: essential + important + recommended,
      totalChecked: essentialChecked + importantChecked + recommendedChecked
    }
  }

  return { formData, resetForm, importData, stats }
}
