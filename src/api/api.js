import Vue from 'vue'
import $ from 'jquery'
import {Toast, Indicator} from 'mint-ui';
import router from '../router'

let BASE_URL = process.env.BASE_URL;

function post(url, data, success, error) {
    var _this = this;
    if (!data) {
        data = {}
    }
    $.ajax({
        type: 'POST',
        url: BASE_URL + url,
        data: data,
        dataType: 'json',
        success: function (res) {
            Indicator.close();
            if (success) {
                success(res);
            }
        },
        error: function (res) {
            Indicator.close();
            if (res.status == 401) {
                router.push('/login');
            } else {
                if (error) {
                    error(res);
                } else {
                    // Toast("网络连接超时，请刷新重试");
                }
            }
        }
    });
}

function get(url, success, error) {
    var _this = this;
    $.ajax({
        type: 'GET',
        url: BASE_URL + url,
        dataType: 'json',
        success: function (res) {
            Indicator.close();
            if (success) {
                success(res);
            }
        },
        error: function (res) {
            Indicator.close();
            if (res.status == 401) {
                router.push('/login');
            } else {
                if (error) {
                    error(res);
                } else {
                    // Toast("网络连接超时，请刷新重试");
                }
            }
        }
    });
}

const URL = {
    sendSms: '/api/message/sms/sendSms',
    register: '/api/authUser/register',
    login: '/api/authUser/login',
    logout: '/api/authUser/logout',
    resetPassword: '/api/authUser/resetPassword',
    eqList: '/api/equipment/list',
    eqDel: '/api/equipment/delete',
    eqDetail: '/api/equipment/detail',
    faultList: '/api/equipmentAlarm/list',
    timerTask: '/api/equipmentSwitchTask/list',
    addTimerTask: '/api/equipmentSwitchTask/add',
    updateTimerTask: '/api/equipmentSwitchTask/update',
    delTimerTask: '/api/equipmentSwitchTask/delete',
    eqSave: '/api/equipment/save',
    eqBind: '/api/equipment/bind',
    eqMatch: '/api/equipment/isExist',
    eqRoomList: '/api/room/list',
    eqRoomAdd: '/api/room/add',
    useSceneList: '/api/useScene/list',
    useSceneAdd: '/api/useScene/add',
    eqUnbind: '/api/equipment/unBind',
    updateMobilePhone: '/api/authUser/updateMobilePhone',
    authUser: '/api/authUser/detail',
    editScene: '/api/useScene/update',
    delScene: '/api/useScene/delete',
    updateBind: '/api/equipment/updateBind',
    delRoom: '/api/room/delete',
    editRoom: '/api/room/update',
    editEqName: '/api/equipment/userUpdateEquipmentName',

    // 主机
    startUp: '/api/mainEquipment/startUp',
    shutDown: '/api/mainEquipment/shutDown',
    adjustHeatMode: '/api/mainEquipment/adjustHeatMode',
    adjustCoolMode: '/api/mainEquipment/adjustCoolMode',
    adjustHeatTemperature: '/api/mainEquipment/adjustHeatTemperature',
    adjustCoolTemperature: '/api/mainEquipment/adjustCoolTemperature',
    readWaterTemerature: '/api/mainEquipment/readWaterTemerature',

    // 风盘接口
    startUpFan: '/api/fanEquipment/startUp',
    shutDownFan: '/api/fanEquipment/shutDown',
    adjustHeatModeFan: '/api/fanEquipment/adjustHeatMode',
    adjustCoolModeFan: '/api/fanEquipment/adjustCoolMode',
    adjustHeatTemperatureFan: '/api/fanEquipment/adjustHeatTemperature',
    adjustCoolTemperatureFan: '/api/fanEquipment/adjustCoolTemperature',
    adjustVentilationMode: '/api/fanEquipment/adjustVentilationMode',
    adjustWindSpeed: '/api/fanEquipment/adjustWindSpeed',

    // 设备报修
    equipmentRepairAdd: '/api/equipmentRepair/add',
    equipmentRepairAddWx: '/api/nonmemberEquipmentRepair/add ',

//  产品应用
    articleList: '/api/article/list',
    articleDetail: '/api/article/detail',

    /*新风设备*/
    freshStartUp: '/api/xinFengEquipment/startUp',
    freshShutDown: '/api/xinFengEquipment/shutDown',
    freshAdjustHeatMode: '/api/xinFengEquipment/adjustHeatMode',
    freshAdjustCoolMode: '/api/xinFengEquipment/adjustCoolMode',
    freshAdjustHeatTemperature: '/api/xinFengEquipment/adjustHeatTemperature',
    freshAdjustCoolTemperature: '/api/xinFengEquipment/adjustCoolTemperature',
};

