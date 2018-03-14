/**
 * @file 存放问卷的模板设置
 */

/**
 * 合并两个对象
 */
function merge(a, b) {
  return Object.assign({}, a, b)
}

export const welcome = {
  type: 'pure',
  description: `## 你好，快毕业了\n我们在筹划毕业纪念品的事宜\n\n想听取一些你的意见\n\n希望你能抽几分钟\n\n回答几个小小的问题`
}

export const option = {
  text: 'some text here',
  image: null,
  type: 'common', // common, input 等
}

export const single = {
  type: 'single',
  description: '你的心理**预期价格**',
  options: [option, option, option],
  name: 'default'
}

export const multiple = {
  type: 'multiple',
  description: '你喜欢的**颜色**',
  options: [option, option, option, option],
  name: 'default'
}

export const pages = [
  merge(single, {
    description: '你**期望**这件T恤的价格是多少钱',
    options: ['50元以内', '50~100元', '100~200元', '无限制'].map(v => merge(option, {
      text: v
    }))
  }), merge(single, {
    description: '你喜欢什么样式的T恤',
    options: ['翻领', '圆领', 'V领', '无所谓'].map(v => merge(option, {
      text: v
    }))
  }), merge(single, {
    description: '你喜欢什么样的风格',
    options: ['简约', '卡通', '艺术', '科技', '古风'].map(v => merge(option, {
      text: v
    }))
  }), merge(single, {
    description: '你喜欢什么样的材质',
    options: ['纯棉', '涤纶', '麻'].map(v => merge(option, {
      text: v
    }))
  }), merge(multiple, {
    description: '你还想要其他周边吗',
    options: ['棒球帽', '勋章', '手环', '不用了'].map(v => merge(option, {
      text: v
    }))
  })
]