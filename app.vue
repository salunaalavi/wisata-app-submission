<script lang="ts" setup>
// const colorMode = useColorMode()
</script>

<template>
  <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.value">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div>
  <div>
    <NuxtWelcome />
  </div>
</template>
