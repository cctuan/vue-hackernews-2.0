<template>
  <fieldset :class="[`starability-basic`, 'rating']">
    <legend v-if="legend">{{ legend }}</legend>
    <div class="star-container">
      <template v-for="(item, index) in items">
        <input type="radio" :id="uuid(index)" name="rating" :value="item.value" :checked="hasChecked(index + 1)" v-on:change="change(index + 1)">
        <label :for="uuid(index)">
          <icon :name="(selected > index) ? 'star' : 'star-o'" color="yellow"/>
        </label>
      </template>
    </div>
  </fieldset>
</template>

<script>

import 'vue-awesome/icons/star'
import 'vue-awesome/icons/star-o'
import Icon from 'vue-awesome/components/Icon.vue'
export default {
  name: 'rating-star',
  components : {Icon},
  props: {
    uid: {
      type: String,
    },
    legend: String,
    items: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: Number,
      default: -1
    },
  },
  data () {
    return {
      selected: this.value
    }
  },

  methods: {
    uuid (index) {
      // generated uid might be different from server and from client
      return `rating-${this.uid}-item-${index}`
    },
    hasChecked (index) {
      return this.selected === index
    },
    change (index) {
      this.selected = index
      this.$emit('change', this.selected)
    }
  },
  computed: {
    count () {
      return this.items.length
    }
  }
}
</script>
<style lang="css" scoped>
fieldset {
  margin: auto;
}
.star-container {
  margin: 10px 0 15px;
  width: 100%;
}
.starability-basic {
  display: block;
  position: relative;
  width: 100%;
  padding: 0;
  border: none;
}

.starability-basic legend {
  position: relative;
  padding-top: 16px;
  font-size: 14px;
}

.starability-basic input {
  position: absolute;
  margin-right: -100%;
  opacity: 0;
}

.starability-basic label {
  position: relative;
  display: inline-block;
  margin: 0 8px;
  font-size: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}


</style>
