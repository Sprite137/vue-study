export interface bookData{//用户表对应的接口
    id:number
    title:string
    author:string
}

export type Books = Array<bookData>

export interface BookItem {
    value: string
    author: string
}
export type BookItems  = Array<BookItem>

export interface BakckendBookItem {
    id: number;
    title: string;
    author: string;
    tag: string;
    bookId: string;
    rate: number;
    isDel: number;
    createTime: string;
    updateTime: string;
    createBy: string;
    updateBy: string;
    viewCount: number;
}