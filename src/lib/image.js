/**
 * Resize and compress an image in the browser so uploaded photos stay small
 * enough to persist in localStorage during the front-end demo.
 */
export function fileToOptimizedDataUrl(file, maxSize = 1000, quality = 0.72) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Not an image'))
      return
    }

    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the file'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Could not load the image'))
      image.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
