import {getCart} from 'network/cart';

//得到购物车的
const actions ={
  updateCart({commit}){
    getCart().then(res=>{
      commit('addCart',{count:res.data.length || 0})
    })
  }
}

export default actions;