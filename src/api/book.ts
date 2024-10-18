/* eslint-disable @typescript-eslint/no-explicit-any */
import { get, post } from '../utils/request';


const api = {
    hotBooks: '/book/hotBooks',
    homeBooks: '/book/homeBooks',
}

//热门书籍
const hotBooks = (params: any) => {
    return get(api.hotBooks, params).then((res: any) => {
        if (res.code === 200) {
            return Promise.resolve(res.data);
        }
        return Promise.resolve(res);
    })
    
}

const homeBooks = (params: any) => {
    return get(api.homeBooks, params).then((res: any) => {
        if (res.code === 200) {
            return Promise.resolve(res.data);
        }
        return Promise.resolve(res);
    })
    
}


//获取用户信息
// export const getUserInfo = () => {
//     const token = localStorage.getItem('token');
//     if (!token) return Promise.reject(new Error('用户未登录'));
//     return get(api.users);
// }


export {
    hotBooks, homeBooks
}