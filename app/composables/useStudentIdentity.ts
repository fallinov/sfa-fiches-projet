const STORAGE_KEY = 'student-identity'

interface StudentIdentity {
  lastName: string
  firstName: string
  projectName: string
}

export function useStudentIdentity() {
  function save(identity: StudentIdentity) {
    if (import.meta.server) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(identity))
  }

  function load(): StudentIdentity | null {
    if (import.meta.server) return null
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return null
    try {
      return JSON.parse(saved)
    } catch {
      return null
    }
  }

  function applyTo(formData: Ref<{ studentLastName: string, studentFirstName: string, projectName: string }>) {
    const identity = load()
    if (!identity) return

    if (!formData.value.studentLastName && identity.lastName) {
      formData.value = { ...formData.value, studentLastName: identity.lastName }
    }
    if (!formData.value.studentFirstName && identity.firstName) {
      formData.value = { ...formData.value, studentFirstName: identity.firstName }
    }
    if (!formData.value.projectName && identity.projectName) {
      formData.value = { ...formData.value, projectName: identity.projectName }
    }
  }

  function watchAndSave(formData: Ref<{ studentLastName: string, studentFirstName: string, projectName: string }>) {
    watch(
      () => ({
        lastName: formData.value.studentLastName,
        firstName: formData.value.studentFirstName,
        projectName: formData.value.projectName
      }),
      (identity) => {
        if (identity.lastName || identity.firstName) {
          save(identity)
        }
      },
      { deep: true }
    )
  }

  return { load, save, applyTo, watchAndSave }
}
