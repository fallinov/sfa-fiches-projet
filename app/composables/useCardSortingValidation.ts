import t from '~/i18n/fr'

interface ValidationError {
  field: string
  message: string
}

export function useCardSortingValidation() {
  const { formData } = useCardSortingData()

  function validate(): ValidationError[] {
    const errors: ValidationError[] = []

    if (!formData.value.studentLastName.trim()) {
      errors.push({ field: 'studentLastName', message: t.validation.lastNameRequired })
    }

    if (!formData.value.projectName.trim()) {
      errors.push({ field: 'projectName', message: t.validation.projectNameRequired })
    }

    const hasCard = formData.value.cards.some(c => c.label.trim())
    if (!hasCard) {
      errors.push({ field: 'cards', message: t.validation.cardsRequired })
    }

    return errors
  }

  function sectionProgress(): { filled: number, total: number } {
    const total = 5
    let filled = 0

    // Section 1: Cards
    if (formData.value.cards.some(c => c.label.trim())) filled++

    // Section 2: Participants
    if (formData.value.participants.some(p => p.name.trim())) filled++

    // Section 3: Results summary
    if (formData.value.resultsSummary.trim()) filled++

    // Section 4: Photos
    if (formData.value.photos.length > 0) filled++

    // Section 5: Architecture
    if (formData.value.architecture.trim()) filled++

    return { filled, total }
  }

  return { validate, sectionProgress }
}
