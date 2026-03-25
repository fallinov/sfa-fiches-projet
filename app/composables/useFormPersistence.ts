import { isLegacyFormat, convertLegacyData, decodeFormData } from '~/utils/url-encoding'

const STORAGE_KEY = 'fiche-cadrage-data'

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

    const parsed = decodeFormData(encoded)
    if (!parsed) return false

    if (isLegacyFormat(parsed)) {
      importData(convertLegacyData(parsed))
    } else {
      importData(parsed as ReturnType<typeof convertLegacyData>)
    }
    return true
  }

  function startAutoSave() {
    nextTick(() => {
      autoSaveEnabled = true
      watch(formData, debouncedSave, { deep: true })
    })

    window.addEventListener('beforeunload', flushSave)
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
