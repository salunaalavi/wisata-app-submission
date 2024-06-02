import type { ColorModeInstance } from '@/types/color-scheme';

/**
 * Will be available in the runtime
 */
import { value } from '#color-mode-options'

export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = nuxtApp.ssrContext?.islandContext
    ? ref({})
    : useState<ColorModeInstance>('color-mode', () => reactive({
      value,
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