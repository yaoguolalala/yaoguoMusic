import Vue from 'vue'
import Router from 'vue-router'
/*
import Rank from '../components/rank/rank'
import Singer from '../components/singer/singer'
import Recommend from '../components/recommend/recommend'
import Search from '../components/search/search'
import SingerDetail from '../components/singer-detail/singer-detail.vue'
import Disc from '../components/disc/disc.vue'
import TopList from '../components/top-list/top-list'
import UserCenter from '../components/user-center/user-center'
import { resolve } from 'dns';
*/

Vue.use(Router)

const Recommend = (resolve) => {
    import('../components/recommend/recommend').then((moudle) => {
        resolve(moudle)
    })
}

const Singer = (resolve) => {
    import('../components/singer/singer').then((moudle) => {
        resolve(moudle)
    })
}

const Rank = (resolve) => {
    import('../components/rank/rank').then((moudle) => {
        resolve(moudle)
    })
}

const Search = (resolve) => {
    import('../components/search/search').then((moudle) => {
        resolve(moudle)
    })
}

const SingerDetail = (resolve) => {
    import('../components/singer-detail/singer-detail').then((moudle) => {
        resolve(moudle)
    })
}

const Disc = (resolve) => {
    import('../components/disc/disc').then((moudle) => {
        resolve(moudle)
    })
}

const TopList = (resolve) => {
    import('../components/top-list/top-list').then((moudle) => {
        resolve(moudle)
    })
}

const UserCenter = (resolve) => {
    import('../components/user-center/user-center').then((moudle) => {
        resolve(moudle)
    })
}


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
