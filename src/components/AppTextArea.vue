<template>
  <textarea
      rows="1"
      ref="input"
      :value="modelValue"
      :placeholder="placeholder"
      @input="onInput"
      @keypress.enter.prevent="onEnter"
  ></textarea>
</template>

<script>
export default {
  name: 'AppTextArea',
  emits: ['update:modelValue', 'onEnter'],
  props: {
    modelValue: {
      type: String,
      require: true,
    },
    placeholder: {
      type: String,
      require: false,
      default: '',
    },
  },
  computed: {
    inputValue() {
      return this.modelValue
    }
  },
  methods: {
    onInput(e) {
      let height = Math.ceil(e.target.value.length / 28)
      e.target.style.height = 22 * (height || 1) + 2 + 'px'
      e.target.style.height = e.target.scrollHeight + 2 + 'px'
      this.$emit('update:modelValue', e.target.value)
    },
    onEnter(e) {
      this.$emit('onEnter')
    }
  },
  watch: {
    inputValue(val) {
      if (!val.length) {
        this.$refs.input.style.height = '24px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  width: 257px;
  height: 24px;
  resize: none;
  font-size: 16px;
  line-height: 22px;
  border: none;
  border-bottom: 2px solid $main-color;
  padding: 0 5px;
}
</style>