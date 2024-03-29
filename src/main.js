import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'


import {Form, Field, Tag, Button, Image as VanImage, Tab, Tabs,Swipe, SwipeItem , 
  Lazyload ,Badge,Sidebar, SidebarItem,Collapse, CollapseItem, Card,
  Checkbox, CheckboxGroup,SwipeCell,Stepper,SubmitBar,Icon,
  PullRefresh,List,Popup,Grid,GridItem,AddressEdit,AddressList} from 'vant';


createApp(App)
  .use(Swipe).use(SwipeItem).use(Lazyload,{
    loading:require('./assets/images/default.png')
  }).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
  .use(Tab).use(Tabs).use(Card).use(VanImage).use(Tag).use(Button).use(Form).use(Field)
  .use(Checkbox).use(CheckboxGroup).use(SwipeCell).use(Stepper).use(SubmitBar).use(Icon).use(AddressList).use(AddressEdit)
  .use(GridItem).use(Grid).use(Popup).use(List).use(PullRefresh)
  .use(store).use(router).mount('#app')
