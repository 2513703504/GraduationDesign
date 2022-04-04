import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Main from '@/views/Main.vue'
import CompanyTable from '@/components/table/CompanyTable.vue'
import CompanyMap from '@/components/map/CompanyMap.vue'
import FactorysMap from '@/components/map/FactorysMap.vue'
import SanitationParkMap from '@/components/map/SanitationParkMap.vue'
import PublicLavatoryMap from '@/components/map/PublicLavatoryMap.vue'
import RubbishTransferStationMap from '@/components/map/RubbishTransferStationMap.vue'
import RtsTable from '@/components/table/RtsTable.vue'
import PlTable from '@/components/table/PlTable.vue'
import ParkTable from '@/components/table/ParkTable.vue'
import WorkerTable from '@/components/table/WorkerTable.vue'
import CarTable from '@/components/table/CarTable.vue'
import StreetTable from '@/components/table/StreetTable.vue'
import StpFactory from '@/components/factory/StpFactory.vue'
import DwiFactory from '@/components/factory/DwiFactory.vue'
import LandfillFactory from '@/components/factory/LandfillFactory.vue'
import WtpFactory from '@/components/factory/WtpFactory.vue'
import PlDetail from '@/components/detail/PlDetail.vue'
import PlInsert from '@/components/insert/PlInsert.vue'
import RtsDetail from '@/components/detail/RtsDetail.vue'
import RtsInsert from '@/components/insert/RtsInsert.vue'
import ParkInsert from '@/components/insert/ParkInsert.vue'
import CompanyInsert from '@/components/insert/CompanyInsert.vue'
import CompanyUpdate from '@/components/update/CompanyUpdate.vue'
import StreetDetail from '@/components/detail/StreetDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: 'login' },
    { path: '/login', component: Login },
    {
      path: '/main',
      component: Main,
      redirect:'/main/company',
      children: [
        { path: 'caompanyMap', component: CompanyMap },
        { path: 'factorysMap', component: FactorysMap },
        { path: 'sanitationParkMap', component: SanitationParkMap },
        { path: 'publicLavatoryMap', component: PublicLavatoryMap },
        { path: 'rubbishTransferStationMap', component: RubbishTransferStationMap },
        { path: 'company', component: CompanyTable },
        { path: 'rts', component: RtsTable},
        { path: 'pl', component: PlTable},
        { path: 'park', component: ParkTable},
        { path: 'worker', component: WorkerTable},
        { path: 'car', component: CarTable},
        { path: 'street', component: StreetTable},
        { path: 'stpFactory/:stpid', component: StpFactory, props:true},
        { path: 'dwiFactory/:dwiid', component: DwiFactory, props:true},
        { path: 'landfillFactory/:landfillid', component: LandfillFactory, props:true},
        { path: 'wtpFactory/:wtpid', component: WtpFactory, props:true},
        { path: 'plDetail/:plid', component : PlDetail},
        { path: 'plInsert', component : PlInsert},
        { path: 'rtsDetail/:rtsid', component : RtsDetail},
        { path: 'rtsInsert', component : RtsInsert},
        { path: 'parkInsert', component : ParkInsert},
        { path: 'companyInsert', component : CompanyInsert},
        { path: 'companyUpdate', component : CompanyUpdate},
        { path: 'streetDetail', component : StreetDetail},
      ]
    }
  ]
})

//导航守卫
// router.beforeEach((to,from,next)=>{
//     if(to.path=='/login'){
//       next()
//     }else{
//       const token=window.sessionStorage.getItem("token")
//       if(!token){
//           next('/login')
//       }else{
//         next()
//       }
//     }
// })
export default router
