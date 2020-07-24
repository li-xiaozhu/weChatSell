import Vue from 'vue'
import Router from 'vue-router'
import {Path} from './path'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Forget from '../components/forget.vue'
import Home from '../components/home/home.vue'
import Equipment from '../components/equipment/equipment'
import Add from '../components/equipment/add.vue'
import ChooseHome from '../components/equipment/scene/chooseHome.vue'
import ChooseRoom from '../components/equipment/scene/chooseRoom.vue'
import SceneMange from '../components/equipment/scene/sceneMange'
import RoomMange from '../components/equipment/scene/roomMange'
import Detail from '../components/equipment/detail/detail.vue'
import Repair from '../components/repair/repair.vue'
import RepairWx from '../components/repairWx/repair.vue'
import Timer from '../components/equipment/timer/timer.vue'
import AddTimer from '../components/equipment/timer/addTimer'
import Info from '../components/equipment/info/info.vue'
import Status from '../components/equipment/status/status.vue'
import Fault from '../components/fault/fault.vue'
import Personal from '../components/personal/personal.vue'
import Service from '../components/service/service.vue'
import ServiceDetail from '../components/service/serviceDetail.vue'
import Self from '../components/personal/self.vue'
import ResetPhone from '../components/personal/resetPhone.vue'
import AboutUs from '../components/about/about'
import FreshAirDetail from '../components/freshAir/detail/index'
import FreshAirStatus from '../components/freshAir/status/index'
import FreshAirParams from '../components/freshAir/params/index'
import FreshAirStatus1 from '../components/freshAir/status/index'
import FreshAirStatus2 from '../components/freshAir/status/status2'
import FreshAirStatus3 from '../components/freshAir/status/status3'
import FreshAirStatus4 from '../components/freshAir/status/status4'

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: Path.Home,
            redirect: '/equipment'
        },
        {
            path: Path.Register,
            name: 'Register',
            component: Register,
            meta: {
                isLogin: false,
                title: '注册',
                keepAlive: false
            }
        },
        {
            path: Path.Forget,
            name: 'Forget',
            component: Forget,
            meta: {
                isLogin: false,
                title: '忘记密码',
                keepAlive: false
            }
        },
        {
            path: Path.Login,
            name: 'Login',
            component: Login,
            meta: {
                isLogin: false,
                title: '登录',
                keepAlive: false
            }
        },
        {
            path: Path.Equipment,
            name: 'Equipment',
            component: Equipment,
            meta: {
                isLogin: true,
                keepAlive: true
            }
        },
        {
            path: Path.AddEq,
            name: 'Add',
            component: Add,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.SceneMange,
            name: 'SceneMange',
            component: SceneMange,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.RoomMange,
            name: 'RoomMange',
            component: RoomMange,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.ChooseHome,
            name: 'ChooseHome',
            component: ChooseHome,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.ChooseRoom,
            name: 'ChooseRoom',
            component: ChooseRoom,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Info,
            name: 'Info',
            component: Info,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Status,
            name: 'Status',
            component: Status,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Detail,
            name: 'Detail',
            component: Detail,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Timer,
            name: 'Timer',
            component: Timer,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.AddTimer,
            name: 'AddTimer',
            component: AddTimer,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Repair,
            name: 'Repair',
            component: Repair,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.RepairWx,
            name: 'RepairWx',
            component: RepairWx,
            meta: {
                isLogin: false,
                keepAlive: false
            }
        },
        {
            path: Path.Fault,
            name: 'Fault',
            component: Fault,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Personal,
            name: 'Personal',
            component: Personal,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.Self,
            name: 'Self',
            component: Self,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.ResetPhone,
            name: 'ResetPhone',
            component: ResetPhone,
            meta: {
                isLogin: true,
                title: '修改手机',
                keepAlive: false
            }
        },
        {
            path: Path.Service,
            name: 'Service',
            component: Service,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.ServiceDetail,
            name: 'ServiceDetail',
            component: ServiceDetail,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        {
            path: Path.AboutUs,
            name: 'AboutUs',
            component: AboutUs,
            meta: {
                isLogin: true,
                title: '关于我们',
                keepAlive: false
            }
        },
        {
            path: Path.FreshAirDetail,
            name: 'FreshAirDetail',
            component: FreshAirDetail,
            meta: {
                isLogin: true,
                keepAlive: false
            }
        },
        // {
        //     path: Path.FreshAirStatus,
        //     name: 'FreshAirStatus',
        //     component: FreshAirStatus,
        //     meta: {
        //         isLogin: true,
        //         title: '系统状态'
        //     }
        // },
        {
            path: Path.FreshAirParams,
            name: 'FreshAirParams',
            component: FreshAirParams,
            meta: {
                isLogin: true,
                title: '用户参数',
                keepAlive: false
            }
        }, {
            path: Path.FreshStatus1,
            name: 'FreshAiStatus1',
            component: FreshAirStatus1,
            meta: {
                isLogin: true,
                title: '用户参数',
                keepAlive: false
            }
        }, {
            path: Path.FreshStatus2,
            name: 'FreshAirStatus2',
            component: FreshAirStatus2,
            meta: {
                isLogin: true,
                title: '用户参数',
                keepAlive: false
            }
        }, {
            path: Path.FreshStatus3,
            name: 'FreshAirStatus3',
            component: FreshAirStatus3,
            meta: {
                isLogin: true,
                title: '用户参数',
                keepAlive: false
            }
        }, {
            path: Path.FreshStatus4,
            name: 'FreshAirStatus4',
            component: FreshAirStatus4,
            meta: {
                isLogin: true,
                title: '用户参数',
                keepAlive: false
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
