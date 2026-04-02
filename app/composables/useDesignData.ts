import type { ChecklistItem } from '~/types/forms'

export interface ColorEntry {
  id: string
  hex: string
  name: string
  usage: string
}

export interface FontEntry {
  id: string
  name: string
  usage: '' | 'headings' | 'body' | 'code' | 'other'
  sampleUrl: string
}

export interface SpacingEntry {
  id: string
  name: string
  value: string
}

export interface DesignData {
  studentLastName: string
  studentFirstName: string
  date: string
  projectName: string
  colors: ColorEntry[]
  contrastNotes: string
  realtimeColorsUrl: string
  fonts: FontEntry[]
  typeScale: SpacingEntry[]
  spacings: SpacingEntry[]
  logoUrl: string
  moodboard: string[]
  borderRadii: SpacingEntry[]
  shadows: SpacingEntry[]
  iconLibrary: string
  iconVariant: string
  iconNotes: string
  identityTraits: string[]
  identityNotes: string
  checklist: ChecklistItem[]
}

let idCounter = 0

function generateId(): string {
  return `ds-${++idCounter}`
}

function createColor(): ColorEntry {
  return { id: generateId(), hex: '', name: '', usage: '' }
}

function createFont(): FontEntry {
  return { id: generateId(), name: '', usage: '', sampleUrl: '' }
}

function createSpacing(): SpacingEntry {
  return { id: generateId(), name: '', value: '' }
}

const DEFAULT_CHECKLIST = [
  'Palette de couleurs définie (3-4 max)',
  'Contrastes vérifiés (ratio ≥ 4.5:1 pour WCAG AA)',
  'Maximum 2 polices sélectionnées',
  'Échelle typographique définie (tailles h1 à body)',
  'Espacements standardisés (grille de base)',
  'Règle 60-30-10 appliquée (dominant, secondaire, accent)',
  'Charte graphique documentée',
  'Pas de surcharge visuelle (sobriété)'
]

const DEFAULT_TYPE_SCALE = [
  { name: 'h1', value: '36px' },
  { name: 'h2', value: '28px' },
  { name: 'h3', value: '22px' },
  { name: 'body', value: '16px' },
  { name: 'small', value: '14px' }
]

const DEFAULT_BORDER_RADII = [
  { name: 'none', value: '0px' },
  { name: 'sm', value: '4px' },
  { name: 'md', value: '8px' },
  { name: 'lg', value: '16px' },
  { name: 'full', value: '9999px' }
]

const DEFAULT_SHADOWS = [
  { name: 'sm', value: '0 1px 2px rgba(0,0,0,0.05)' },
  { name: 'md', value: '0 4px 6px rgba(0,0,0,0.1)' },
  { name: 'lg', value: '0 10px 15px rgba(0,0,0,0.15)' }
]

const DEFAULT_SPACINGS = [
  { name: 'xs', value: '4px' },
  { name: 'sm', value: '8px' },
  { name: 'md', value: '16px' },
  { name: 'lg', value: '24px' },
  { name: 'xl', value: '32px' },
  { name: '2xl', value: '48px' }
]

function createDefaultData(): DesignData {
  return {
    studentLastName: '',
    studentFirstName: '',
    date: '',
    projectName: '',
    colors: [
      { id: generateId(), hex: '', name: 'Texte', usage: 'Couleur du texte principal' },
      { id: generateId(), hex: '', name: 'Fond', usage: 'Couleur de fond des pages' },
      { id: generateId(), hex: '', name: 'Principale', usage: 'Identité de marque, boutons primaires' },
      { id: generateId(), hex: '', name: 'Secondaire', usage: 'Accents, éléments secondaires' },
      { id: generateId(), hex: '', name: 'Accent', usage: 'Mise en avant, CTA, liens' }
    ],
    contrastNotes: '',
    realtimeColorsUrl: '',
    fonts: [
      { id: generateId(), name: '', usage: 'headings', sampleUrl: '' },
      { id: generateId(), name: '', usage: 'body', sampleUrl: '' }
    ],
    typeScale: DEFAULT_TYPE_SCALE.map(s => ({ id: generateId(), ...s })),
    spacings: DEFAULT_SPACINGS.map(s => ({ id: generateId(), ...s })),
    logoUrl: '',
    moodboard: [],
    borderRadii: DEFAULT_BORDER_RADII.map(s => ({ id: generateId(), ...s })),
    shadows: DEFAULT_SHADOWS.map(s => ({ id: generateId(), ...s })),
    iconLibrary: '',
    iconVariant: '',
    iconNotes: '',
    identityTraits: [],
    identityNotes: '',
    checklist: DEFAULT_CHECKLIST.map(text => ({
      id: generateId(),
      checked: false,
      text
    }))
  }
}

export function useDesignData() {
  const formData = useState<DesignData>('design-data', () => createDefaultData())

  function addColor() {
    formData.value.colors.push(createColor())
  }

  function removeColor(id: string) {
    formData.value.colors = formData.value.colors.filter(c => c.id !== id)
  }

  function addFont() {
    formData.value.fonts.push(createFont())
  }

  function removeFont(id: string) {
    formData.value.fonts = formData.value.fonts.filter(f => f.id !== id)
  }

  function addTypeScale() {
    formData.value.typeScale.push(createSpacing())
  }

  function removeTypeScale(id: string) {
    formData.value.typeScale = formData.value.typeScale.filter(s => s.id !== id)
  }

  function addBorderRadius() {
    formData.value.borderRadii.push(createSpacing())
  }

  function removeBorderRadius(id: string) {
    formData.value.borderRadii = formData.value.borderRadii.filter(s => s.id !== id)
  }

  function addShadow() {
    formData.value.shadows.push(createSpacing())
  }

  function removeShadow(id: string) {
    formData.value.shadows = formData.value.shadows.filter(s => s.id !== id)
  }

  function addSpacing() {
    formData.value.spacings.push(createSpacing())
  }

  function removeSpacing(id: string) {
    formData.value.spacings = formData.value.spacings.filter(s => s.id !== id)
  }

  function resetForm() {
    formData.value = createDefaultData()
    triggerRef(formData)
  }

  function importData(raw: unknown) {
    const data = raw as DesignData
    if (data.colors) {
      data.colors.forEach((c) => {
        if (!c.id) c.id = generateId()
      })
    }
    if (data.fonts) {
      data.fonts.forEach((f) => {
        if (!f.id) f.id = generateId()
      })
    }
    // Legacy: typeScale was a string
    const rawTypeScale = data.typeScale as unknown
    if (typeof rawTypeScale === 'string') {
      data.typeScale = rawTypeScale
        ? rawTypeScale.split('\n').filter((l: string) => l.trim()).map((l: string) => ({ id: generateId(), name: l.trim(), value: '' }))
        : []
    } else if (Array.isArray(data.typeScale)) {
      data.typeScale.forEach((s) => {
        if (!s.id) s.id = generateId()
      })
    }
    if (data.spacings) {
      data.spacings.forEach((s) => {
        if (!s.id) s.id = generateId()
      })
    }
    if (Array.isArray(data.borderRadii)) {
      data.borderRadii.forEach((s) => {
        if (!s.id) s.id = generateId()
      })
    }
    if (Array.isArray(data.shadows)) {
      data.shadows.forEach((s) => {
        if (!s.id) s.id = generateId()
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
    addColor,
    removeColor,
    addFont,
    removeFont,
    addTypeScale,
    removeTypeScale,
    addBorderRadius,
    removeBorderRadius,
    addShadow,
    removeShadow,
    addSpacing,
    removeSpacing,
    resetForm,
    importData
  }
}
