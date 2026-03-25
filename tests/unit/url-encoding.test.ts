import { describe, expect, it } from 'vitest'
import type { BriefFormData } from '../../app/composables/useFormData'
import {
  convertLegacyData,
  decodeFormData,
  encodeFormData,
  isLegacyFormat
} from '../../app/utils/url-encoding'

const sampleData: BriefFormData = {
  studentLastName: 'Dupont',
  studentFirstName: 'Marie',
  date: '2026-03-25',
  objective: 'Créer un site vitrine',
  projectName: 'CoiffurePro',
  personas: [{
    id: 'p1',
    name: 'Alice',
    age: 34,
    job: 'Enseignante',
    level: 'intermediate',
    goal: 'Prendre rendez-vous',
    frustrations: 'Site trop lent'
  }],
  features: [{
    id: 'f1',
    description: 'Page d\'accueil',
    priority: 'must'
  }],
  constraints: {
    deadline: '2026-06-30',
    hours: 40,
    tech: 'HTML, CSS, JS',
    accessibility: 'aa',
    legal: 'RGPD'
  },
  criteria: [{
    id: 'c1',
    checked: false,
    text: 'Site accessible mobile'
  }]
}

describe('encodeFormData / decodeFormData', () => {
  it('roundtrip: encode then decode returns identical data', () => {
    const encoded = encodeFormData(sampleData)
    const decoded = decodeFormData(encoded)
    expect(decoded).toEqual(sampleData)
  })

  it('handles UTF-8 characters (French accents)', () => {
    const data = { ...sampleData, objective: 'Créer un système d\'évaluation à l\'école' }
    const encoded = encodeFormData(data)
    const decoded = decodeFormData(encoded) as BriefFormData
    expect(decoded.objective).toBe('Créer un système d\'évaluation à l\'école')
  })

  it('handles emojis in text', () => {
    const data = { ...sampleData, projectName: 'Mon Projet 🚀' }
    const encoded = encodeFormData(data)
    const decoded = decodeFormData(encoded) as BriefFormData
    expect(decoded.projectName).toBe('Mon Projet 🚀')
  })

  it('returns null for invalid base64', () => {
    expect(decodeFormData('not-valid-base64!!!')).toBeNull()
  })

  it('returns null for valid base64 but invalid JSON', () => {
    const encoded = btoa('this is not json')
    expect(decodeFormData(encoded)).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(decodeFormData('')).toBeNull()
  })

  it('produces a non-empty base64 string', () => {
    const encoded = encodeFormData(sampleData)
    expect(encoded.length).toBeGreaterThan(0)
    // Must be valid base64 (only A-Z, a-z, 0-9, +, /, =)
    expect(encoded).toMatch(/^[A-Za-z0-9+/=]+$/)
  })
})

describe('isLegacyFormat', () => {
  it('detects legacy format with _personaCount', () => {
    expect(isLegacyFormat({ _personaCount: 2 })).toBe(true)
  })

  it('detects legacy format with _personaCount and _featureCount', () => {
    expect(isLegacyFormat({ _personaCount: 1, _featureCount: 5 })).toBe(true)
  })

  it('rejects object with only _featureCount (no _personaCount)', () => {
    expect(isLegacyFormat({ _featureCount: 5 })).toBe(false)
  })

  it('rejects modern format (no _personaCount)', () => {
    expect(isLegacyFormat(sampleData)).toBe(false)
  })

  it('rejects null', () => {
    expect(isLegacyFormat(null)).toBe(false)
  })

  it('rejects string', () => {
    expect(isLegacyFormat('hello')).toBe(false)
  })
})

describe('convertLegacyData', () => {
  it('converts legacy persona keys to array', () => {
    const legacy = {
      '_personaCount': 2,
      '_featureCount': 1,
      '_criterionCount': 1,
      'student-lastname': 'Dupont',
      'student-firstname': 'Marie',
      'date': '2026-01-15',
      'field-objectif': 'Mon objectif',
      'field-nom-projet': 'MonProjet',
      'persona-1-nom': 'Alice',
      'persona-1-age': '34',
      'persona-1-job': 'Enseignante',
      'persona-1-level': 'novice',
      'persona-1-goal': 'Apprendre',
      'persona-1-frustrations': 'Trop complexe',
      'persona-2-nom': 'Bob',
      'persona-2-age': '25',
      'persona-2-job': 'Étudiant',
      'persona-2-level': 'expert',
      'persona-2-goal': 'Coder',
      'persona-2-frustrations': '',
      'feature-1-text': 'Page accueil',
      'feature-1-priority': 'must',
      'criterion-1-checked': true,
      'criterion-1-text': 'Site responsive',
      'hours': '40',
      'tech': 'HTML',
      'accessibility': 'aa',
      'legal': 'RGPD',
      'field-deadline': '2026-06-30'
    }

    const result = convertLegacyData(legacy)

    expect(result.studentLastName).toBe('Dupont')
    expect(result.studentFirstName).toBe('Marie')
    expect(result.date).toBe('2026-01-15')
    expect(result.objective).toBe('Mon objectif')
    expect(result.projectName).toBe('MonProjet')

    expect(result.personas).toHaveLength(2)
    expect(result.personas[0].name).toBe('Alice')
    expect(result.personas[0].age).toBe(34)
    expect(result.personas[0].level).toBe('novice')
    expect(result.personas[1].name).toBe('Bob')
    expect(result.personas[1].level).toBe('expert')

    expect(result.features).toHaveLength(1)
    expect(result.features[0].description).toBe('Page accueil')
    expect(result.features[0].priority).toBe('must')

    expect(result.criteria).toHaveLength(1)
    expect(result.criteria[0].checked).toBe(true)
    expect(result.criteria[0].text).toBe('Site responsive')

    expect(result.constraints.hours).toBe(40)
    expect(result.constraints.tech).toBe('HTML')
    expect(result.constraints.accessibility).toBe('aa')
    expect(result.constraints.deadline).toBe('2026-06-30')
  })

  it('uses defaults when counts are missing', () => {
    const legacy = { _personaCount: 0, _featureCount: 0, _criterionCount: 0 }
    const result = convertLegacyData(legacy)

    // 0 counts default to 1/5/3
    expect(result.personas).toHaveLength(1)
    expect(result.features).toHaveLength(5)
    expect(result.criteria).toHaveLength(3)
  })

  it('handles missing fields gracefully', () => {
    const legacy = { _personaCount: 1 }
    const result = convertLegacyData(legacy)

    expect(result.studentLastName).toBe('')
    expect(result.personas[0].name).toBe('')
    expect(result.personas[0].age).toBeNull()
    expect(result.constraints.hours).toBeNull()
  })

  it('roundtrip: legacy encode → decode → convert matches', () => {
    const legacy = {
      '_personaCount': 1,
      '_featureCount': 1,
      '_criterionCount': 1,
      'student-lastname': 'Test',
      'persona-1-nom': 'Persona',
      'feature-1-text': 'Feature',
      'criterion-1-text': 'Criterion'
    }

    // Simulate what the old form does: JSON → base64
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(legacy))))
    const decoded = decodeFormData(encoded)

    expect(isLegacyFormat(decoded)).toBe(true)
    const result = convertLegacyData(decoded as ReturnType<typeof convertLegacyData> & { _personaCount: number })

    expect(result.studentLastName).toBe('Test')
    expect(result.personas[0].name).toBe('Persona')
    expect(result.features[0].description).toBe('Feature')
    expect(result.criteria[0].text).toBe('Criterion')
  })
})
