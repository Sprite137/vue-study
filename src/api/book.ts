/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from '../utils/request';


const api = {
    hotBooks: '/book/hotBooks',
    homeBooks: '/book/homeBooks',
}

//热门书籍
const hotBooks = (params: any) => {
    return get(api.hotBooks, params).then((res: any) => {
        if (res.code === 200) {
            return Promise.resolve(res);
        }
        return Promise.resolve(res);
    })
    
}

const homeBooks = (params: any) => {
    return get(api.homeBooks, params).then((res: any) => {
        if (res.code === 200) {
            return Promise.resolve(res);
        }
        return Promise.resolve(res);
    })
    
}


export {
    hotBooks, homeBooks
}