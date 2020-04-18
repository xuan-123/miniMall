// pages/index/childCpns/w-ti/w-ti.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:{
        type:Array,
        value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ind:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tiClick(event){
      //获取用户点击的类别
       const index = event.currentTarget.dataset.index
       this.setData({
          ind:index
       })
       //子传父通过点击事件传递一个数据
       const data = {index:this.data.ind}
       this.triggerEvent('tabclick',data,{})
    }
  }
})
