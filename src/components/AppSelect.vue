<template>
  <div class="select" v-out="closeList">
    <div class="select__selected" @click.prevent="toggleList">
      {{ currentOption }}
    </div>
    <div
        class="select__list"
        :class="{open: isOpen}"
    >
      <div
          class="select__item"
          v-for="option in options"
          :key="option"
          @click="changeCurrent(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSelect',
  emits: ['update:modelValue'],
  props: {
    options: {
      type: Array,
      require: false,
      default: ['Example 1', 'Example 2', 'Example 3'],
    },
    modelValue: String,
  },
  data() {
    return {
      currentOption: this.options[0],
      isOpen: false,
    }
  },
  computed: {
    open() {
      return
    },
  },
  methods: {
    changeCurrent(option) {
      this.currentOption = option
      this.isOpen = false
    },
    toggleList() {
      this.isOpen = !this.isOpen
    },
    closeList() {
      if (this.isOpen) {
        this.isOpen = false
      }
    },
  },
  watch: {
    currentOption: {
      handler(val) {
        this.$emit('update:modelValue', val)
      },
      immediate: true,
    },
  },
  directives: {
    out: {
      mounted(el, binding) {
        el.addEventListener('click', e => e.stopPropagation())
        document.body.addEventListener('click', binding.value)
      },
      unmounted(el, binding) {
        document.body.removeEventListener('click', binding.value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  display: inline-block;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 700;
  &:after {
    position: absolute;
    top: 7px;
    right: 5px;
    content: '';
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid $main-color;
  }
  &__selected {
    display: inline-block;
    padding-right: 25px;
  }
  &__list {
    position: absolute;
    top: 20px;
    left: -10px;
    border-radius: 10px;
    background-color: transparentize(#ffffff, 0.2);
    box-shadow: 0 0 15px #adadad;
    overflow: hidden;
    transition: .3s all;
    transform: scale(0.5);
    opacity: 0;
    z-index: -1;
  }
  &__item {
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background: transparentize($main-color, 0.1);
    }
  }
}

.open {
  transform: scale(1) !important;
  opacity: 1 !important;
  z-index: 1 !important;
}
</style>