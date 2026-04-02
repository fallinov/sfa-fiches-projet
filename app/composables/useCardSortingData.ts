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

export interface CardSortingData {
  studentLastName: string
  studentFirstName: string
  date: string
  projectName: string
  cards: Card[]
  participants: Participant[]
  resultsSummary: string
  photos: string[]
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
    resultsSummary: '',
    photos: [],
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
    formData.value = { ...formData.value, ...data }
    triggerRef(formData)
  }

  return {
    formData,
    addCard,
    removeCard,
    addParticipant,
    removeParticipant,
    resetForm,
    importData
  }
}
