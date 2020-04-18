import { getMultiData, getGoodsData } from '../../service/home.js'
const types =['pop','new','sell']
const TOP_DISTANCE = 1000;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     banners:[],
     recommends:[],
      goods:{
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell:{page:0,list:[]}
      },
      currentType:'pop',
      backToShow:false,
      isTabFixed:false,
    tabScrollTop:0
  },
  //--------------------------事件监听函数---------------------------------
  //子传过父的tab的index
  tabClick(event){
    //取出index
    const index = event.detail.index;
      this.setData({
        currentType:types[index]
      })
  },
  handimageLoad(){
      console.log('图片加载完成 ')
      wx.createSelectorQuery().select('#tab-comp').boundingClientRect(rect =>{
        console.log(rect)
        this.data.tabScrollTop = rect.top
      }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //请求轮播图和推荐数据
    this._getMultidata()
     //请求商品列表数据 
    this._getGoodsData('pop')
    this._getGoodsData('new')
    this._getGoodsData('sell')

  },
  //---------------------------网络请求函数---------------------------------
  _getMultidata(){
    getMultiData().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },

  _getGoodsData(type){
    //获取页面
      const page = this.data.goods[type].page + 1
      //网络请求
      getGoodsData(type,page).then(res=>{
        console.log(res)
        const list = res.data.data.list
        //将数据设置到对应的type的list中
        const oldList = this.data.goods[type].list;
        //新数据push到原来list中
        oldList.push(...list)
        //将数据设置到data中的goods中
        const typeKey = `goods.${type}.list`;
        const pageKey = `goods.${type}.page`
        this.setData({
         [typeKey] :oldList,
         [pageKey] :page
        })
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this._getGoodsData(this.data.currentType)
  },
  //监听页面滚动显示回到顶部按钮
  onPageScroll(options){
    //取出scrollTop
    let scrollTop = options.scrollTop;
    //修改backToShow属性
    //官方不要再滚动的函数回调中频繁的调用this.setData,用一个flag用来记录布尔值，
    const flag = scrollTop >= TOP_DISTANCE
    if(flag != this.data.backToShow){
      this.setData({
        backToShow: scrollTop >= TOP_DISTANCE
      })
    }
    //修改isisTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})