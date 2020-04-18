// components/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recom:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad(){
      //isLoad的作用是为了请求多张图片，只需要知道一张图片高度的情况下即可，即横排列的布局
      //控制只发送一次事件
      if(!this.data.isLoad){
        this.triggerEvent('imageload')
        this.data.isLoad= true
      }
    },
  }
})
