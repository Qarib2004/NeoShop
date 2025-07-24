export const  getContentType = () => ({
    'Content-type':'application/json'
})



export const errorCatch = (error:any):string =>{
    const message = error?.responce?.data?.message

    return message ?
    typeof error.responce.data.message === 'object'
    ? message[0] : message
    :error.message
}