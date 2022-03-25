<template>
  <div class="container">
    <form class="form-add card" @submit.prevent="addBlock">
      <h2 class="form-add__title title">Новый блок</h2>
      <div class="form-add__input-wrapper">
        <div class="form-add__select-wrapper">
          <AppSelect :options="types" v-model="curBlockType"/>
        </div>
        <AppTextArea
            v-model="curContent"
            :placeholder="curBlockType === 'Фото' ? 'Введите url картинки' : 'Введите текст блока'"
            @onEnter="addBlock"
        />
      </div>
      <div class="form-add__button-wrapper">
        <AppButton type="submit" text="Добавить"/>
      </div>
    </form>
    <div class="form-cv card">
      <h2 class="form-cv__title title" v-if="!blocks.length">Ваше резюме</h2>
      <CvItem
          v-for="item in blocks"
          :key="item.id"
          :item="item"
          @delete="deleteBlock($event)"
      />
    </div>
  </div>
</template>

<script>
import AppTextArea from '@/components/AppTextArea'
import AppButton from '@/components/AppButton'
import AppSelect from '@/components/AppSelect'
import CvItem from '@/components/CvItem'

export default {
  name: 'App',
  components: {
    AppTextArea,
    AppButton,
    AppSelect,
    CvItem,
  },
  data() {
    return {
      types: ['Заголовок', 'Подзаголовок', 'Фото', 'Текст'],
      curContent: '',
      curBlockType: '',
      blocks: [
        {id: 1, component: 'CvTitle', content: 'Заголовок'},
        {id: 2, component: 'CvSubtitle', content: 'Подзаголовок'},
        {id: 3, component: 'CvPhoto', content: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'},
        {id: 4, component: 'CvText', content: 'Какой-то текст'},
      ],
    }
  },
  computed: {
    curBlockComponent() {
      switch (this.curBlockType) {
        case '':
          return ''
          break
        case 'Заголовок':
          return 'CvTitle'
          break
        case 'Подзаголовок':
          return 'CvSubtitle'
          break
        case 'Фото':
          return 'CvPhoto'
          break
        case 'Текст':
          return 'CvText'
          break
      }
    },
  },
  methods: {
    addBlock() {
      this.blocks.push({
        id: Math.random().toString(32).substr(2, 6),
        component: this.curBlockComponent,
        content: this.curContent,
      })
      this.curContent = ''
    },
    deleteBlock(id) {
      this.blocks = this.blocks.filter(el => el.id !== id)
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700&display=swap');

html {
  box-sizing: border-box;
}

*, *:after, *:before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
  outline: none;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

body {
  width: 100vw;
  height: 100vh;
  background: $bg-color;
  color: $text-color;
  font-family: 'Exo 2', sans-serif;
}

img {
  max-width: 100%;
}

.container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 1000px;
  margin: auto;
  padding-top: 50px;
}

.card {
  background: #ffffff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 2px 3px 15px #959595;
}

.title {
  text-transform: uppercase;
  margin-bottom: 30px;
}

.form-add {
  width: 32%;
  &__select-wrapper {
    display: inline-block;
    margin-bottom: 30px;
  }
  &__input-wrapper {
    margin-bottom: 30px;
    &:first-child {
      margin-bottom: 30px;
    }
  }
  &__button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
}

.form-cv {
  width: 66%;
}

.login-button-wrapper {
  position: absolute;
  top: 30px;
  right: 0;
}

@keyframes close {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}

@media (max-width: 1040px) {
  .container {
    width: 600px;
    flex-direction: column;
  }
  .form-add {
    width: 100%;
    margin-bottom: 20px;
  }
  .form-cv {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .container {
    width: 320px;
    max-width: 95%;
  }
}
</style>
