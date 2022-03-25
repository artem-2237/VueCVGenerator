<template>
  <div>
    <img :src="content" alt="">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CvPhoto',
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
  margin: 30px 0;
}
</style>