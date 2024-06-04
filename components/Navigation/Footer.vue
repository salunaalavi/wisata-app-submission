<template>
  <footer :class="['main__footer', openEditor && 'input']" ref="content">
    <Transition name="bounce">
      <div
        v-if="!openEditor"
        class="flex w-full place-content-between items-center"
      >
        <div>
          <ToggleGroup type="multiple" class="justify-start">
            <ToggleGroupItem :value="showDescription" aria-label="Toggle text">
              <Select v-model:model-value="sort">
                <SelectTrigger className="w-[6rem] flex place-content-between">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sort</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <Select v-model:model-value="filter">
                <SelectTrigger className="w-[6rem] flex place-content-between">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Filter</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="uncompleted">Uncompleted</SelectItem>
                </SelectContent>
              </Select>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <nav class="main__footer--nav">
          <GenericButton color="secondary" @click="openInput">
            <GenericIcon
              name="ic:round-plus"
              color="var(--neutral)"
              size="1rem"
            />
          </GenericButton>
        </nav>
      </div>
    </Transition>
    <TodoCreate :is-open="openEditor" @update-open="openChange" />
  </footer>
</template>
<script setup>
import { Underline, TextIcon } from "lucide-vue-next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const { $useClickOutside } = useNuxtApp();
const { openEditor, actionType } = storeToRefs(useLayoutsStore());
const todos = storeToRefs(useTodosStore());
const { sort, filter } = storeToRefs(useLayoutsStore());
const content = ref();

const openInput = () => {
  openEditor.value = !openEditor.value;
};

const openChange = (value) => {
  if (value !== null || value !== undefined) {
    openEditor.value = value;
    return;
  }

  openEditor.value = !openEditor.value;
};

$useClickOutside(content, (e) => {
  if (e.shiftKey || actionType.value === "update") {
    return;
  }

  todos.form.value = {
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  };
  openEditor.value = false;
});
</script>
