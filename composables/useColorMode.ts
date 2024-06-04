import { useState } from '#imports'
import type { ColorModeInstance } from "@/types/color-scheme"

export const useColorMode = () => {
  return useState('color-mode').value as ColorModeInstance
}