<template>
  <!-- <GenericLoader v-if="layouts.loading" /> -->
  <!-- <div>
    <h1>Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.value">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="sepia">Sepia</option>
    </select>
  </div> -->
  <div class="main">
    <NavigationHeader />
    <slot />
    <NavigationFooter />
  </div>
  <!-- <GenericModal
    v-model:is-open="errorModal.isOpen"
    :content-position="errorModal.contentPosition"
    :is-full-height="errorModal.isFullheight"
    :width="errorModal.width"
    :max-width="errorModal.maxWidth"
    @update:is-open="closeError"
  >
    <GenericError :name="errorStore.error?.name">
      <template v-for="(error, index) in errorStore.error" :key="index">
        <p class="pt-2">
          {{ error.field }} {{ error.message }}
        </p>
      </template>
      {{ errorStore.error?.message }}
    </GenericError>
  </GenericModal>
  <GenericModal
    v-model:is-open="successModal.isOpen"
    :content-position="successModal.contentPosition"
    :is-full-height="successModal.isFullheight"
    :width="successModal.width"
    :max-width="successModal.maxWidth"
    @update:is-open="closeSuccess"
  >
    <GenericSuccess> Success </GenericSuccess>
  </GenericModal> -->
</template>
<script setup>
// const layouts = useLayoutsStore();
const errorStore = useErrorStore();

const errorModal = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});

const successModal = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  width: 400,
  maxWidth: 600,
});

function closeError(value) {
  if (!value) {
    errorStore.setError(null);
  }
  errorModal.isOpen = value;
}

function closeSuccess(value) {
  if (!value) {
    errorStore.setSuccess(false);
  }
  successModal.isOpen = value;
}

watch(
  () => errorStore.error,
  (value) => {
    if (value) {
      errorModal.isOpen = true;
    } else {
      errorModal.isOpen = false;
    }
  }
);

watch(
  () => errorStore.success,
  (value) => {
    if (value) {
      successModal.isOpen = true;
    } else {
      successModal.isOpen = false;
    }
  }
);

onMounted(() => {
  setTimeout(() => {
    layouts.setLoading(false);
  }, 300)
})
</script>