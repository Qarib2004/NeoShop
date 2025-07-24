import Cookie from 'js-cookie'

export enum EnumTokens{
    "ACCESS_TOKEN" = 'accessToken',
    "REFRESH_TOKEN" = 'refreshToken',
}


export const getAccessToken = () => {
    const accessToken = Cookie.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}


export const saveTokenStorage = (accessToken:string) =>{
    Cookie.set(EnumTokens.ACCESS_TOKEN,accessToken,{
        domain:process.env.APP_DOMAIN,
        sameSite:'strict',
        expires:1
    })
}


export const removeFromStorage = () => {
    Cookie.remove(EnumTokens.ACCESS_TOKEN)
}