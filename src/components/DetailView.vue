<template>
    <div>
        <div class = "layout">
            <div class = "box box_img"> img </div>
            <div class = "box box_content">
                <!-- 标题栏 -->
                <div class = "content_xx ">
                    <div class = content_title>
                        <h2>
                            <i>{{bookDetail.title}}</i>
                        </h2>
                        <h4>
                            {{bookDetail.author}}
                        </h4>
                    <h4>
                        {{bookDetail.rate}}
                    </h4>
                    </div>
                </div>

                <!-- 内容栏 -->
                <div class = "content_xx content_intro">
                    {{ bookDetail.intro }}
                </div>

                <!-- 信息栏 -->
                <div class = "content_xx content_isbn">
                    这里是书籍信息栏
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name:"DetailView"
    }
</script>


<script setup lang="ts">
    import { type BookDetail } from '@/base';
    import {ref} from "vue"

    const bookDetail = ref<BookDetail>({
        title:"亲密关系(十周年纪念版)",
        author:"罗兰-米勒, Rowsland S.miller",
        rate:5.0,
        isbn:"xxxxxxxxx",
        intro:"亲密关系与泛泛之交有什么区别；大丈夫与小女子真的般配吗；吸引力的秘密是什么；男人与女人真的是不同的动物吗；同性恋真的是由基因决定的吗；单亲家庭的孩子长大后更容易离婚吗……什么是爱情？由什么构成？能持续多久？两性在发生一夜情及选择终身伴侣上有什么差异？爱情和性欲是由不同的脑区控制吗？亲密关系美满的秘诀是什么？有什么方法能让婚姻持续一生？米勒教授在《亲密关系》中回答了这些问题，尤其澄清了通俗心理学所宣扬的经验之谈，甚至某些错误观点。",
        publishingHouse:"人民邮电出版社",
        publishingTime:"2015-06",
        pages: 540,
    })
</script>

<style scoped>
    .layout{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 30px;
        position: absolute;
        height: 80%;
        width: 80%;
        top: 5%;
        left: 10%;
    }

    .layout .box{
        background-color: aqua;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        
    }

    .layout .box_content{
        background-color:aquamarine;
        grid-column: 2/4;
        display: grid;
        grid-template-rows: repeat(4,1fr);
        gap: 30px;
        width: 100%;
    }

    .box_content .content_xx{
        /* align-items: center;
        justify-content: center; */
        border-radius: 10px;
        height: 100%;
        display: flex;
        left: 10%;
        position: relative;
        width: 80%;

    }

    .box_content .content_title{
        text-align: left;
        justify-items: left;
        width: 100%;
    }

    .box_content .content_intro{
        grid-row: 2/4;
    }

    .box_content .content_isbn{
    }

    
</style>