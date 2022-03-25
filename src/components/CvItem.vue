<template>
  <component :is="item.component" :content="item.content">
    <button class="close" @click="$emit('delete', item.id)">×</button>
  </component>
</template>

<script>
import CvTitle from '@/components/CvTitle'
import CvSubtitle from '@/components/CvSubtitle'
import CvPhoto from '@/components/CvPhoto'
import CvText from '@/components/CvText'

export default {
  name: 'CvItem',
  props: {
    item: {
      type: Object,
      require: true,
    }
  },
  components: {
    CvTitle,
    CvSubtitle,
    CvPhoto,
    CvText,
  }
}
</script>

<style lang="scss" scoped>
.cv-item {
  position: relative;
}

.close {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 5px;
  background: transparent;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background: transparentize(#000000, 0.7);
   }
}
</style>
