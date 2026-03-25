import { encodeFormData } from '~/utils/url-encoding'

export function useFormExport() {
  const { formData, importData } = useFormData()

  function generateShareUrl(): string {
    const encoded = encodeFormData(formData.value)
    return `${window.location.origin}${window.location.pathname}?d=${encoded}`
  }

  async function copyShareLink(): Promise<boolean> {
    const url = generateShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch {
      // Fallback: prompt
      prompt('Copiez ce lien :', url)
      return false
    }
  }

  function downloadJson() {
    const data = formData.value
    const lastName = data.studentLastName || ''
    const firstName = data.studentFirstName || ''
    const namePart = `${lastName}-${firstName}`.trim().replace(/\s+/g, '-').toLowerCase() || 'fiche'
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `fiche-cadrage-${namePart}.json`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  function importJsonFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          importData(data)
          resolve()
        } catch {
          reject(new Error('Invalid JSON'))
        }
      }
      reader.readAsText(file)
    })
  }

  return {
    copyShareLink,
    downloadJson,
    importJsonFile
  }
}
