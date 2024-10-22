import { createRouter,createWebHistory } from 'vue-router'
import HomeView from "@/components/HomeView.vue"
import DetailView from "@/components/DetailView.vue"
import LoginView from '@/components/LoginView.vue'


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/home",
            component: HomeView
        },
        {
            path:"/detail",
            component: DetailView
        },
        {
            path:"/",
            component: HomeView
        },
        {
            path:"/login",
            component: LoginView
        },
    ]
})

export default router