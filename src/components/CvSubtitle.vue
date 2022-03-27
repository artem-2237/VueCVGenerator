<template>
  <div>
    <h3>{{ content }}</h3>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CvSubtitle',
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
  margin: 15px 0;
  padding-right: 40px;
}
</style>