import axios from './utils/axios.js';
import api from './utils/api.js';
App({
  globalData: {
    token:wx.getStorageSync('token'),
    userInfo:wx.getStorageSync('userInfo'),
    navBarHeight: wx.getSystemInfoSync()['statusBarHeight'],
  },
  axios:axios,
  api:api
})
