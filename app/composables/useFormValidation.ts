import t from '~/i18n/fr'

interface ValidationError {
  field: string
  message: string
}

export function useFormValidation() {
  const { formData } = useFormData()

  function validate(): ValidationError[] {
    const errors: ValidationError[] = []

    if (!formData.value.studentLastName.trim()) {
      errors.push({ field: 'studentLastName', message: t.validation.lastNameRequired })
    }

    if (!formData.value.objective.trim()) {
      errors.push({ field: 'objective', message: t.validation.objectiveRequired })
    }

    if (!formData.value.projectName.trim()) {
      errors.push({ field: 'projectName', message: t.validation.projectNameRequired })
    }

    return errors
  }

  function isFieldEmpty(field: keyof typeof formData.value): boolean {
    const value = formData.value[field]
    if (typeof value === 'string') return !value.trim()
    return false
  }

  /**
   * Count how many sections have at least some content filled in.
   * Returns { filled, total }.
   */
  function sectionProgress(): { filled: number, total: number } {
    const total = 5
    let filled = 0

    // Section 1: Objectif
    if (formData.value.objective.trim() || formData.value.projectName.trim()) filled++

    // Section 2: Personas
    const hasPersona = formData.value.personas.some(p => p.name.trim() || p.goal.trim())
    if (hasPersona) filled++

    // Section 3: Features
    const hasFeature = formData.value.features.some(f => f.description.trim())
    if (hasFeature) filled++

    // Section 4: Constraints
    const c = formData.value.constraints
    if (c.deadline || c.hours || c.tech.trim()) filled++

    // Section 5: Criteria
    const hasCriterion = formData.value.criteria.some(cr => cr.text.trim())
    if (hasCriterion) filled++

    return { filled, total }
  }

  return {
    validate,
    isFieldEmpty,
    sectionProgress
  }
}
