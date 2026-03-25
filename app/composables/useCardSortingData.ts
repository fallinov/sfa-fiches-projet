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

export interface SortingGroup {
  id: string
  groupName: string
  cardLabels: string
}

export interface CardSortingData {
  studentLastName: string
  studentFirstName: string
  date: string
  projectName: string
  cards: Card[]
  participants: Participant[]
  groups: SortingGroup[]
  architecture: string
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

function createGroup(): SortingGroup {
  return { id: generateId(), groupName: '', cardLabels: '' }
}

const DEFAULT_CHECKLIST = [
  'Cartes préparées (1 carte = 1 contenu/fonctionnalité)',
  'Termes compréhensibles (pas de jargon technique)',
  'Au moins 5 personnes ont participé au tri',
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
    groups: [createGroup()],
    architecture: '',
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

  function addGroup() {
    formData.value.groups.push(createGroup())
  }

  function removeGroup(id: string) {
    formData.value.groups = formData.value.groups.filter(g => g.id !== id)
  }

  function resetForm() {
    Object.assign(formData.value, createDefaultData())
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
    if (data.groups) {
      data.groups.forEach((g) => {
        if (!g.id) g.id = generateId()
      })
    }
    if (data.checklist) {
      data.checklist.forEach((c) => {
        if (!c.id) c.id = generateId()
      })
    }
    Object.assign(formData.value, data)
  }

  return {
    formData,
    addCard,
    removeCard,
    addParticipant,
    removeParticipant,
    addGroup,
    removeGroup,
    resetForm,
    importData
  }
}
