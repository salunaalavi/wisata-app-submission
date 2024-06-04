<template>
  <div
    class="flex gap-4"
    :class="{ 'flex-col': isVertical }"
  >
    <label
      v-for="option in options"
      :key="option.value"
      class="flex items-center"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
    >
      <input
        class="cursor-pointer w-5 h-5 custom-radio border-2"
        type="radio"
        :checked="value === option.value"
        :value="option.value"
        :disabled="disabled"
        @change="handleRadioChange(option.value)"
      >
      <span
        class="ml-3 text-sm font-medium"
        style="color: #0A0A0A"
      >
        {{ option.label }}
      </span>
    </label>
  </div>
</template>

<script setup>
const emit = defineEmits(['update:value']);
const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  value: {
    type: [String, Number],
    default: null,
  },
  isVertical: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const handleRadioChange = (value) => {
  emit('update:value', value);
};
</script>
<style scoped lang="scss">
.custom-radio {
  &:focus {
    box-shadow: none;
    outline: none;
    border-color: unset;
  }
}
</style>