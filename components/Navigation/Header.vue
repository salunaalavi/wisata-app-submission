<template>
  <header class="main__header">
    <nav class="main__header--nav-title">
      Tasks
    </nav>
    <nav class="main__header--nav desktop">
      <GenericIcon :name="$colorMode.value === 'dark' ? 'iconoir:sun-light' : 'iconamoon:mode-dark'" size="1rem" @click="changeThemeColor" />
    </nav>
    <!-- <GenericModal
      v-model:is-open="modalData.isOpen"
      :content-position="modalData.contentPosition"
      :is-full-height="modalData.isFullheight"
      :max-width="modalData.maxWitdh"
      @update:isOpen="(val) => modalData.isOpen = val"
    >
      <aside class="main__header--aside">
        <nuxt-link :to="{ name: 'index' }">Dashboard</nuxt-link>
        <nuxt-link :to="{ name: 'users' }">Users</nuxt-link>
      </aside>
    </GenericModal> -->
  </header>
</template>
<script setup>
const { $colorMode, $isMobile } = useNuxtApp();
const modalData = reactive({
  isOpen: false,
  contentPosition: "right",
  isFullheight: true,
  maxWitdh: 400,
  title: "",
});

const changeThemeColor = () => {
  if ($colorMode.value === "dark") {
    $colorMode.value = "light";
    return;
  }

  $colorMode.value = "dark";
}
</script>
