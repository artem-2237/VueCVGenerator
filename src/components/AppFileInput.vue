<template>
  <div>
    <input type="file" id="file" @change="$emit('onChange', $event)">
    <label for="file">
      <img src="@/images/download.png" alt="download-icon" width="32">
      <span>Загрузить фото</span>
    </label>
    <small v-if="fileName">{{ fileName }}</small>
  </div>
</template>

<script>
export default {
  name: 'AppFileInput',
  props: {
    fileName: {
      type: String,
      require: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  display: none;
}
label {
  display: flex;
  align-items: center;
  width: 165px;
  border-radius: 7px;
  overflow: hidden;
  cursor: pointer;
  transition: .3s all;
  &:hover img {
  }
  &:hover {
    background: $main-color;
    color: #fff;
    box-shadow: $button-shadow;
  }
}
img {
  margin-right: 5px;
  transition: .3s all;
}
</style>