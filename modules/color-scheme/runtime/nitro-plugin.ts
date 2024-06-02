import type { NitroAppPlugin } from 'nitropack'

/**
 * Will be available in the runtime
 */
import { script } from '#color-mode-options'

export default <NitroAppPlugin> function (nitro) {
  nitro.hooks.hook('render:html', (htmlContext) => {
    htmlContext.head.push(`<script>${script}</script>`)
  })
}

/**
 * Worked arround according to https://github.com/nuxt/nuxt/issues/15088
 */