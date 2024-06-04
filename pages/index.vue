<template>
  <main>
    <div v-if="!(todoList.length > 0)" class="flex w-full justify-center">
      <img src="@/assets/icons/todo-empty-state.svg" alt="empty" />
    </div>
    <div v-for="(todo, index) in todoList" :key="index">
      <Transition name="bounce" :key="index">
        <TodoItem :index="index" :todo="todo" />
      </Transition>
    </div>
  </main>
</template>
<script setup>
const { todos, form } = storeToRefs(useTodosStore());
const layouts = storeToRefs(useLayoutsStore());
const todoList = ref(todos.value);

watch(
  () => layouts.sort.value,
  (val) => {
    switch (val) {
      case "title": {
        todoList.value = todoList.value.sort((a, b) =>
          (a?.title || "").localeCompare((b?.title || ""))
        );
        break;
      }
      case "date": {
        todoList.value = todoList.value.sort((a, b) =>
          (a?.date || "").localeCompare((b?.date || ""))
        );
        break;
      }
    }
  }
);

watch(
  () => layouts.filter.value,
  (val) => {
    switch (val) {
      case "completed": {
        todoList.value = todos.value.filter((todo) => !!todo?.completed);
        break;
      }
      case "uncompleted": {
        todoList.value = todos.value.filter((todo) => !todo?.completed);
        break;
      }
    }
  }
);

onMounted(() => {
  todoList.value = todos.value;
});

useServerSeoMeta({
  title: "All Tasks",
});

useHead({
  title: "All Tasks",
});
</script>
