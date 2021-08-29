<template>
  <div>
    <router-view/> 
 <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>  -->



  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-home"></i></div>
      <div>首页</div>
    </router-link>


    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-changyongtubiao-fuben-42"></i></div>
      <div>分类</div>
    </router-link> 
    
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon">
        <!---Badge 徽标--->
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon">
        <i class="iconfont icon-yonghu2"></i></div>
      <div>我的</div>

    </router-link>

  </div>
  </div>
  

</template>

<script>
import {onMounted} from 'vue';
import {useStore} from 'vuex';
export default {
  
  setup(){
    const store= useStore();

    onMounted(()=>{
      store.dispatch('updateCart');
    })
  }
}
</script>


<style lang="scss">
  @import "assets/css/base.css";
  @import "assets/css/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #F6F6F6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100 ,0.1);
  

  a {
    color: var(--color-text);
    
    
    //& 表示嵌套的上一级
    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
        
  }
  .tab-bar-item .icon {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    display: inline-block;
  }
}
</style>
