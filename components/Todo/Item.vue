<template>
  <div class="todo-item" v-bind:class="{ 'is-complete': todo.completed }">
    <div class="flex w-full items-center gap-[1rem]">
      <div>
        <input
          class="cursor-pointer w-[1rem] h-[1rem] custom-radio border-2"
          type="checkbox"
          :checked="todo.completed"
          @change="handleRadioChange(todo.completed, todo.id)"
        />
      </div>
      <div class="flex flex-col">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span @click.prevent="handleOpenEditor(todo.id)">
                {{ todo.title }}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shift + Left Click to Update</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <span>
          {{ todo.description }}
        </span>
        <span>
          {{ todo.place }}
        </span>
        <span>
          {{ todo.date }}
        </span>
      </div>
      <button @click="deleteTodo(todo.id)" class="del">x</button>
    </div>
  </div>
</template>

<script setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const { todos, form } = storeToRefs(useTodosStore());
const { openEditor, actionType } = storeToRefs(useLayoutsStore());

const handleOpenEditor = (id) => {
  actionType.value = "update";
  const index = todos.value.findIndex((todo) => todo.id == id);
  form.value = todos.value[index];
  openEditor.value = true;
};

function deleteTodo(id) {
  const index = todos.value.findIndex((todo) => todo.id == id);
  todos.value = todos.value.filter((_, idx) => idx !== index);
  localStorage.setItem("todos", JSON.stringify(todos.value));
}

const handleRadioChange = (checked, id) => {
  const index = todos.value.findIndex((todo) => todo.id == id);
  todos.value = todos.value.map((todo, idx) => {
    if (index == idx) {
      return {
        ...todo,
        completed: !checked,
      };
    }

    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todos.value));
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/libs/variables";
@import "../../assets/scss/libs/mixins";

.todo-item {
  background: $secondary;
  padding: 1rem;
  border-radius: $spacer-2;
  margin-bottom: $spacer-1;
}
.is-complete {
  text-decoration: line-through;
}
.del {
  vertical-align: middle;
  margin-left: auto;
  background: red;
  color: $accent;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 99999999px;
  cursor: pointer;
  float: right;
}

input {
  @include flex-all-center;
  padding: $spacer-3;
  border-radius: $spacer-2;
  background-color: $primary;
  position: relative;
  box-shadow: 0px 7px 17px rgba(51, 51, 51, 0.07);
  border: 1px solid $secondary;
  font-size: 0.875rem;
  line-height: 1.25rem;
  &.warning {
    border-color: $accent;
  }
  &::placeholder {
    color: $secondary;
    font-weight: 400;
    font-size: 0.875rem;
  }
  &:focus {
    outline: none;
  }
}
</style>
