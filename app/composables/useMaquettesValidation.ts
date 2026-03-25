import t from '~/i18n/fr'

interface ValidationError {
  field: string
  message: string
}

export function useMaquettesValidation() {
  const { formData } = useMaquettesData()

  function validate(): ValidationError[] {
    const errors: ValidationError[] = []

    if (!formData.value.studentLastName.trim()) {
      errors.push({ field: 'studentLastName', message: t.validation.lastNameRequired })
    }

    if (!formData.value.projectName.trim()) {
      errors.push({ field: 'projectName', message: t.validation.projectNameRequired })
    }

    return errors
  }

  function sectionProgress(): { filled: number, total: number } {
    const total = 4
    let filled = 0

    if (formData.value.pages.some(p => p.name.trim())) filled++
    if (formData.value.gridSystem.trim()) filled++
    if (formData.value.userTests.some(t => t.participant.trim())) filled++
    if (formData.value.checklist.some(c => c.checked)) filled++

    return { filled, total }
  }

  return { validate, sectionProgress }
}
