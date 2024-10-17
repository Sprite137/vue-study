<template>
  <div>
    <div class="bg-image"></div>
    <!-- 走马灯 -->
    <!-- <div class="carousel">
      <el-carousel height="150px">
        <el-carousel-item v-for="item in items" :key="item.id">
        <img :src="item.src">
        </el-carousel-item>
      </el-carousel>
    </div> -->

    <div class="github-link">
      <a href = "https://github.com/Sprite137" target="_blank">
        <el-icon :size="20"><Bicycle/></el-icon>
      </a>
    </div>
    
    
    
    <!-- 搜索栏 -->
    <div class="search">
      <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="Please input"
        @select="handleSelect"
    />
    </div>
  </div>
  
</template>

<script lang="ts">
  export default {
      name:"HomeView",

  }
  </script>

<script lang="ts" setup>
  import {onMounted, ref} from 'vue'
  import {type BookItem, type BakckendBookItem, type BookItems} from '../base'
  import router from '@/router'
  import {hotBooks} from "@/api/book"



  // 走马灯图片
  // const items =  [
  //     { id:1,src: getImageUrl("1") },
  //     { id:2,src: getImageUrl("2") },
  //     { id:3,src: getImageUrl("3") },
  // ]

  // function getImageUrl(name:string) {
  //   return new URL(`/src/assets/imgs/${name}.jpg`, import.meta.url).href
  // } 

  

  const state = ref('')


  const searchTips = ref<BookItems>([])

  const loadAll = () => (
    [
      { value: 'vue', author: 'https://github.com/vuejs/vue' },
      { value: 'element', author: 'https://github.com/ElemeFE/element' },
      { value: 'cooking', author: 'https://github.com/ElemeFE/cooking' },
      { value: 'mint-ui', author: 'https://github.com/ElemeFE/mint-ui' },
      { value: 'vuex', author: 'https://github.com/vuejs/vuex' },
      { value: 'vue-router', author: 'https://github.com/vuejs/vue-router' },
      { value: 'babel', author: 'https://github.com/babel/babel' },
    ])


  let timeout: ReturnType<typeof setTimeout>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString
      ? searchTips.value.filter(createFilter(queryString))
      : searchTips.value

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(results)
    }, 300 * Math.random())
  }

  const createFilter = (queryString: string) => {
    return (restaurant: BookItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (item: Record<string, any>) => {
    console.log(item)
    router.push("/detail")
  }

  async function fetchDataAndConvert() {
    try {
      const response = await hotBooks({})
      searchTips.value = convertBooksToData(response);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  onMounted(() => {
    searchTips.value = loadAll()
    fetchDataAndConvert()
    console.log(searchTips)
  })



  

  function convertBooksToData(books: BakckendBookItem[]): BookItems {
    return books.map(book => ({
      value: book.title,
      author: book.author
    }));
  }

        
    
</script>

<style>

  

  body, html {
    margin: 0;
    padding: 0;
  }

  .carousel {
    position: relative; 
  }

  .app{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;

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

  .bg-image {
    background-image: url('@/assets/imgs/1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* 确保背景图片在其他元素之下 */
  }

  .github-link{
    position: absolute; /* 或者使用 absolute, fixed 等 */
    right: 1%;
    width: 100px; /* 设置宽度 */
    height: 100px; /* 设置高度 */
  }

  .github-link .el-icon {
    position: absolute;
    top: 20%;
    left: 20%;
    transform: translate(-50%, -50%); /* 进一步微调位置 */
  }



</style>