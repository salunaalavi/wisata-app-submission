<template>
  <div class="flex justify-between items-center text-red-500 h-[80px]">
    <div class="flex flex-col">
      <p>
        {{ name }}
      </p>
      <h3>
        <slot />
      </h3>
    </div>
    <Icon name="pajamas:error" size="30" />
  </div>
</template>
<script setup>
defineProps({
  name: {
    type: String,
    default: ""
  }
})
</script>
