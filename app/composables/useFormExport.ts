import { encodeFormData } from '~/utils/url-encoding'

interface FormExportOptions {
  formData: Ref<unknown>
  importData: (data: unknown) => void
}

export function useFormExport(options: FormExportOptions) {
  const { formData, importData } = options

  function generateShareUrl(): string {
    const encoded = encodeFormData(formData.value as Record<string, unknown>)
    return `${window.location.origin}${window.location.pathname}?d=${encoded}`
  }

  async function copyShareLink(): Promise<boolean> {
    const url = generateShareUrl()
    try {
      await navigator.clipboard.writeText(url)
      return true
    } catch {
      prompt('Copiez ce lien :', url)
      return false
    }
  }

  function downloadJson(filename: string) {
    const blob = new Blob([JSON.stringify(formData.value, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = filename
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
