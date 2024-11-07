/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="carousel">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in items" :key="item.id">
       <img :src="item.src">
      </el-carousel-item>
    </el-carousel>
  </div>

  

  <div class="search">
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please input"
      @select="handleSelect"
  />
  </div>

  <h1>{{ testAxios }}</h1>

  <!-- <div>
    <RouterLink to="/home">测试跳转HomeView</RouterLink>
    <RouterLink to="/detail">测试跳转DetailView</RouterLink>
  </div>

  <div>
    <button @click="changeHomeView">按钮跳转home</button>
    <button @click="changeDetailView">按钮跳转detail</button>
  </div> -->
    
</template>

<script lang="ts">
  export default {
      name:"PersonView",

  }
  </script>

<script lang="ts" setup>
  import { onBeforeMount ,onMounted, ref,reactive } from 'vue'
  import axios from 'axios';
  import {type Books} from '../base'
  import {login,getUserInfo} from "../api/user"

  onBeforeMount(async () => {
  // 登录
  const user = await login({
    username: 'admin',
    password: '123456789'
  })
  console.log(user)
  
  // 获取用户信息
  const users = await getUserInfo({})
  console.log(users)
})


  const items =  [
      { id:1,src: getImageUrl("1") },
      { id:2,src: getImageUrl("2") },
      { id:3,src: getImageUrl("3") },
  ]


  function getImageUrl(name:string) {
    return new URL(`/src/assets/imgs/${name}.jpg`, import.meta.url).href
  } 

  

  const state = ref('')

  interface LinkItem {
    value: string
    link: string
  }

  const links = ref<LinkItem[]>([])

  const loadAll = () => (
    [
      { value: 'vue', link: 'https://github.com/vuejs/vue' },
      { value: 'element', link: 'https://github.com/ElemeFE/element' },
      { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
      { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
      { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
      { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
      { value: 'babel', link: 'https://github.com/babel/babel' },
    ])

    let testAxios = reactive<Books>([
      {id:1, title:"aaa", author :"aaa"},
      {id:2, title:"bbb", author :"bbb"},
    ])
  
                      


  const fetchData = async () => {
    try {
      axios.get('http://localhost:8089/book/test').then(
        response =>{
          testAxios = response.data
          console.log(response.data)
        }
      );
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  onMounted(fetchData);

  let timeout: ReturnType<typeof setTimeout>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(results)
    }, 3000 * Math.random())
  }
  const createFilter = (queryString: string) => {
    return (restaurant: LinkItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (item: Record<string, any>) => {
    console.log(item)
  }

  onMounted(() => {
    links.value = loadAll()
  })        
    
</script>

<style>

  body, html {
    margin: 0;
    padding: 0;
  }

  .carousel {
    position: relative; 
  }

  .carousel{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
  }

  .search{
    position: absolute;
    top:40%;
    left: 20%;
    right: 20%;
  
  }


  .small.justify-center {
    text-align: center; 
  }


  .el-carousel__item h3 {
    
      color: #475669;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
      text-align: center;
  }

    

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }
  
  .my-autocomplete li .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete li .addr {
    font-size: 12px;
    color: #b4b4b4;
  }
  .my-autocomplete li .highlighted .addr {
    color: #ddd;
  }


</style>