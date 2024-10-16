import { createRouter,createWebHistory } from 'vue-router'
import HomeView from "@/components/HomeView.vue"
import DetailView from "@/components/DetailView.vue"


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
    ]
})

export default router