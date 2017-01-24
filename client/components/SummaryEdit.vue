<template>
  <div class="content">
    <div class="content-inner">
      <div class="edit-section">
        <div class="edit-title">
          年份
        </div>
        <div class="mdl-textfield">
          <input class="mdl-textfield__input" placeholder="請輸入年份"
            v-model="post.meta.other.year" id="year-input">
          <label class="mdl-textfield__label" for="year-input"></label>
        </div>
      </div>
      <div class="edit-section">
        <div class="edit-title">
          成熟度
        </div>
        <div class="chip-list">
          <div class="chip-item" v-for="matury_type in matury_types">
            <div :class="'type-item mdl-button mdl-js-button ' +
              (post.meta.other.matury === matury_type.val ? 'selected' : '')"
              v-on:click="selectMaturyType(matury_type.val)">
              {{matury_type.label}}
            </div>
          </div>
        </div>
        <div class="clear-both"></div>
      </div>
      <div class="edit-section">
        <div class="edit-title">
          價格
        </div>
        <div class="mdl-textfield">
          <input class="mdl-textfield__input" placeholder="請輸入價格"
            v-model="post.meta.other.price" id="price-input">
          <label class="mdl-textfield__label" for="price-input"></label>
        </div>
      </div>
      <div class="edit-section">
        <div class="edit-title">
          詳細評論
        </div>
        <div class="mdl-textfield">
          <textarea class="mdl-textfield__input"  placeholder="請輸入２０字以內短評"
            v-model="post.meta.other.description" id="description" />
          <label class="mdl-textfield__label" for="description"></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mergeDeep
} from './../utility'
export default {
  name: 'summary-edit',
  components: {
  },
  props: {
    post: {
      default: {},
      type: Object
    },
  },
  data() {
    return {
      matury_types: [
        {val: 1, label: '已老化'},
        {val: 2, label: '適飲'},
        {val: 3, label: '可陳年'},
      ]
    }
  },
  computed: {
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    selectMaturyType(val) {
      let _post = Object.create(this.post)
      _post.meta.other.matury = val
      this.$emit('change', _post)
    },
  }
}
</script>
<style lang="stylus" scoped>
.content-inner
  padding 0 16px
.edit-section
  border-top 1px solid rgba(255, 255, 255, 0.12)
  .edit-title
    font-size 14px
    padding 15px 0
  .clear-both
    clear both
    margin-bottom 15px
.chip-item
  float left
  padding 0 10px 0 10px
  div
    border-width: 1px;
    border-style: solid;
  .selected
    background-color: rgba(158,158,158,.2)
.type-item
  color #cbccce
  margin-top 10px
.mdl-textfield
  width 100%
  input, textarea
    border-bottom-color #cbccce
</style>
