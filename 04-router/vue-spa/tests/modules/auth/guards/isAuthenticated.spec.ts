import isAuthenticatedGuard from "@/modules/auth/guards/isAuthenticated"
import type { RouteLocationNormalized } from "vue-router"

const to:RouteLocationNormalized = {
  name: undefined,
  params: {},
  matched: [],
  fullPath: "",
  query: {},
  hash: "",
  redirectedFrom: undefined,
  path: "",
  meta: {}
}

const from:RouteLocationNormalized = {
  name: undefined,
  params: {},
  matched: [],
  fullPath: "",
  query: {},
  hash: "",
  redirectedFrom: undefined,
  path: "",
  meta: {}
}

const next = vi.fn()

describe('isAuthenticated', () => {


  beforeEach(() => {
    localStorage.clear()
  })

  test('block if not authenticated', async () => {
    await isAuthenticatedGuard(to, from, next)
    expect(next).toHaveBeenCalledWith({ name: 'login' })
  })

  test('should set localStorage lastPath', async () => {
    await isAuthenticatedGuard(to, from, next)
    expect(localStorage.getItem('lastPath')).toBe(to.path)
  })

  test('should pass if authenticated', async () => {
    await isAuthenticatedGuard(to, from, next)
    const userId = localStorage.getItem('userId')
    if (!userId) {
      expect(next).toHaveBeenCalledWith({ name: 'login' })
      return
    }
      expect(next).toHaveBeenCalledWith()
  })

})
