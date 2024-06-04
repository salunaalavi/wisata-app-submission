<template>
  <div class="flex flex-col mb-2" :class="[`${className}`]">
    <label class="mb-1">
      {{ label }}
      <span v-if="required" style="color: red"> * </span>
    </label>
    <input
      :class="{
        warning: showValidation,
      }"
      :type="type"
      :value="viewValue"
      :placeholder="placeholder"
      @input="validateField($event)"
    />
    <p class="pt-[0.1rem] text-red-500 h-[1.5rem]">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: [String, Number, Object, Array],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
  validator: {
    type: [RegExp, null, Array],
    default: null,
  },
  type: {
    type: String,
    default: "text", // [text, password]
  },
  showValidation: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:value", "update:showValidation"]);
const viewValue = computed(() => {
  if (props.parser && props.value && props.value !== "") {
    return props.parser(props.value);
  }
  return props.value;
});

function validateField(e) {
  let showValidation = false;
  let inputValue = e.target.value;
  if (props.validator) {
    e = e ? e : window.event;
    inputValue = e.target.value;
    if (typeof props.validator === "object" && props.validator.length > 0) {
      props.validator.forEach((regex, i) => {
        if (i === 0) {
          showValidation = !regex.test(inputValue);
        } else {
          showValidation = showValidation && !regex.test(inputValue);
        }
      });
    } else {
      showValidation = !props.validator?.test(inputValue) || false;
    }
    // cancel validator if its not valid because of required
    if (inputValue === "" && showValidation && !props.required) {
      showValidation = false;
    }
  } else {
    showValidation =
      props.required &&
      (inputValue === "" || inputValue === null || inputValue === undefined);
  }
  emit("update:showValidation", showValidation);
  emit("update:value", inputValue);
}
</script>
<style scoped lang="scss">
@import "../../assets/scss/libs/_variables";
@import "../../assets/scss/libs/_mixins";

input {
  @include flex-all-center;
  padding: $spacer-3;
  border-radius: $spacer-2;
  background-color: $primary;
  position: relative;
  width: 100%;
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
