export default defineNuxtPlugin(() => {
  const App = {
    debounce(fn: any, time: number | undefined) {
      let timer: any;
      return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, time || 300);
      };
    },
    isMobile: () => useMedia("(max-width: 768px)"),
    useClickOutside(elTargetRef: any, fn: any) {
      if (!elTargetRef) return;

      const listener = (e: MouseEvent) => {
        if (
          e.target == elTargetRef.value ||
          e.composedPath().includes(elTargetRef.value)
        ) {
          return;
        }
        if (typeof fn == "function") {
          fn(e);
        }
      };

      onMounted(() => {
        window.addEventListener("click", listener);
      });
      onBeforeUnmount(() => {
        window.removeEventListener("click", listener);
      });
      return {
        listener,
      };
    },
    error_message: {
      required: 'Field required',
      format: 'Format not matched',
    },
  };
  return {
    provide: App,
  };
})