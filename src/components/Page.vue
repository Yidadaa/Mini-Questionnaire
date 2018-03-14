<template>
  <div v-if="page.type === 'pure'">
    <div class="desc" v-html="desc"></div>
  </div>
  <div v-else>
    <div class="info">
      <div class="type">{{ pageType }}</div>
      <div class="num">{{ index + 1 }}/{{ total }}</div>
    </div>
    
    <div class="desc" v-html="desc"></div>
   
    <div class="options">
      <div v-for="(item, index) in page.options" :key="index" 
        class="option-card" @click="select(index)"
        v-bind:class="{ active: page.selected.indexOf(index) > -1, withimg: !!item.image }"
        :style="item.image && 'background: url(' + item.image +'); background-position: center;'">
        {{ item.text }}
        <Icon type="checkmark" v-if="page.selected.indexOf(index) > -1" class="opt-icon"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";

export default {
  props: {
    page: Object,
    index: Number,
    total: Number
  },
  computed: {
    desc() {
      return marked(this.page.description || "");
    },
    pageType() {
      const dict = {
        single: "单选",
        multiple: "多选"
      };
      return dict[this.page.type] || "";
    }
  },
  methods: {
    select(index) {
      let selected = [];
      if (this.page.selected.indexOf(index) > -1) {
        selected = this.page.selected.filter(v => v !== index);
      } else {
        // 区分一下多选和单选
        selected =
          this.page.type === "single"
            ? [index]
            : this.page.selected.concat(index);
      }
      this.$emit("change", { selected }, this.index);
    }
  }
};
</script>


<style lang="less" scoped>
.info {
  font-size: 60px;
  padding: 0 10px;
  color: #eee;
  display: flex;
  justify-content: space-between;
}

.desc {
  padding: 30px 10px;
  font-size: 20px;
  color: #888;
}

.options {
  padding: 10px;
  font-size: 20px;
}

.option-card {
  background-color: #eee;
  padding: 20px;
  margin-top: 20px;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all ease 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.active {
  background: dodgerblue !important;
  color: #fff;
}

.withimg {
  height: 100px;
  position: relative;
}

</style>
