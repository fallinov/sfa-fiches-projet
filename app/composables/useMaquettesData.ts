import type { ChecklistItem } from '~/types/forms'

export interface MaquettePage {
  id: string
  name: string
  type: '' | 'sketch' | 'wireframe' | 'mockup'
  breakpoints: string[]
  tool: string
  notes: string
  screenshotUrl: string
}

export interface UserTest {
  id: string
  participant: string
  testType: string
  findings: string
}

export interface MaquettesData {
  studentLastName: string
  studentFirstName: string
  date: string
  projectName: string
  pages: MaquettePage[]
  gridSystem: string
  userTests: UserTest[]
  iterations: string
  checklist: ChecklistItem[]
}

let idCounter = 0

function generateId(): string {
  return `mq-${++idCounter}`
}

function createPage(): MaquettePage {
  return { id: generateId(), name: '', type: '', breakpoints: [], tool: '', notes: '', screenshotUrl: '' }
}

function createUserTest(): UserTest {
  return { id: generateId(), participant: '', testType: '', findings: '' }
}

const DEFAULT_CHECKLIST = [
  'Croquis réalisés pour explorer les idées',
  'Wireframes créés pour les pages principales',
  'Versions mobile ET desktop maquettées',
  'Tests utilisateurs effectués (5 secondes, premier clic)',
  'Retours utilisateurs intégrés',
  'Interactions documentées',
  'Grille de mise en page définie',
  'Maquettes validées avant passage au code'
]

function createDefaultData(): MaquettesData {
  return {
    studentLastName: '',
    studentFirstName: '',
    date: '',
    projectName: '',
    pages: [
      { id: generateId(), name: 'Accueil', type: 'wireframe', breakpoints: [], tool: '', notes: '', screenshotUrl: '' },
      { id: generateId(), name: '', type: '', breakpoints: [], tool: '', notes: '', screenshotUrl: '' },
      { id: generateId(), name: '', type: '', breakpoints: [], tool: '', notes: '', screenshotUrl: '' }
    ],
    gridSystem: '',
    userTests: [createUserTest()],
    iterations: '',
    checklist: DEFAULT_CHECKLIST.map(text => ({
      id: generateId(),
      checked: false,
      text
    }))
  }
}

export function useMaquettesData() {
  const formData = useState<MaquettesData>('maquettes-data', () => createDefaultData())

  function addPage() {
    formData.value.pages.push(createPage())
  }

  function removePage(id: string) {
    formData.value.pages = formData.value.pages.filter(p => p.id !== id)
  }

  function addUserTest() {
    formData.value.userTests.push(createUserTest())
  }

  function removeUserTest(id: string) {
    if (formData.value.userTests.length <= 1) return
    formData.value.userTests = formData.value.userTests.filter(t => t.id !== id)
  }

  function resetForm() {
    formData.value = createDefaultData()
    triggerRef(formData)
  }

  function importData(raw: unknown) {
    const data = raw as MaquettesData
    if (data.pages) {
      data.pages.forEach((p) => {
        if (!p.id) p.id = generateId()
      })
    }
    if (data.userTests) {
      data.userTests.forEach((t) => {
        if (!t.id) t.id = generateId()
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
    addPage,
    removePage,
    addUserTest,
    removeUserTest,
    resetForm,
    importData
  }
}
