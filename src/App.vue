<template>
  <div class="container">
    <form class="form-add card" @submit.prevent="addBlock">
      <h2 class="form-add__title title">Новый блок</h2>
      <div class="form-add__input-wrapper">
        <div class="form-add__select-wrapper">
          <AppSelect :options="types" v-model="curBlockType"/>
        </div>
        <AppTextArea
            v-if="curBlockType !== 'Фото'"
            v-model="curContent"
            placeholder="Введите текст блока"
            @onEnter="addBlock"
        />
        <AppFileInput
            v-else
            :file-name="fileName"
            @onChange="onFileSelected($event)"
        />
        <span class="error" ref="error" v-show="isEmpty">Поле не должно быть пустым</span>
      </div>
      <div class="form-add__button-wrapper">
        <AppButton type="submit" text="Добавить"/>
      </div>
    </form>
    <div class="form-cv card">
      <div ref="cv">
        <h2 class="form-cv__title title" v-if="!blocks.length">Ваше резюме</h2>
        <CvItem
            v-else
            v-for="(item, index) in blocks"
            :key="item.id"
            :item="item"
            :index="index"
            @delete="deleteBlock($event)"
            @toDown="itemDown($event)"
            @toUp="itemUp($event)"
        />
      </div>
    </div>
  </div>
  <div class="container">
    <div class="download-button__wrapper">
      <AppButton text="Скачать PDF" @onClick="downloadPDF" />
    </div>
  </div>
</template>

<script>
import AppTextArea from '@/components/AppTextArea'
import AppButton from '@/components/AppButton'
import AppSelect from '@/components/AppSelect'
import CvItem from '@/components/CvItem'
import AppFileInput from '@/components/AppFileInput'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default {
  name: 'App',
  components: {
    AppTextArea,
    AppButton,
    AppSelect,
    CvItem,
    AppFileInput,
  },
  mounted() {
    this.blocks = JSON.parse(localStorage.getItem('blocks')) || []
  },
  data() {
    return {
      types: ['Заголовок', 'Подзаголовок', 'Фото', 'Текст'],
      curContent: '',
      fileName: '',
      curBlockType: '',
      blocks: [],
      isEmpty: false,
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
      if (this.curContent.length) {
        this.isEmpty = false
        this.blocks.push({
          id: Math.random().toString(32).substring(2, 6),
          component: this.curBlockComponent,
          content: this.curContent,
        })
        localStorage.setItem('blocks', JSON.stringify(this.blocks))
        this.curContent = ''
        this.fileName = ''
      } else {
        this.isEmpty = true
        this.$refs.error.style.animation = '1s error'
        setTimeout(() => {
          this.$refs.error.style.animation = 'none'
        }, 500)
      }
    },
    deleteBlock(id) {
      this.blocks = this.blocks.filter(el => el.id !== id)
      localStorage.setItem('blocks', JSON.stringify(this.blocks))
    },
    itemDown(index) {
      if (index !== this.blocks.length - 1) {
        let item = this.blocks.splice(index, 1)
        const arr = [...this.blocks]
        this.blocks = [
          ...arr.slice(0, index + 1),
          ...item,
          ...arr.slice(index + 1)
        ]
      }
      localStorage.setItem('blocks', JSON.stringify(this.blocks))

    },
    itemUp(index) {
      let item = this.blocks.splice(index, 1)
      const arr = [...this.blocks]
      this.blocks = [
        ...arr.slice(0, index - 1),
        ...item,
        ...arr.slice(index - 1)
      ]
      localStorage.setItem('blocks', JSON.stringify(this.blocks))
    },
    downloadPDF() {
      const doc = new jsPDF('p', 'px', 'a4')
      const cv = this.$refs.cv
      const options = {
        allowTaint: true,
        backgroundColor: '#ffffff',
        scale: 2,
        windowWidth: 1920,
      }
      html2canvas(cv, options).then(canvas => {
        const img = canvas.toDataURL('image/png')
        doc.addImage(img, 'PNG', 20, 20, canvas.width * 0.35, canvas.height * 0.35)
        doc.save('Cv.pdf')
      })
    },
    onFileSelected(e) {
      const file = e.target.files[0]
      this.fileName = file.name
      const reader = new FileReader()

      reader.readAsDataURL(file)

      reader.onload = () => {
        this.curContent = reader.result
      }
    },
  }
}
</script>

<style lang="scss">
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
.download-button__wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 50px;
}

@media (max-width: 1040px) {
  .container {
    width: 600px;
    flex-direction: column;
  }
  .form-add {
    width: 100%;
    margin-bottom: 20px;
    &__select-wrapper {
      display: block;
    }
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
