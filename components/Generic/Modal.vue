<template>
  <div
    v-if="showModal"
    class="g-modal"
    :class="[styledClass]"
    style="height: calc(100vh)"
  >
    <div
      class="g-modal-content"
      :class="[
        `${isFullHeight ? 'h-full' : ''}`,
        `${showModal && !triggerCloseAnimation ? 'slide-in-right' : ''}`,
        `${triggerCloseAnimation ? 'slide-in-left' : ''}`,
      ]"
      :style="[`${maxWidth === 0 ? '' : 'max-width: ' + maxWidth + 'px'}`, `${width === 0 ? '' : 'width: ' + width + 'px'}`]"
    >
      <div ref="content" class="g-modal-content__slot overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  contentPosition: {
    type: String,
    default: "center", //center, right, left
  },
  isFullHeight: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
});

const { $debounce, $useClickOutside } = useNuxtApp();

const showModal = ref(false);
const content = ref();
const animateTime = 0.2;
let d = false;

$useClickOutside(content, () => {
  if (content.value && showModal.value) {
    if (d) {
      updateIsOpen(!showModal.value);
      d = false;
      return;
    }
    d = true;
  }
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      showModal.value = true;
    } else {
      closeModalWithAnimation();
    }
  }
);

const emit = defineEmits(["update:isOpen"]);
const triggerCloseAnimation = ref(false);

const styledClass = computed(() => {
  if (props.contentPosition === "left") {
    return "pos-right";
  }

  if (props.contentPosition === "right") {
    return "pos-right";
  }

  return "pos-center";
});

const animateClose = $debounce(function close() {
  triggerCloseAnimation.value = false;
  showModal.value = false;
}, animateTime * 1000);

function closeModalWithAnimation() {
  triggerCloseAnimation.value = true;
  animateClose();
}

function updateIsOpen(value) {
  emit("update:isOpen", value);
}
</script>
<style scoped lang="scss">
.g-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  &.pos-right {
    justify-content: flex-end;
  }

  &.pos-left {
    justify-content: flex-start;
  }

  &-content {
    background-color: white;
    border-radius: 6px;
    header {
      padding: 32px 24px;
      font-size: 24px;
      font-weight: 600;
      border-bottom: 1px solid #ececec;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__slot {
      padding: 24px;
      height: inherit;
    }
  }
}

.slide-in-right {
  animation: slideInRight 0.2s forwards;
}

.slide-in-left {
  animation: slideInLeft 0.2s forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>