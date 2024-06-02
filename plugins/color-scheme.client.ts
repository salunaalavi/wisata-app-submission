import type { ColorModeInstance } from "@/types/color-scheme";
import { GLOBAL_NAME, STORAGE_KEY } from "@/modules/color-scheme/constants";

// Initialise to empty object to avoid hard error when hydrating app in test mode
const helper = (window[GLOBAL_NAME] || {}) as unknown as {
  value: string
  getColorScheme: () => string
  addColorScheme: (className: string) => void
  removeColorScheme: (className: string) => void
}

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useState<ColorModeInstance>('color-mode', () => reactive({
    // For SPA mode or fallback
    value: helper.value,
    unknown: false,
  })).value

  watch(() => colorMode.value, (newValue, oldValue) => {
    colorMode.value = newValue

    // Local storage to sync with other tabs
    window.localStorage?.setItem(STORAGE_KEY, newValue)

    helper?.removeColorScheme(oldValue!)
    helper?.addColorScheme(newValue)
  }, { immediate: true })

  nuxtApp.hook('app:mounted', () => {
    if (colorMode.unknown) {
      colorMode.value = helper.value
      colorMode.unknown = false
    }
  })

  return {
    provide: {
      colorMode,
    }
  }
})