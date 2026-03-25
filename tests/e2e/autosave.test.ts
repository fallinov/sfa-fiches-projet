import { expect, test } from '@nuxt/test-utils/playwright'

const STORAGE_KEY = 'fiche-cadrage-data'

function nomField(page: import('@playwright/test').Page) {
  return page.locator('input[autocomplete="family-name"]')
}

function prenomField(page: import('@playwright/test').Page) {
  return page.locator('input[autocomplete="given-name"]')
}

test.describe('Dashboard', () => {
  test('shows all fiche cards', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })

    await expect(page.getByText('Fiche de cadrage')).toBeVisible()
    await expect(page.getByText('Card Sorting')).toBeVisible()
  })

  test('navigates to cadrage page', async ({ page, goto }) => {
    await goto('/', { waitUntil: 'hydration' })
    await page.getByText('Fiche de cadrage').click()
    await page.waitForURL('**/cadrage')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('cadrage')
  })
})

test.describe('Auto-save localStorage', () => {
  test.beforeEach(async ({ page, goto }) => {
    await goto('/cadrage', { waitUntil: 'hydration' })
    await page.evaluate(() => localStorage.clear())
    await goto('/cadrage', { waitUntil: 'hydration' })
  })

  test('saves form data to localStorage after typing', async ({ page }) => {
    await nomField(page).fill('Dupont')
    await prenomField(page).fill('Marie')

    await page.waitForTimeout(700)

    const stored = await page.evaluate(key => localStorage.getItem(key), STORAGE_KEY)
    expect(stored).not.toBeNull()

    const data = JSON.parse(stored!)
    expect(data.studentLastName).toBe('Dupont')
    expect(data.studentFirstName).toBe('Marie')
  })

  test('restores form data from localStorage on reload', async ({ page, goto }) => {
    await nomField(page).fill('TestReload')
    await page.getByRole('textbox', { name: 'Nom du projet' }).fill('MonProjet')
    await page.waitForTimeout(700)

    await goto('/cadrage', { waitUntil: 'hydration' })

    await expect(nomField(page)).toHaveValue('TestReload')
    await expect(page.getByRole('textbox', { name: 'Nom du projet' })).toHaveValue('MonProjet')
  })

  test('saves immediately on beforeunload (no debounce wait)', async ({ page, goto }) => {
    await prenomField(page).fill('QuickReload')
    await goto('/cadrage', { waitUntil: 'hydration' })
    await expect(prenomField(page)).toHaveValue('QuickReload')
  })

  test('clears localStorage on reset', async ({ page }) => {
    await nomField(page).fill('ToBeCleared')
    await page.waitForTimeout(700)

    await page.getByRole('button', { name: 'Tout effacer' }).click()
    await page.getByRole('button', { name: 'Oui, tout effacer' }).click()

    await page.waitForTimeout(700)

    const stored = await page.evaluate(key => localStorage.getItem(key), STORAGE_KEY)
    if (stored) {
      const data = JSON.parse(stored)
      expect(data.studentLastName).toBe('')
    }

    await expect(nomField(page)).toHaveValue('')
  })

  test('sets today date by default', async ({ page }) => {
    const today = new Date().toISOString().slice(0, 10)
    await expect(page.getByRole('textbox', { name: 'Date de création' })).toHaveValue(today)
  })
})

test.describe('Dynamic sections', () => {
  test.beforeEach(async ({ page, goto }) => {
    await goto('/cadrage', { waitUntil: 'hydration' })
    await page.evaluate(() => localStorage.clear())
    await goto('/cadrage', { waitUntil: 'hydration' })
  })

  test('adds and removes personas', async ({ page }) => {
    await expect(page.getByText('Persona 1')).toBeVisible()

    await page.getByRole('button', { name: 'Ajouter un persona' }).click()
    await expect(page.getByText('Persona 2')).toBeVisible()

    await page.getByRole('button', { name: 'Supprimer Persona 2' }).click()
    await expect(page.getByText('Persona 2')).not.toBeVisible()
  })

  test('adds and removes features', async ({ page }) => {
    const rows = page.locator('tbody tr')
    await expect(rows).toHaveCount(5)

    await page.getByRole('button', { name: 'Ajouter une fonctionnalité' }).click()
    await expect(rows).toHaveCount(6)

    await page.getByRole('button', { name: 'Supprimer fonctionnalité 6' }).click()
    await expect(rows).toHaveCount(5)
  })

  test('adds and removes criteria', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox')
    await expect(checkboxes).toHaveCount(3)

    await page.getByRole('button', { name: 'Ajouter un critère' }).click()
    await expect(checkboxes).toHaveCount(4)

    const removeButtons = page.getByRole('button', { name: 'Supprimer le critère' })
    await removeButtons.last().click()
    await expect(checkboxes).toHaveCount(3)
  })
})

test.describe('Accessibility basics', () => {
  test.beforeEach(async ({ goto }) => {
    await goto('/cadrage', { waitUntil: 'hydration' })
  })

  test('has correct lang attribute', async ({ page }) => {
    const lang = await page.getAttribute('html', 'lang')
    expect(lang).toBe('fr')
  })

  test('has a single h1', async ({ page }) => {
    const h1s = page.locator('h1')
    await expect(h1s).toHaveCount(1)
  })

  test('has correct heading hierarchy (h1 then h2s)', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3').allTextContents()
    expect(headings).toContainEqual(expect.stringContaining('Identification'))
    expect(headings).toContainEqual(expect.stringContaining('1. Objectif'))
    expect(headings).toContainEqual(expect.stringContaining('2. Personas'))
    expect(headings).toContainEqual(expect.stringContaining('3. Fonctionnalités'))
    expect(headings).toContainEqual(expect.stringContaining('4. Contraintes'))
    expect(headings).toContainEqual(expect.stringContaining('5. Critères'))
  })

  test('all delete buttons have descriptive aria-labels', async ({ page }) => {
    const deleteButtons = page.getByRole('button', { name: /Supprimer/ })
    const count = await deleteButtons.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < count; i++) {
      const label = await deleteButtons.nth(i).getAttribute('aria-label')
      expect(label).toBeTruthy()
      expect(label).not.toBe('Supprimer')
    }
  })

  test('nav has aria-label', async ({ page }) => {
    const nav = page.getByRole('navigation')
    await expect(nav).toHaveAttribute('aria-label', 'Actions de la fiche')
  })
})
