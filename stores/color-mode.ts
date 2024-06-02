import { defineStore } from 'pinia'

const STORE_NAME = "color-mode";

type Theme = {
  mode: "light" | "dark",
}

const getDefaultState = () => ({
  mode: "light",
}) as Theme;

const getState = () => {
  if (typeof localStorage !== 'undefined') {
    const settings = localStorage.getItem(STORE_NAME);
    if (settings) {
      return JSON.parse(settings) as Theme;
    }
  }
  return getDefaultState();
}

export const useThemeColorStore = defineStore(STORE_NAME, {
  state: () => getState(),
  actions: {
    updateTheme(theme: "light" | "dark") {
      this.mode = theme;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORE_NAME, JSON.stringify(this.$state));
      }
    },
  },
})
