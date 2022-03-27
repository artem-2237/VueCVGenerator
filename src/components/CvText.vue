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
  margin: 10px 0;
  padding-right: 40px;
}
@media (max-width: 640px) {
  div {
    padding-right: 50px;
  }
}
</style>