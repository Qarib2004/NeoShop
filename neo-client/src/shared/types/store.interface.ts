export interface IStore{
    id:string
    title:string
    description?:string
}


export interface IStoreCreated extends Pick<IStore,'title'>{}



export interface IStoreEdit extends Omit<IStore, 'id'>{}