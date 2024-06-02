/**
 * This module will be transpiled, so we use vanilla JavaScript to simplify transpilation.
 * Color scheme detection that runs before loading Nuxt, will be loaded as script and exposed to the user on the network request, you can check it there.
 * '<%= options[option] %>' string will be replaced according to regex '/<%= options\.([^ ]+) %>/g'.
 */
(() => {
  // Global variable minimizers
  const w = window
  const de = document.documentElement
  const ls = window.localStorage

  const knownColorSchemes = ['dark', 'light']

  if (!ls.getItem('<%= options.STORAGE_KEY %>')) {
    ls.setItem('<%= options.STORAGE_KEY %>', 'dark')
  }

  let value = (ls && ls.getItem && ls.getItem('<%= options.STORAGE_KEY %>')) ? ls.getItem('<%= options.STORAGE_KEY %>') : getColorScheme()

  addColorScheme(value || '<%= options.FALLBACK %>')

  w['<%= options.GLOBAL_NAME %>'] = {
    value,
    getColorScheme,
    addColorScheme,
    removeColorScheme,
  }

  /**
   * 
   * @param {string} value 
   */
  function addColorScheme(value) {
    const className = value + "-mode"
    if (de.classList) {
      de.classList.add(className)
    }
    else {
      de.className += ' ' + className
    }
  }

  /**
   * 
   * @param {string} value 
   */
  function removeColorScheme(value) {
    const className = value + "-mode"
    if (de.classList) {
      de.classList.remove(className)
    }
    else {
      de.className = de.className.replace(new RegExp(className, 'g'), '')
    }
  }

  /**
   * 
   * @param {string} suffix 
   */
  function prefersColorScheme(suffix) {
    return w.matchMedia('(prefers-color-scheme' + suffix + ')')
  }

  function getColorScheme() {
    if (
      // @ts-expect-error TS assumes matchMedia is always defined
      w.matchMedia
      && prefersColorScheme('').media !== 'not all') {
      for (const colorScheme of knownColorSchemes) {
        if (prefersColorScheme(':' + colorScheme).matches) {
          return colorScheme
        }
      }
    }

    return '<%= options.FALLBACK %>'
  }
})()