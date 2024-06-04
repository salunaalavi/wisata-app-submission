<script setup lang="ts">
import { ref } from "vue";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";

import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Calendar } from "@/components/ui/calendar";

const { form } = storeToRefs(useTodosStore());
const df = new DateFormatter("en-US", {
  dateStyle: "long",

});

const value = ref<DateValue>();

watch(() => value.value, (val) => {
  form.value.date = val?.toString();
})

const modalData = reactive({
  isOpen: false,
  contentPosition: "center",
  isFullheight: false,
  maxWitdh: 400,
  title: "",
});
</script>

<template>
  <GenericModal
    v-model:is-open="modalData.isOpen"
    :content-position="modalData.contentPosition"
    :is-full-height="modalData.isFullheight"
    :max-width="modalData.maxWitdh"
    @update:isOpen="(val) => (modalData.isOpen = val)"
  >
    <Calendar v-model="value" initial-focus />
  </GenericModal>
  <CalendarIcon class="w-[1rem] h-[1rem]" @click="modalData.isOpen = !modalData.isOpen" />
</template>
