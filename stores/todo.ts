const STORE_NAME = "todos";

type TodoType = {
  title: string,
  description?: string | null,
  date?: string | null,
}

const getDefaultState = () => [] as TodoType[];

const getState = () => {
  if (typeof localStorage !== 'undefined') {
    const todos = localStorage.getItem(STORE_NAME);
    if (todos) {
      return JSON.parse(todos) as TodoType[];
    }
  }
  return getDefaultState();
}

const setState = (state: TodoType[]) => {
  localStorage.setItem(STORE_NAME, JSON.stringify(state));
}

export const useTodosStore = defineStore(STORE_NAME, () => {
  const todos = ref<TodoType[]>([]);
  const { $error_message } = useNuxtApp();
  const errorStore = useErrorStore();

  const form = ref<TodoType>({
    title: "",
    description: null,
  });

  const error = ref<TodoType>({
    title: "",
  });

  const validationForm = reactive({
    title: false,
  });

  const validationChecker = computed(() => {
    Object.keys(form.value).map((key: any) => {
      if (
        (form.value[key as keyof typeof form.value] === "" || form.value[key as keyof typeof form.value] === null || !form.value[key as keyof typeof form.value]) &&
        (key == "title")
      ) {
        error.value[key as keyof typeof form.value] = $error_message.required;
        validationForm[key as keyof typeof form.value] = true;
        return false;
      }
    });
    if (Object.values(validationForm).some((val) => val)) {
      return false;
    }
    return true;
  })

  function setTodo() {
    try {
      if (!validationChecker.value) throw new Error("Invalid value");

      todos.value = [...todos.value, form.value]
      setState(todos.value);
      resetForm();
    } catch (err) {
      throw err;
    }
  }

  function filterTodos(filter: string) {
    todos.value = todos.value.filter((todo) => todo.title.includes(filter));
  }

  function deleteTodo(todo: TodoType) {
    todos.value = todos.value.filter((item) => item.title !== todo.title);
    setState(todos.value);
  }

  function editTodo(index: number) {
    try {
      if (!validationChecker.value) throw new Error("Invalid value");

      todos.value[index] = form.value;
      setState(todos.value);
    } catch (err) {
      throw err;
    }
  }

  const resetForm = () => {
    form.value = {
      title: "",
      description: null,
      date: null,
    }
    error.value = {
      title: "",
    }
    errorStore.setSuccess(true);
    errorStore.setError(null);
  }

  onBeforeMount(() => {
    todos.value = getState()
  })

  return {
    todos,
    form,
    error,
    validationForm,
    setTodo,
    editTodo,
    resetForm,
  };
});