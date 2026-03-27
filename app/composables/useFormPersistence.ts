import { isLegacyFormat, convertLegacyData, decodeFormData } from '~/utils/url-encoding'

interface FormPersistenceOptions {
  storageKey: string
  formData: Ref<unknown>
  importData: (data: unknown) => void
  supportLegacy?: boolean
}

export function useFormPersistence(options: FormPersistenceOptions) {
  const { storageKey, formData, importData, supportLegacy = false } = options

  let saveTimeout: ReturnType<typeof setTimeout> | null = null
  let autoSaveEnabled = false

  // True when the page was opened via a shared URL (?d=)
  const isSharedView = ref(false)

  function saveToStorage() {
    if (import.meta.server) return
    if (!autoSaveEnabled) return
    if (isSharedView.value) return
    localStorage.setItem(storageKey, JSON.stringify(formData.value))
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
    const saved = localStorage.getItem(storageKey)
    if (!saved) return false

    try {
      const parsed = JSON.parse(saved)
      if (supportLegacy && isLegacyFormat(parsed)) {
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
    localStorage.removeItem(storageKey)
  }

  function loadFromUrl(): boolean {
    if (import.meta.server) return false

    // Read from useState (captured by plugin BEFORE vue-router strips query params)
    const capturedData = useState<string | null>('url-shared-data', () => null)
    const encoded = capturedData.value

    // Fallback: try window.location.search (works in dev mode)
    const fallback = encoded || new URLSearchParams(window.location.search).get('d')

    if (!fallback) return false

    const parsed = decodeFormData(fallback)
    if (!parsed) return false

    if (supportLegacy && isLegacyFormat(parsed)) {
      importData(convertLegacyData(parsed))
    } else {
      importData(parsed as Record<string, unknown>)
    }

    isSharedView.value = true
    return true
  }

  function startAutoSave() {
    if (isSharedView.value) return

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
    startAutoSave,
    isSharedView: readonly(isSharedView)
  }
}
