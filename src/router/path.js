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
    // FreshAirStatus: '/fresh/status/:id',
    FreshAirParams: '/fresh/params/:id',
    FreshStatus1: '/fresh/status1/:id',
    FreshStatus2: '/fresh/status2/:id',
    FreshStatus3: '/fresh/status3/:id',
    FreshStatus4: '/fresh/status4/:id',
    FreshStatus5: '/fresh/status5/:id',
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
    },
    goFreshStatus1() {
        return '/fresh/status1/'
    },
    goFreshStatus2() {
        return '/fresh/status2/'
    },
    goFreshStatus3() {
        return '/fresh/status3/'
    },
    goFreshStatus4() {
        return '/fresh/status4/'
    },
    goFreshStatus5() {
        return '/fresh/status5/'
    }
};

export {Path, PATH}

