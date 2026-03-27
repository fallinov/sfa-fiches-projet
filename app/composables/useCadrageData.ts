export interface Persona {
  id: string
  name: string
  age: number | null
  job: string
  level: '' | 'novice' | 'intermediate' | 'expert'
  goal: string
  frustrations: string
}

export interface Feature {
  id: string
  description: string
  priority: '' | 'must' | 'should' | 'could' | 'wont'
}

export interface Constraints {
  deadline: string
  hours: number | null
  tech: string
  accessibility: '' | 'a' | 'aa' | 'aaa'
  legal: string
}

export interface Criterion {
  id: string
  checked: boolean
  text: string
}

export interface BriefFormData {
  studentLastName: string
  studentFirstName: string
  date: string
  objective: string
  projectName: string
  personas: Persona[]
  features: Feature[]
  constraints: Constraints
  criteria: Criterion[]
}

let idCounter = 0

function generateId(): string {
  return `id-${++idCounter}`
}

function createPersona(): Persona {
  return {
    id: generateId(),
    name: '',
    age: null,
    job: '',
    level: '',
    goal: '',
    frustrations: ''
  }
}

function createFeature(): Feature {
  return {
    id: generateId(),
    description: '',
    priority: ''
  }
}

function createCriterion(): Criterion {
  return {
    id: generateId(),
    checked: false,
    text: ''
  }
}

function createDefaultFormData(): BriefFormData {
  return {
    studentLastName: '',
    studentFirstName: '',
    date: '',
    objective: '',
    projectName: '',
    personas: [createPersona()],
    features: Array.from({ length: 5 }, () => createFeature()),
    constraints: {
      deadline: '',
      hours: null,
      tech: '',
      accessibility: '',
      legal: ''
    },
    criteria: [
      { id: generateId(), checked: false, text: 'Le site s\'affiche correctement sur mobile (375px) et desktop (1280px)' },
      { id: generateId(), checked: false, text: 'Toutes les pages sont accessibles et sans erreur dans la console navigateur' },
      { id: generateId(), checked: false, text: 'Le code HTML est valide (W3C Validator) et le score Lighthouse > 70' }
    ]
  }
}

export function useCadrageData() {
  const formData = useState<BriefFormData>('cadrage-data', () => createDefaultFormData())

  function addPersona() {
    formData.value.personas.push(createPersona())
  }

  function removePersona(id: string) {
    if (formData.value.personas.length <= 1) return
    formData.value.personas = formData.value.personas.filter(p => p.id !== id)
  }

  function addFeature() {
    formData.value.features.push(createFeature())
  }

  function removeFeature(id: string) {
    formData.value.features = formData.value.features.filter(f => f.id !== id)
  }

  function addCriterion() {
    formData.value.criteria.push(createCriterion())
  }

  function removeCriterion(id: string) {
    formData.value.criteria = formData.value.criteria.filter(c => c.id !== id)
  }

  function resetForm() {
    formData.value = createDefaultFormData()
    triggerRef(formData)
  }

  function exportData(): BriefFormData {
    return JSON.parse(JSON.stringify(toRaw(formData.value)))
  }

  function importData(raw: BriefFormData) {
    // Ensure all arrays have IDs
    if (raw.personas) {
      raw.personas.forEach((p) => {
        if (!p.id) p.id = generateId()
      })
    }
    if (raw.features) {
      raw.features.forEach((f) => {
        if (!f.id) f.id = generateId()
      })
    }
    if (raw.criteria) {
      raw.criteria.forEach((c) => {
        if (!c.id) c.id = generateId()
      })
    }
    console.log('[importData] raw.studentLastName:', (raw as Record<string, unknown>).studentLastName)
    console.log('[importData] formData.value BEFORE:', formData.value.studentLastName)
    formData.value = { ...formData.value, ...raw }
    triggerRef(formData)
    console.log('[importData] formData.value AFTER:', formData.value.studentLastName)
  }

  return {
    formData,
    addPersona,
    removePersona,
    addFeature,
    removeFeature,
    addCriterion,
    removeCriterion,
    resetForm,
    exportData,
    importData
  }
}
