import type { BriefFormData, Persona, Feature, Criterion } from '~/composables/useCadrageData'

/**
 * Encode form data to a base64 string for URL sharing.
 * Uses the same encoding as the original devjs.ch HTML form.
 */
export function encodeFormData(data: unknown): string {
  const json = JSON.stringify(data)
  return btoa(unescape(encodeURIComponent(json)))
}

/**
 * Decode a base64 string back to form data.
 * Returns null if the string is invalid.
 */
export function decodeFormData(encoded: string): unknown | null {
  try {
    const json = decodeURIComponent(escape(atob(encoded)))
    return JSON.parse(json)
  } catch {
    return null
  }
}

// Legacy format from the old HTML form on devjs.ch
export interface LegacyFormData {
  _personaCount?: number
  _featureCount?: number
  _criterionCount?: number
  [key: string]: unknown
}

export function isLegacyFormat(data: unknown): data is LegacyFormData {
  return typeof data === 'object' && data !== null && '_personaCount' in data
}

export function convertLegacyData(legacy: LegacyFormData): BriefFormData {
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
