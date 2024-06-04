// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: "width=device-width, initial-scale=1.0, interactive-widget=resizes-content",
    }
  },
  css: ["@/assets/css/tailwind.css", "@/assets/scss/main.scss"],
  imports: {
    dirs: ["stores", "locales"],
  },
  modules: ["@nuxtjs/tailwindcss", [
    "@pinia/nuxt",
    {
      autoImports: ["defineStore", "acceptHMRUpdate"],
    },
  ], "nuxt-icon", "shadcn-nuxt"],
  typescript: {
    strict: true,
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  devtools: { enabled: true }
})