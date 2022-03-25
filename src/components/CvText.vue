<template>
  <div>
    <p>{{ content }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CvText',
  props: {
    content: {
      type: String,
      require: true,
    }
  }
}
</script>

<style scoped>
div {
  position: relative;
  margin: 5px 0;
}
</style>