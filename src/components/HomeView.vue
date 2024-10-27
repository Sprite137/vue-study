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

    <div class = "icon-container">
        <a href = "https://github.com/Sprite137" target="_blank">
          <el-icon><CoffeeCup /></el-icon>
        </a>

        <div @click="handleLoginIconClick">
          <el-icon><UserFilled /></el-icon>
        </div>

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


    <!-- 内容栏 -->
    <div class = 'content'>
      <div v-for="(item, index) in books_detail" :key="index" class="div-block">
        <div class="content-book">
          <span class = 'book-img'>
            <img :src="getImageUrl(item.imgSrc)" alt ="暂未存在图片" class= "content-1-img">
          </span>
          <span class = "book-title">
            <h6  >{{ item.title }}</h6>
            <br>
            <h6> <i>{{ item.author }} / {{item.publishingHouse}} / {{ item.publishingTime }}</i> </h6>
            <br>
          </span>
          <span class = "book-rate">
              <el-rate 
                v-model=item.rate
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              />
          </span>
        </div>
      </div>
    
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
  import {type HomeIndexBooksList, type BakckendBookItem, type BookItems, type BookItem} from '../base'
  import router from '@/router'
  import {hotBooks, homeBooks} from "@/api/book"
  import {getImageUrl} from "@/utils/getImgUrl"


  const state = ref('')

  const books_detail = ref<HomeIndexBooksList>([
    {author:"aaa",title : "深入理解java虚拟机(原书第三版)",rate:4.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机",rate:4.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机",rate:3.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机",rate:2.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机(原书第三版)",rate:4.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机",rate:4.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机",rate:1.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    {author:"aaa",title : "深入理解java虚拟机(原书第三版)",rate:4.7,publishingHouse:"人民邮电出版社",publishingTime:"2016年9月",imgSrc : "@/assets/imgs/2.jpg"},
    ])


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
      searchTips.value = convertBooksToData(response.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  async function featchHomeBooks() {
    try{
      const response = await homeBooks({})
      books_detail.value = convertHomeBooks(response.data);
      console.log("book",books_detail)
    }
    catch( error){
      console.error('Failed to fetch data:', error);
    }
  }

  onMounted(() => {
    searchTips.value = loadAll()
    fetchDataAndConvert()
    featchHomeBooks()
  })

  async function handleLoginIconClick(){
      router.push('/user')
    
  }


  function convertBooksToData(books: BakckendBookItem[]): BookItems {
    return books.map(book => ({
      value: book.title,
      author: book.author
    }));
  }

  function convertHomeBooks(homeBooks: HomeIndexBooksList): HomeIndexBooksList {
    return homeBooks.map(homeBook => ({
      title: homeBook.title,
      author: homeBook.author,
      rate:homeBook.rate,
      imgSrc:homeBook.imgSrc,
      publishingHouse:homeBook.publishingHouse,
      publishingTime:homeBook.publishingTime
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
    top:15%;
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
    filter: blur(3px);
    z-index: -1; /* 确保背景图片在其他元素之下 */
  }

  .icon-container {
    display: flex; /* 使用 Flexbox 布局 */
    justify-content: center; /* 水平居中对齐 */
    gap: 10px; /* 图标之间的间距 */
    align-items: center; /* 垂直居中对齐 */
    position: absolute;
    top: 1%;
    left: 95%;
  }

  .icon-container .el-icon {
    font-size: 20px;
    cursor: pointer;
  }

  .content{
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    position: absolute;
    top: 30%;
    left: 10%;
    right: 10%;
    height: 60%;
    border-radius: 25px;
    grid-column-start: 10;
    grid-column-end: 90%;
    row-gap: 10px;
    column-gap: 50px;
    justify-content: center;
  }

  .content-book{
    position: relative;
    top:5%;
    height: 90%;
    left: 3%;
    width: 94%;
    background-color:whitesmoke;
    border-radius: 10px;
  }

  .book-img{
    position:absolute;
    left:1%;
    width: 85%;
    top: 1%;
    height:98%;
    border-radius: 10px;
  }


  .content-1-img{
    position: absolute;
    width: 60%;
    left: 1%;
    top: 2%;
    height: 96%;
    border-radius: 10px;
  }

  .book-title{
    position: absolute;
    top: 5%;
    left: 57%;
    width: 37%;
  }

  .book-rate {
    position: absolute;
    left: 57%;
    top: 75%;
  }

  .el-rate {
    position: absolute;
    left: 0%;
    right: 5%;
    .el-rate__icon {
      font-size: 10px; 
    }
  }




</style>