export const useErrorStore = defineStore("error", () => {
  const error = ref(null);
  const success = ref(false);

  function setError(value: any) {
    error.value = value;
  }

  function setSuccess(value: any) {
    success.value = value;
  }

  return {
    error,
    success,
    setError,
    setSuccess,
  }
})