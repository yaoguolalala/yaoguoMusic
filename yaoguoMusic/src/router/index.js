import Vue from 'vue'
import Router from 'vue-router'
import Rank from '../components/rank/rank'
import Singer from '../components/singer/singer'
import Recommend from '../components/recommend/recommend'
import Search from '../components/search/search'
import SingerDetail from '../components/singer-detail/singer-detail.vue'
import Disc from '../components/disc/disc.vue'
import TopList from '../components/top-list/top-list'
import UserCenter from '../components/user-center/user-center'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/rank',
            component: Rank,
            children:[{
                path:":id",
                component:TopList
            }]
        },
        {
            path:'/singer',
            component: Singer,
            children: [{
                path: ':id',
                component:SingerDetail
            }]
        },
        {
            path:'/recommend',
            component: Recommend,
            children:[
                {
                    path: ':id',
                    component: Disc
                }
            ]
        },
        {
            path:'/search',
            component: Search,
            children: [{
                path: ':id',
                component:SingerDetail
            }]
        },
        {
            path:'/',
            redirect: '/recommend'
        },
        {
            path:'/user',
            component:UserCenter
        }    
    ]
})
