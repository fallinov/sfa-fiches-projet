interface UploadResult {
  url: string
}

function getUploadEndpoint(): string {
  if (import.meta.dev) {
    // In dev, PHP isn't running — would need a local PHP server or mock
    // For now, point to the production endpoint
    return 'https://devjs.ch/fiches/api/upload.php'
  }
  // In production, use relative path (works on both Infomaniak and GitHub Pages)
  return '/fiches/api/upload.php'
}

async function compressImage(file: File, maxWidth = 1200, quality = 0.7): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let { width, height } = img

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas context not available'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Compression failed'))
        },
        'image/jpeg',
        quality
      )
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

export function useImageUpload() {
  const isUploading = ref(false)
  const error = ref<string | null>(null)

  async function uploadImage(file: File): Promise<string | null> {
    isUploading.value = true
    error.value = null

    try {
      const compressed = await compressImage(file)

      const formData = new FormData()
      formData.append('image', compressed, 'photo.jpg')

      const response = await fetch(getUploadEndpoint(), {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Upload failed' }))
        throw new Error(data.error || `HTTP ${response.status}`)
      }

      const result: UploadResult = await response.json()
      return result.url
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Upload failed'
      return null
    } finally {
      isUploading.value = false
    }
  }

  return {
    uploadImage,
    isUploading: readonly(isUploading),
    error: readonly(error)
  }
}
