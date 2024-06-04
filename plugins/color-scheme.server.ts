import type { ColorModeInstance } from '@/types/color-scheme';

/**
 * Will be available in the runtime
 */

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext
    ? ref({})
    : useState<ColorModeInstance>('color-mode', () => reactive({
      value: "dark",
      unknown: true,
    })).value

  const htmlAttrs: Record<string, string> = {}

  useHead({ htmlAttrs })

  return {
    provide: {
      colorMode,
    }
  }
})