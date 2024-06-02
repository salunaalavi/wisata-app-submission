import { promises as fsp } from 'node:fs'
import { resolve } from 'pathe'
import { addTemplate, defineNuxtModule, createResolver, tryResolveModule } from '@nuxt/kit'
import { readPackageJSON } from 'pkg-types'
import { gte } from 'semver'
import { DEFAULTS } from "./constants";

export default defineNuxtModule({
  meta: {
    configKey: 'colorMode',
    compatibility: {
      bridge: true,
    },
  },
  defaults: DEFAULTS,
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Read script from disk and add to options
    // Work around to pass along options, state, and constants variables
    const scriptPath = resolver.resolve('./script.js')
    const scriptT = await fsp.readFile(scriptPath, 'utf-8')
    type ScriptOption = 'dataValue' | 'GLOBAL_NAME' | 'STORAGE_KEY' | 'FALLBACK'
    options.script = scriptT.replace(/<%= options\.([^ ]+) %>/g, (_, option: ScriptOption) => options[option])

    // Inject options via virtual template
    nuxt.options.alias['#color-mode-options'] = addTemplate({
      filename: 'color-mode-options.mjs',
      getContents: () => Object.entries(options).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    }).dst

    const runtimeDir = resolver.resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Nuxt 3 and Bridge - inject script
    nuxt.hook('nitro:config', (config) => {
      config.externals = config.externals || {}
      config.externals.inline = config.externals.inline || []
      config.externals.inline.push(runtimeDir)
      config.virtual = config.virtual || {}
      config.virtual['#color-mode-options'] = `export const script = ${JSON.stringify(options.script, null, 2)}`
      config.plugins = config.plugins || []
      config.plugins.push(resolve(runtimeDir, 'nitro-plugin'))
    })

    // Tailwind configuration
    nuxt.hook('tailwindcss:config', async (tailwindConfig) => {
      const tailwind = await tryResolveModule('tailwindcss', nuxt.options.modulesDir) || 'tailwindcss'
      const isAfter341 = await readPackageJSON(tailwind).then(twPkg => gte(twPkg.version || '3.0.0', '3.4.1'))
      tailwindConfig.darkMode = tailwindConfig.darkMode ?? [isAfter341 ? 'selector' : 'class', `[class~="dark-mode"]`]
    })
  },
})