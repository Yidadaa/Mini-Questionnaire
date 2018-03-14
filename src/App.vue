<template>
  <div id="app">
    <div class="progress">
      <Progress :percent="percent" :stroke-width=5 :active="true" hide-info></Progress>
    </div>
    <div id="page-container">
      <transition-group name="flip">
        <Page :page="item" v-for="(item, index) in pages" :key="index"
          v-if="index === currentIndex" v-on:change="change" :index="index"
          :total="total"/>
      </transition-group>
    </div>
    <div id="bottom-tool">
        <Button class="tool-btn" type="text" shape="circle" @click="prevPage" :disabled="currentIndex === 0">
            <Icon type="chevron-left"></Icon>
        </Button>
        <Button class="tool-btn" type="primary" shape="circle" :disabled="!couldSubmit" @click="submit">
          <Icon type="paper-airplane"></Icon>
        </Button>
        <Button class="tool-btn" type="text" shape="circle" @click="nextPage" :disabled="currentIndex === total - 1">
            <Icon type="chevron-right"></Icon>
        </Button>
    </div>
  </div>
</template>

<script>
import Page from "./components/Page";
import { pages } from "./template";

const state = pages.map(v => {
  return Object.assign({}, v, {
    selected: []
  })
})

console.log(state)

export default {
  name: "app",
  components: {
    Page
  },
  data() {
    return {
      pages: state,
      currentIndex: 0,
      models: {},
    };
  },
  computed: {
    currentPage() {
      return this.pages[this.currentIndex];
    },
    total() {
      return this.pages.length;
    },
    percent() {
      return parseInt(this.pages.filter(v => v.selected.length > 0).length / this.total * 100)
    },
    couldSubmit() {
      return this.pages.every(v => v.selected.length > 0)
    }
  },
  methods: {
    nextPage() {
      this.currentIndex = this.currentIndex < this.total - 1 ? this.currentIndex + 1 : this.total - 1;
    },
    prevPage() {
      this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : 0;
    },
    submit() {
      this.$Notice.open({
        title: '提交成功',
        desc: this.pages.map(v => v.selected.join(', ')).join('\n')
      })
    },
    change(content, index) {
      this.pages[index] = Object.assign(this.pages[index], content)
    }
  }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 90px;

  .progress {
    padding: 5px 20px;
  }

  #page-container {
    padding: 10px;
  }

  #bottom-tool {
    position: fixed;
    bottom: 0;
    display: flex;
    height: 70px;
    width: 100%;
    padding: 10px;
    background-color: #fff;

    .tool-btn {
      flex-grow: 1;
      margin: 0 5px;
      font-size: 18px;
    }
  }
}


.flip-enter-active {
  animation: flip 0.5s ease;
}

.flip-leave-active {
  animation: flip 0.2s ease reverse;
}

@keyframes flip {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
