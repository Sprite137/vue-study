/* eslint-disable @typescript-eslint/no-explicit-any */
// api/user.ts

import { get, post } from '../utils/request';

const api = {
    login: 'user/login',
    users: 'user/info'
}

//登录
export const login = (params: any) => {
    return post(api.login, params).then((res: any) => {
        if (res.code === 200) {
            localStorage.setItem('token', "token");
        }
        return Promise.resolve(res);
    })
}


//获取用户信息
export const getUserInfo = (params:any) => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject(new Error('用户未登录'));
    return get(api.users,params).then((res: any) => {
        if (res.code === 200) {
            return Promise.resolve(res);
        }
        return Promise.resolve(res);
    })
}
