<template>
  <div
    class="switch"
    :class="{ 'switch--checked': check }"
    @click="switchChange()"
  >
    <input type="checkbox" class="switch__input" :checked="check" />
    <label class="switch__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Label'
    }
  },
  data() {
    return {
      check: false
    }
  },
  watch: {
    checked: {
      handler(checked) {
        this.check = checked
      },
      immediate: true
    }
  },
  methods: {
    switchChange() {
      this.check = !this.check
      this.$emit('switch-change', this.check)
    }
  }
}
</script>

<style lang="scss">
.switch {
  @apply inline-block relative;

  &__input {
    @apply absolute top-0 left-0 w-12 h-20 opacity-0 z-0;
  }

  // Unchecked
  &__label {
    @apply block pl-16;

    &:before {
      content: '';
      @apply absolute left-0 w-12 h-4 bg-black bg-opacity-25 rounded-lg z-10;
      @apply transition-all duration-75 ease-in;
      top: 0.27rem;
    }

    &:after {
      content: '';
      @apply absolute left-0 w-6 h-6 bg-white rounded-full shadow z-20;
      @apply transition-all duration-75 ease-in;
      top: 0.01rem;
    }
  }

  // Checked
  &--checked .switch__label {
    &:before {
      @apply bg-purple-500;
    }

    &:after {
      @apply bg-purple-700;
      left: 1.5rem;
    }
  }
}
</style>
