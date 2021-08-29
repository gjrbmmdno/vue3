<template>
  <div class="home">
    {{banner}}
    
  </div>
</template>

<script>

import {onMounted} from 'vue';
import {getHomeAllData, getBanner} from 'network/home';
import {ref} from 'vue'

export default {
  name: 'Home',

  setup(){
      const banner = ref([]);

      onMounted(() => {

        getHomeAllData().then(res=>{
          
          banner.value = res.slides;


        }).catch(err=>{

        })
      })

      return {
        banner
      }
  },

  components: {
    
  }
}
</script>

<style>
  #demo {
    background: url('~assets/images/11.png') np-repeat;
    width: 100px;
    height: 100px;
  }
  .demo1 {
    color: var(--color-high-text);
  }
</style>