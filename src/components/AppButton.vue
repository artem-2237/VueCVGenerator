<template>
  <button :type="type" @click="$emit('onClick')">{{ text }}</button>
</template>

<script>
export default {
  name: 'AppButton',
  emits: ['onClick'],
  props: {
    text: {
      type: String,
      require: false,
      default: 'Button',
    },
    type: {
      type: String,
      require: false,
      default: 'button',
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  padding: 10px 25px;
  font-size: 16px;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 100px;
  background: $main-color;
  cursor: pointer;
  transition: .3s all;

  &:hover {
    box-shadow: $button-shadow;
  }
}
</style>