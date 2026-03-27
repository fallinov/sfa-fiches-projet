/**
 * Capture the ?d= URL parameter BEFORE vue-router strips it during SSG hydration.
 * vue-router replaceState cleans query params on static pages, so we must read
 * the original URL from the browser before the router runs.
 *
 * The captured value is stored in useState and read by useFormPersistence.loadFromUrl().
 */
export default defineNuxtPlugin(() => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const encoded = params.get('d')

  if (encoded) {
    useState('url-shared-data', () => encoded)
  }
})
