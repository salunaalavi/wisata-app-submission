<template>
  <button :class="variant" :style="{ color: color }">
    <Icon :name="name" :size="size" />
  </button>
</template>
<script setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "20",
  },
  variant: {
    type: String,
    default: "primary",
  },
  color: {
    type: String,
    default: "",
  },
});
</script>
<style scoped lang="scss">
@import "../../assets/scss/libs/_variables";
@import "../../assets/scss/libs/_mixins";

button {
  padding: $spacer-1 $spacer-2;
  border-radius: $spacer-1;
  &.primary {
    color: $accent;
  }
  &.secondary {
    background-color: $secondary;
    color: white;
    &:hover {
      background-color: $primary;
    }
  }
  &.tertiary {
    background-color: $tertiary;
    color: $secondary;
    &:hover {
      background-color: $secondary;
      color: white;
    }
  }
  &.error {
    background-color: $tertiary;
    color: red;
    &:hover {
      background-color: red;
      color: white;
    }
  }
}
</style>
