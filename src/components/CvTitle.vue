<template>
  <div>
    <h2>{{ content }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'CvTitle',
  props: {
    content: {
      type: String,
      require: true,
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
  margin: 30px 0;
  padding-right: 40px;
}
h2 {
  display: inline-block;
  padding: 0 3px 0 2px;
  border-bottom: 2px solid $main-color;
}
@media (max-width: 640px) {
  div {
    padding-right: 50px;
  }
}
</style>