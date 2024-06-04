<template>
  <main>
    <div
      v-if="!(todoList.length > 0)"
      class="flex w-full min-h-full justify-center items-center"
    >
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
const { todoList } = storeToRefs(useTodosStore());

useServerSeoMeta({
  title: "All Tasks",
});

useHead({
  title: "All Tasks",
});
</script>
