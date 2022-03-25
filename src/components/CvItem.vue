<template>
  <component :is="item.component" :content="item.content">
    <button class="close" @click="toggleContextMenu">&#9679;&#9679;&#9679;</button>
    <div class="context-menu" :class="{open: contextOpen}">
      <span @click="deleteItem(item.id)">Удалить</span>
      <span @click="index ? $emit('toUp', index) : false">Вверх</span>
      <span @click="$emit('toDown', index)">Вниз</span>
    </div>
  </component>
</template>

<script>
import CvTitle from '@/components/CvTitle'
import CvSubtitle from '@/components/CvSubtitle'
import CvPhoto from '@/components/CvPhoto'
import CvText from '@/components/CvText'

export default {
  name: 'CvItem',
  emits: ['delete', 'toDown', 'toUp'],
  props: {
    item: {
      type: Object,
      require: true,
    },
    index: {
      type: Number,
      require: true,
    }
  },
  components: {
    CvTitle,
    CvSubtitle,
    CvPhoto,
    CvText,
  },
  data() {
    return {
      contextOpen: false,
    }
  },
  methods: {
    toggleContextMenu() {
      const close = () => {
        if (this.contextOpen) {
          document.body.removeEventListener('click', close)
        }
        this.contextOpen = !this.contextOpen
      }
      if (!this.contextOpen) {
        document.body.addEventListener('click', close)
      }
    },
    deleteItem(id) {
      this.$emit('delete', id)
    },
    toDown(index) {
      this.$emit('toDown', index)
    }
  },
}
</script>

<style lang="scss" scoped>
.cv-item {
  position: relative;
}

.close {
  width: 30px;
  height: 30px;
  position: absolute;
  top: -5px;
  right: 5px;
  font-size: 10px;
  color: #777777;
  background: transparent;
  border: none;
  border-radius: 7px;
  letter-spacing: 2px;
  cursor: pointer;
  transition: .2s all;
  &:hover {
    background: transparentize(#000000, 0.9);
   }
}
.context-menu {
  width: 100px;
  position: absolute;
  top: 30px;
  right: 5px;
  border-radius: 10px;
  background-color: transparentize(#ffffff, 0.2);
  box-shadow: 0 0 15px #adadad;
  overflow: hidden;
  transition: .3s all;
  transform: scale(0.5);
  opacity: 0;
  z-index: -1;
  span {
    display: block;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
      background: transparentize($main-color, 0.1);
    }
  }
}
</style>
