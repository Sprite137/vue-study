<template>
    <div class="user-info-container">
      <div class="avatar">
        <img :src="getImageUrl(userInfo.avatarUrl)" :alt="userInfo.userName" />
      </div>
      <div class="details">
        <h2>{{ userInfo.userName }}</h2>
        <p>Email: {{ userInfo.email }}</p>
        <div class="stats">
          <div class="stat">
            <span>{{ userInfo.postsCount }}</span>
            <span>Posts</span>
          </div>
          <div class="stat">
            <span>{{ userInfo.followersCount }}</span>
            <span>Followers</span>
          </div>
          <div class="stat">
            <span>{{ userInfo.followingCount }}</span>
            <span>Following</span>
          </div>
        </div>
      </div>
    </div>

    <br>
    <div >
        <ContribtuionChart :dataSources="mockData" show-footer class = "contribtuion-chart"/>
    </div>
    
    <br>
    <div class="processBox">
    <div class="title" >~~~~~~Life Flow~~~~~~</div>
    <div class="timelineProcessBox">
      <el-timeline class="timeline">
        <el-timeline-item
          class="lineitem"
          :class="activity.done ? 'active' : 'inactive'"
          v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.time"
        >
          <span style="display: flex; flex-direction: column">
            <span style="margin: 10px 0; font-size: 16px">
              {{ activity.content }}
            </span>
            <span style="color: #8c8c8c; font-size: 14px">
              {{ activity.people }}
            </span>
          </span>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
  </template>

<script setup lang="ts">
    import {onMounted, ref} from "vue"
    import { type UserInfo } from "@/base";
    import {getImageUrl} from "@/utils/getStaticAssets"
    import { getUserInfo } from "@/api/user";
    import router from "@/router";
    import { generateChartData, type DateItem } from "@/utils/Calender";
    import ContribtuionChart from "@/components/ContributionCalendar.vue";

    const mockData = generateChartData("2021-01-01", "2025-12-31")
    .dates.flat()
    .reduce<Record<string, DateItem & { level?: number }>>((prev, item) => {
        return { ...prev, [item.full]: { ...item, level: Math.round(Math.random() * 3) } };
    }, {});


    const userInfo = ref<UserInfo>({
      userName: 'xxx',
      email: '',
      joinDate: '',
      avatarUrl: '../assets/imgs/1.jpg',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0
    });

    const activities = [
    {
        content: 'Step1',
        time: '2018-04-12 20:46',
        people: '五六七',
        done: true,
    },
    {
        content: 'Step2',
        people: 'xxx',
        done: false,
        time: '2018-04-03 20:46',
    },
    {
        content: 'Step3',
        done: false,
        people: 'xxxzz',
        time: '2018-04-03 20:46',
    },
    {
        content: 'Step4',
        people: '',
        done: false,
        time: '',
    },
    {
        content: 'Step5',
        people: '',
        done: false,
        time: '',
    },
    {
        content: 'Step6',
        people: '',
        done: false,
        time: '',
    },
    ]


    async function UserDetail(){
        try{
            const response = await getUserInfo({userName:"sprite"});
            userInfo.value = convertUserInfo(response.data);
        }
        catch(error){
            router.push("/login")
            console.error('Failed to fetch data:', error);
        }
        
    }

    function convertUserInfo(userInfo: UserInfo){
        return userInfo;
    }

    onMounted(() =>{
        UserDetail();
    })

</script>


<style scoped>
    .user-info-container {
        display: flex;
        align-items: center;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        margin: 0 auto;
    }

    .contribtuion-chart{
        position: relative;
        margin: auto;
        top:100%;
    }

    .avatar {
        margin-right: 20px;
    }

    .avatar img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
    }

    .details {
        flex: 1;
        text-align: left;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .stat {
        text-align: center;
    }

    .stat span:first-child {
        font-size: 1.2em;
        font-weight: bold;
    }

    .processBox {
        background-color: #fff;
        height: 210px;
        
    .title {
        font-size: 16px;
        font-weight: 600;
        padding-left: 32px;
        padding-top: 16px;
        text-align: center;
        color: #000;
        
    }
    .timelineProcessBox {
        .timeline {
            display: flex;
            width: 95%;
            margin: 40px auto;
            .lineitem {
                transform: translateX(50%);
                width: 25%;
            }
        }
    }
        
        :deep(.el-timeline-item__tail) {
            border-left: none;
            border-top: 2px solid #e4e7ed;
            width: 100%;
            position: absolute;
            top: 6px;
        }
        :deep(.el-timeline-item__wrapper) {
            padding-left: 0;
            position: absolute;
            top: 20px;
            transform: translateX(-50%);
            text-align: center;
        }
        :deep(.el-timeline-item__timestamp) {
            font-size: 14px;
        }
    .active {
        :deep(.el-timeline-item__node) {
            background-color:bisque;
        }
        :deep(.el-timeline-item__tail) {
            border-color: #fff;
        }
    }
    .active + li {
        :deep(.el-timeline-item__node) {
            background-color:aquamarine;
        }
    }
}
</style>