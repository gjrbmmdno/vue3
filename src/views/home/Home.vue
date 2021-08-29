<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    
    <tab-control v-show="isTabFixed" @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>



    <div class="wrapper">

      <div class="content">
        <div ref="banref"> <!---绑定该dom为banref--->
          <home-swiper  :banners="banners"></home-swiper>
          
          <!---用属性赋值的方法吧Home模块中接收到的数据传给组件recommends--->
          <recommend-view :recommends="recommends"> </recommend-view>     
        </div>

        <tab-control @tabClick="tabClick" :titles="['畅销','新书','精选']"></tab-control>

        <goods-list :goods="showGoods"></goods-list>
      </div>
    </div>
    

    <back-top @bTop="bTop" v-show="isShowBackTop"></back-top>

  </div>
</template>


<script>
  import HomeSwiper from './ChildComps/HomeSwiper.vue';
  import NavBar from 'components/common/navbar/NavBar';
  import RecommendView from './ChildComps/RecommendView';
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import BackTop from 'components/common/backtop/BackTop';

  import {getHomeAllData, getHomeGoods} from 'network/home';
  import {ref, reactive, onMounted, computed, watchEffect, nextTick} from 'vue';
  import BScroll from 'better-scroll';




  export default {
    name: "Home",

    setup(){
      
      let isTabFixed = ref(false);
      let banref = ref(null);
      let isShowBackTop =ref(false);

      const recommends = ref([]);

      //商品列表数据模型
      const goods = reactive({
        sales:{
          page:0,
          list:[],
        },
        new:{
          page:0,
          list:[],
        },
        recommend: {
          page:0,
          list:[]
        }
      });

      let currentType = ref('sales');
      
      const showGoods = computed(() => {
        return goods[currentType.value].list
      })

      let bscroll = reactive({});
      let banners = ref([]);

      onMounted(() => {
        getHomeAllData().then(res=>{
          recommends.value = res.goods.data;
          banners.value = res.slides;

        })
        
        getHomeGoods('sales').then(res=>{
          goods.sales.list = res.goods.data;
        })

        getHomeGoods('recommend').then(res=>{
          goods.recommend.list = res.goods.data;
        })

        getHomeGoods('new').then(res=>{
          goods.new.list = res.goods.data;
        })
        
        //创建betterScroll对象
        bscroll = new BScroll(document.querySelector('.wrapper'),{
          probeType:3, //0,1,2,3 只要在滚动就触发scroll事件
          click:true, //是否允许点击
          pullUpLoad:true //上拉加载更多，默认是false
        });

        

        //触发滚动事件
        bscroll.on("scroll", (position)=>{

          isShowBackTop.value = isTabFixed.value = (-position.y) > banref.value.offsetHeight;

        })

        //上拉加载数据，触发pullingUp
        bscroll.on("pullingUp", () => {
          console.log("上拉加载更多");
          // document.querySelector('.content').clientHeight
          const page = goods[currentType.value].page + 1;
          
          getHomeGoods(currentType.value, page).then(res=>{
            goods[currentType.value].list.push(...res.goods.data);
            goods[currentType.value].page += 1;
          })

          //完成上拉，等数据请求完成。要将新数据展示出来
          bscroll.finishPullUp();


          bscroll.refresh();
        })
        
     
      })

      const tabClick = (index) => {
        let types = ['sales','new','recommend'];
        currentType.value = types[index];
        nextTick(()=>{
            // 重新计算高度
            bscroll &&  bscroll.refresh();
        })
      }

      //监听任何一个变量有变化
      watchEffect(()=>{
        nextTick(()=>{
          //重新计算高度
          bscroll && bscroll.refresh();
        })
      })

      const bTop = () => {
        bscroll.scrollTo(0,0,500); //0,0为坐标, 500为缓冲时间
      }

      return {
        recommends,
        tabClick,
        goods,
        showGoods,
        isTabFixed,
        banref,
        isShowBackTop,
        bTop,
        banners
      }
    },

    components: {
      HomeSwiper,
      NavBar,
      RecommendView,
      TabControl,
      GoodsList,
      BackTop

    },
    
  }
</script>
        


<style scoped>
  .banners img {
    width: 100%;
    height: auto;
  }
  #home {
    height: 100vh;
    position: relative;
  }
  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
  .content{
        
  }
</style>