<template>
  <div>
    <nav-bar>
      <template v-slot:default>登录</template>
    </nav-bar> 
  
    <div style="margin-top:30px">
      <div style="text-align:center;padding-top:50px">
        <van-image
          width="10rem"
          height="5rem"
          fit="contain"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />

      </div>
    </div>

    <van-form @submit="onSubmit">
      <van-field
        v-model="email"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
     

      <div style="margin: 16px;">
        <div class="link-login" @click="$router.push({path:'./register'})">
          没有账号，立即注册          
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar";
  import {login} from 'network/user';
  import {Notify,Toast} from 'vant';
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex';

  import {ref,reactive, toRefs} from 'vue';
  
  export default {
    name: "Login",
    components:{
     NavBar,
     
    },
    setup(){
      const router = useRouter();
      const storage = useStore();
      const userinfo = reactive({
        email:'',
        password:'',
      });
      
    const onSubmit = ()=>{
      login(userinfo).then(res=>{
        //将token保存在本地window.localStorage setItem(key,value) getItem(key)
        window.localStorage.setItem('token',res.access_token);
        //在vuex isLogin
        storage.commit("setIsLogin",true);
          

        Toast.success('登陆成功');
        userinfo.email = '';
        userinfo.password = '';
        setTimeout(() => {
          router.go(-1);
        }, 500);
      })
    }

    return {
      ...toRefs(userinfo),
      onSubmit,

    }
   
  }

   

  }
</script>

<style scoped lang="scss">

.link-login {
  font-size: 14px;
  margin-bottom: 20px;
  color:#42b983;
}
</style>
