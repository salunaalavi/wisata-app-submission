export const useLayoutsStore = defineStore("layouts", () => {
  const openEditor = ref(true);
  const actionType = ref("create");
  const sort = ref("");
  const filter = ref("");

  function setOpenEditor(value: boolean) {
    openEditor.value = value;
  }

  function setActionType(value: string) {
    actionType.value = value;
  }

  return {
    sort,
    filter,
    setOpenEditor,
    openEditor,
    actionType,
    setActionType,
  };
});