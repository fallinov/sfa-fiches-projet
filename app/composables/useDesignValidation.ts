import t from '~/i18n/fr'

interface ValidationError {
  field: string
  message: string
}

export function useDesignValidation() {
  const { formData } = useDesignData()

  function validate(): ValidationError[] {
    const errors: ValidationError[] = []

    if (!formData.value.studentLastName.trim()) {
      errors.push({ field: 'studentLastName', message: t.validation.lastNameRequired })
    }

    if (!formData.value.projectName.trim()) {
      errors.push({ field: 'projectName', message: t.validation.projectNameRequired })
    }

    const hasColor = formData.value.colors.some(c => c.hex.trim())
    if (!hasColor) {
      errors.push({ field: 'colors', message: t.validation.colorsRequired })
    }

    return errors
  }

  function sectionProgress(): { filled: number, total: number } {
    const total = 5
    let filled = 0

    if (formData.value.colors.some(c => c.hex.trim())) filled++
    if (formData.value.fonts.some(f => f.name.trim())) filled++
    if (formData.value.typeScale.some(s => s.value.trim()) || formData.value.spacings.some(s => s.value.trim())) filled++
    if (formData.value.visualIdentity.trim()) filled++
    if (formData.value.checklist.some(c => c.checked)) filled++

    return { filled, total }
  }

  return { validate, sectionProgress }
}
