import t from '~/i18n/fr'

interface ValidationError {
  field: string
  message: string
}

export function useChecklistValidation() {
  const { formData } = useChecklistData()

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
    const total = 11
    let filled = 0

    for (const cat of formData.value.categories) {
      const hasChecked = cat.items.some(it => it.checked)
      if (hasChecked) filled++
    }

    return { filled, total }
  }

  return { validate, sectionProgress }
}
