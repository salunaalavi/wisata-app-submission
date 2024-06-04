<template>
  <Transition name="bounce">
    <nav v-if="isOpen" :style="{ width: '100%' }">
      <GenericInput
        v-model:value="todos.form.title"
        v-model:show-validation="todos.validationForm.title"
        class-title="w-full"
        label="Todo"
        placeholder="What you need to do!"
        :error-message="todos.error.title"
        :required="true"
      />
      <GenericTextArea
        v-if="showDescription"
        v-model:value="todos.form.description"
        v-model:show-validation="todos.validationForm.description"
        label="Description"
        class-description="w-full"
        placeholder="What you need to do!"
        :error-message="todos.error.description"
        :rows="3"
      />
      <ToggleGroup type="multiple" class="justify-start">
        <ToggleGroupItem :value="showDescription" aria-label="Toggle text">
          <TextIcon
            :class="['h-[1rem] w-[1rem]', 'icon']"
            @click="handleShowDescription"
          />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <TodoDatePicker class="icon" />
        </ToggleGroupItem>
      </ToggleGroup>
      <GenericButton class="w-full" color="secondary" @click="addTodo">{{
        actionType === "update" ? "Save" : "Add Todo"
      }}</GenericButton>
    </nav>
  </Transition>
</template>
<script setup>
import { Underline, TextIcon } from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const { actionType } = storeToRefs(useLayoutsStore());
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["updateOpen"]);
const todos = useTodosStore();
const showDescription = ref(false);

const handleShowDescription = () => {
  showDescription.value = true;
};

const addTodo = () => {
  try {
    if (actionType.value != "update") {
      todos.setTodo();
    } else {
      actionType.value = "";
      todos.resetForm();
      localStorage.setItem("todos", JSON.stringify(todos.todos));
    }
    emit("updateOpen", false);
  } catch (e) {}
};

onMounted(() => {
  showDescription.value = false;
});
</script>
<style>
.icon {
  transition: top 0.5s;
  color: var(--accent);
}
</style>
