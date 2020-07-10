let Path = {
    Home: '/',
    Register: '/register',
    Forget: '/forget',
    Login: '/login',
    Equipment: '/Equipment',
    AddEq: '/equipment/add',
    SceneMange: '/equipment/scene',
    RoomMange: '/equipment/room/:id',
    ChooseHome: '/equipment/choosescene/:type',
    ChooseRoom: '/equipment/chooseroom/:type/:sceneId',
    Info: '/equipment/info/:id',
    Status: '/equipment/status/:id',
    Detail: '/equipment/detail/:id',
    Timer: '/equipment/timer/:id',
    AddTimer: '/equipment/timer/add/:id/:type',
    Repair: '/repair',
    RepairWx: '/repair_wx',
    Fault: '/fault/:id',
    Personal: '/personal',
    Self: '/personal/self',
    ResetPhone: '/personal/phone',
    Service: '/service',
    ServiceDetail: '/service/detail/:id',
    AboutUs: '/about',
    FreshAirDetail: '/fresh/detail/:id',
    FreshAirStatus: '/fresh/status/:id',
    FreshAirParams: '/fresh/params/:id'
};

let PATH = {
    getHome() {
        return '/'
    },
    getRegister() {
        return '/register'
    },
    getScene() {
        return '/equipment/scene/'
    },
    getChooseHome() {
        return '/equipment/choosescene/'
    },
    getChooseRoom() {
        return '/equipment/chooseroom/'
    },
    getRoomMange() {
        return '/equipment/room/'
    },
    goDetail() {
        return '/equipment/detail/'
    },
    goFreshDetail() {
        return '/fresh/detail/'
    }
};

export {Path, PATH}