const Api = {
    saveInfo() {
        sessionStorage.setItem('token', new Date().getTime())
    },
    delInfo() {
        sessionStorage.removeItem('token')
    },
    getInfo() {
        var flag = sessionStorage.getItem('token');
        return flag;
    },
    login(data, success, err) {
        post(URL.login, data, success, err)
    },
    logout(success, err) {
        get(URL.logout, success, err)
    },
    register(data, success, err) {
        post(URL.register, data, success, err)
    },
    sendSms(data, success, err) {
        post(URL.sendSms, data, success, err)
    },
    resetPassword(data, success, err) {
        post(URL.resetPassword, data, success, err)
    },
    eqList(str, success, err) {
        get(URL.eqList + '?' + str, success, err)
    },
    eqListAll(success, err) {
        get(URL.eqList, success, err)
    },
    eqDel(data, success, err) {
        post(URL.eqDel, data, success, err)
    },
    eqDetail(id, success, err) {
        get(URL.eqDetail + '?id=' + id, success, err)
    },
    faultList(str, success, err) {
        get(URL.faultList + '?' + str, success, err)
    },
    timerTask(str, success, err) {
        get(URL.timerTask + '?' + str, success, err)
    },
    addTimerTask(data, success, err) {
        post(URL.addTimerTask, data, success, err)
    },
    updateTimerTask(data, success, err) {
        post(URL.updateTimerTask, data, success, err)
    },
    delTimerTask(str, success, err) {
        get(URL.delTimerTask + '?' + str, success, err)
    },
    startUp(str, type, success, err) {
        let url = URL.startUp;
        if (type == 2) {
            url = URL.startUpFan;
        }
        get(url + '?' + str, success, err)
    },
    shutDown(str, type, success, err) {
        let url = URL.shutDown;
        if (type == 2) {
            url = URL.shutDownFan;
        }
        get(url + '?' + str, success, err)
    },
    adjustHeatMode(str, type, success, err) {
        let url = URL.adjustHeatMode;
        if (type == 2) {
            url = URL.adjustHeatModeFan;
        }
        get(url + '?' + str, success, err)
    },
    adjustCoolMode(str, type, success, err) {
        let url = URL.adjustCoolMode;
        if (type == 2) {
            url = URL.adjustCoolModeFan;
        }
        get(url + '?' + str, success, err)
    },
    adjustHeatTemperature(str, type, success, err) {
        let url = URL.adjustHeatTemperature;
        if (type == 2) {
            url = URL.adjustHeatTemperatureFan;
        }
        get(url + '?' + str, success, err)
    },
    adjustCoolTemperature(str, type, success, err) {
        let url = URL.adjustCoolTemperature;
        if (type == 2) {
            url = URL.adjustCoolTemperatureFan;
        }
        get(url + '?' + str, success, err)
    },

    adjustVentilationMode(str, success, err) {
        get(URL.adjustVentilationMode + '?' + str, success, err)
    },

    adjustWindSpeed(str, success, err) {
        get(URL.adjustWindSpeed + '?' + str, success, err)
    },

    eqSave(params, success, err) {
        post(URL.eqSave, params, success, err)
    },

    eqBind(params, success, err) {
        post(URL.eqBind, params, success, err)
    },

    equipmentRepairAdd(params, success, err) {
        post(URL.equipmentRepairAdd, params, success, err)
    },

    equipmentRepairAddWx(params, success, err) {
        post(URL.equipmentRepairAddWx, params, success, err)
    },

    eqMatch(str, success, err) {
        get(URL.eqMatch + '?' + str, success, err)
    },

    eqRoomList(str, success, err) {
        get(URL.eqRoomList + '?' + str, success, err)
    },

    eqRoomAdd(params, success, err) {
        post(URL.eqRoomAdd, params, success, err)
    },

    useSceneList(str, success, err) {
        get(URL.useSceneList + '?' + str, success, err)
    },

    useSceneAdd(params, success, err) {
        post(URL.useSceneAdd, params, success, err)
    },

    readWaterTemerature(str, success, err) {
        get(URL.readWaterTemerature + '?' + str, success, err)
    },

    eqUnbind(str, success, err) {
        get(URL.eqUnbind + '?' + str, success, err)
    },

    updateMobilePhone(params, success, err) {
        post(URL.updateMobilePhone, params, success, err)
    },

    authUser(success, err) {
        get(URL.authUser, success, err)
    },

    isLogin(success, err) {
        get(URL.authUser, success, err)
    },

    editScene(params, success, err) {
        post(URL.editScene, params, success, err)
    },

    delScene(str, success, err) {
        get(URL.delScene + '?' + str, success, err)
    },

    updateBind(params, success, err) {
        post(URL.updateBind, params, success, err)
    },

    delRoom(str, success, err) {
        get(URL.delRoom + '?' + str, success, err)
    },

    editRoom(params, success, err) {
        post(URL.editRoom, params, success, err)
    },

    editEqName(params, success, err) {
        post(URL.editEqName, params, success, err)
    },

    articleList(str, success, err) {
        get(URL.articleList + '?' + str, success, err)
    },

    articleDetail(id, success, err) {
        get(URL.articleDetail + '?id=' + id, success, err)
    },

    /*新风*/
    freshStartUp(str, success, err) {
        let url = URL.freshStartUp;
        get(url + '?' + str, success, err)
    },

    freshShutDown(str, success, err) {
        let url = URL.freshShutDown;
        get(url + '?' + str, success, err)
    },
    freshAdjustHeatMode(str, success, err) {
        let url = URL.freshAdjustHeatMode;
        get(url + '?' + str, success, err)
    },
    freshAdjustCoolMode(str, success, err) {
        let url = URL.freshAdjustCoolMode;
        get(url + '?' + str, success, err)
    },
    freshAdjustHeatTemperature(str, type, success, err) {
        let url = URL.freshAdjustHeatTemperature;
        get(url + '?' + str, success, err)
    },
    freshAdjustCoolTemperature(str, type, success, err) {
        let url = URL.freshAdjustCoolTemperature;
        get(url + '?' + str, success, err)
    },

};
export default Api;
