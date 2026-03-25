import type { BriefFormData, Persona, Feature, Criterion } from './useFormData'

const STORAGE_KEY = 'fiche-cadrage-data'

// Legacy format from the old HTML form on devjs.ch
interface LegacyFormData {
  _personaCount?: number
  _featureCount?: number
  _criterionCount?: number
  [key: string]: unknown
}

function isLegacyFormat(data: unknown): data is LegacyFormData {
  return typeof data === 'object' && data !== null && '_personaCount' in data
}

function convertLegacyData(legacy: LegacyFormData): BriefFormData {
  const personaCount = legacy._personaCount || 1
  const featureCount = legacy._featureCount || 5
  const criterionCount = legacy._criterionCount || 3

  const personas: Persona[] = []
  for (let i = 1; i <= personaCount; i++) {
    personas.push({
      id: crypto.randomUUID(),
      name: (legacy[`persona-${i}-nom`] as string) || '',
      age: legacy[`persona-${i}-age`] ? Number(legacy[`persona-${i}-age`]) : null,
      job: (legacy[`persona-${i}-job`] as string) || '',
      level: (legacy[`persona-${i}-level`] as Persona['level']) || '',
      goal: (legacy[`persona-${i}-goal`] as string) || '',
      frustrations: (legacy[`persona-${i}-frustrations`] as string) || ''
    })
  }

  const features: Feature[] = []
  for (let i = 1; i <= featureCount; i++) {
    features.push({
      id: crypto.randomUUID(),
      description: (legacy[`feature-${i}-text`] as string) || '',
      priority: (legacy[`feature-${i}-priority`] as Feature['priority']) || ''
    })
  }

  const criteria: Criterion[] = []
  for (let i = 1; i <= criterionCount; i++) {
    criteria.push({
      id: crypto.randomUUID(),
      checked: Boolean(legacy[`criterion-${i}-checked`]),
      text: (legacy[`criterion-${i}-text`] as string) || ''
    })
  }

  return {
    studentLastName: (legacy['student-lastname'] as string) || '',
    studentFirstName: (legacy['student-firstname'] as string) || '',
    date: (legacy['date'] as string) || '',
    objective: (legacy['field-objectif'] as string) || '',
    projectName: (legacy['field-nom-projet'] as string) || '',
    personas,
    features,
    constraints: {
      deadline: (legacy['field-deadline'] as string) || '',
      hours: legacy['hours'] ? Number(legacy['hours']) : null,
      tech: (legacy['tech'] as string) || '',
      accessibility: (legacy['accessibility'] as BriefFormData['constraints']['accessibility']) || '',
      legal: (legacy['legal'] as string) || ''
    },
    criteria
  }
}

export function useFormPersistence() {
  const { formData, importData } = useFormData()

  let saveTimeout: ReturnType<typeof setTimeout> | null = null
  let autoSaveEnabled = false

  function saveToStorage() {
    if (import.meta.server) return
    if (!autoSaveEnabled) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData.value))
  }

  function debouncedSave() {
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(saveToStorage, 500)
  }

  function flushSave() {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
      saveTimeout = null
    }
    saveToStorage()
  }

  function loadFromStorage(): boolean {
    if (import.meta.server) return false
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return false

    try {
      const parsed = JSON.parse(saved)
      if (isLegacyFormat(parsed)) {
        importData(convertLegacyData(parsed))
      } else {
        importData(parsed)
      }
      return true
    } catch (e) {
      console.warn('Erreur chargement localStorage:', e)
      return false
    }
  }

  function clearStorage() {
    if (import.meta.server) return
    localStorage.removeItem(STORAGE_KEY)
  }

  function loadFromUrl(): boolean {
    if (import.meta.server) return false
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('d')
    if (!encoded) return false

    try {
      const json = decodeURIComponent(escape(atob(encoded)))
      const parsed = JSON.parse(json)
      if (isLegacyFormat(parsed)) {
        importData(convertLegacyData(parsed))
      } else {
        importData(parsed)
      }
      return true
    } catch (e) {
      console.warn('Erreur décodage URL:', e)
      return false
    }
  }

  function startAutoSave() {
    // Enable auto-save flag AFTER loading is done
    // This prevents the watch from saving empty/default data
    nextTick(() => {
      autoSaveEnabled = true
      watch(formData, debouncedSave, { deep: true })
    })

    // Save immediately on page unload (reload, close tab, navigate away)
    window.addEventListener('beforeunload', flushSave)

    // Save on visibility change (user switches tab on mobile)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flushSave()
      }
    })
  }

  return {
    saveToStorage,
    loadFromStorage,
    clearStorage,
    loadFromUrl,
    startAutoSave
  }
}
