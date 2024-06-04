<template>
  <button :class="color">
    <slot />
  </button>
</template>
<script setup>
defineProps({
  color: {
    type: String,
    default: "primary",
  },
});
</script>
<style scoped lang="scss">
@import "../../assets/scss/libs/_variables";
@import "../../assets/scss/libs/_mixins";

button {
  padding: $spacer-1 $spacer-2;
  border-radius: $spacer-1;
  transition: 0.5s;
  font-size: calc(12px + 0.390625vw);
  box-sizing: border-box;
  &.primary {
    background-color: $primary;
    color: white;
    &:hover {
      background-color: $secondary;
    }
  }
  &.secondary {
    background-color: $secondary;
    border: 1px solid $secondary;
    color: white;
    &:hover {
      color: $secondary;
      background-color: $tertiary;
    }
  }
  &.tertiary {
    background-color: $tertiary;
    color: $primary;
    &:hover {
      background-color: $primary;
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
