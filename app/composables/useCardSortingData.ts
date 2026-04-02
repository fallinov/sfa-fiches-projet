import type { ChecklistItem } from '~/types/forms'

export interface Card {
  id: string
  label: string
  description: string
}

export interface Participant {
  id: string
  name: string
  profile: string
  notes: string
}

export interface ArchitectureNode {
  id: string
  label: string
  depth: number
}

export interface CardSortingData {
  studentLastName: string
  studentFirstName: string
  date: string
  projectName: string
  cards: Card[]
  participants: Participant[]
  resultsSummary: string
  photos: string[]
  architecture: ArchitectureNode[]
  checklist: ChecklistItem[]
}

let idCounter = 0

function generateId(): string {
  return `cs-${++idCounter}`
}

function createCard(): Card {
  return { id: generateId(), label: '', description: '' }
}

function createParticipant(): Participant {
  return { id: generateId(), name: '', profile: '', notes: '' }
}

function createArchitectureNode(depth = 0): ArchitectureNode {
  return { id: generateId(), label: '', depth }
}

function parseArchitectureString(str: string): ArchitectureNode[] {
  const lines = str.split('\n').filter(l => l.trim())
  if (lines.length === 0) return [createArchitectureNode()]
  return lines.map((line) => {
    const match = line.match(/^(\s*)[-•]?\s*(.+)/)
    const depth = match?.[1] ? Math.min(Math.floor(match[1].length / 2), 3) : 0
    return { id: generateId(), label: match?.[2]?.trim() || line.trim(), depth }
  })
}

const DEFAULT_CHECKLIST = [
  'Cartes préparées (1 carte = 1 contenu/fonctionnalité)',
  'Termes compréhensibles (pas de jargon technique)',
  'Au moins 3 personnes (autres que moi) ont participé au tri',
  'Participants variés (profils différents)',
  'Résultats compilés et analysés',
  'Regroupements récurrents identifiés',
  'Architecture de navigation définie et documentée',
  'Structure de navigation testée avec des utilisateurs'
]

function createDefaultData(): CardSortingData {
  return {
    studentLastName: '',
    studentFirstName: '',
    date: '',
    projectName: '',
    cards: Array.from({ length: 5 }, () => createCard()),
    participants: [createParticipant()],
    resultsSummary: '',
    photos: [],
    architecture: [createArchitectureNode()],
    checklist: DEFAULT_CHECKLIST.map(text => ({
      id: generateId(),
      checked: false,
      text
    }))
  }
}

export function useCardSortingData() {
  const formData = useState<CardSortingData>('card-sorting-data', () => createDefaultData())

  function addCard() {
    formData.value.cards.push(createCard())
  }

  function removeCard(id: string) {
    formData.value.cards = formData.value.cards.filter(c => c.id !== id)
  }

  function addParticipant() {
    formData.value.participants.push(createParticipant())
  }

  function removeParticipant(id: string) {
    if (formData.value.participants.length <= 1) return
    formData.value.participants = formData.value.participants.filter(p => p.id !== id)
  }

  function addArchitectureNode() {
    formData.value.architecture.push(createArchitectureNode())
  }

  function removeArchitectureNode(id: string) {
    if (formData.value.architecture.length <= 1) return
    formData.value.architecture = formData.value.architecture.filter(n => n.id !== id)
  }

  function resetForm() {
    formData.value = createDefaultData()
    triggerRef(formData)
  }

  function importData(raw: unknown) {
    const data = raw as CardSortingData
    if (data.cards) {
      data.cards.forEach((c) => {
        if (!c.id) c.id = generateId()
      })
    }
    if (data.participants) {
      data.participants.forEach((p) => {
        if (!p.id) p.id = generateId()
      })
    }
    if (data.checklist) {
      data.checklist.forEach((c) => {
        if (!c.id) c.id = generateId()
      })
    }
    // Legacy: architecture was a string in v1.3.x
    if (typeof data.architecture === 'string') {
      data.architecture = parseArchitectureString(data.architecture)
    } else if (Array.isArray(data.architecture)) {
      data.architecture.forEach((n) => {
        if (!n.id) n.id = generateId()
      })
    }
    formData.value = { ...formData.value, ...data }
    triggerRef(formData)
  }

  return {
    formData,
    addCard,
    removeCard,
    addParticipant,
    removeParticipant,
    addArchitectureNode,
    removeArchitectureNode,
    resetForm,
    importData
  }
}
