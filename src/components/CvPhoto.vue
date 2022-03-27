<template>
  <div>
    <div class="img" :style="{backgroundImage: `url(${content})`}"></div>
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

<style lang="scss" scoped>
div {
  position: relative;
  margin: 30px 0;
  padding-right: 40px;
}

.img {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>