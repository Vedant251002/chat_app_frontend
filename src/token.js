import { redirect } from "react-router"
import store from './store/store'
import { getMyInfo } from "./userAction"
export const getAuthKey = ()=>{
    const userId = localStorage.getItem("user")
    if (userId) {
        return userId
    }
    return null
}

export const checkLogin = ()=>{
    const getUser = getAuthKey()
    if (getUser) {
        return redirect('/home')
    }
    return null
} 

export const checkAuth =()=>{
    const getUser = getAuthKey()
    const user = store.getState().user.user
    if (getUser && !user ) {
        store.dispatch(getMyInfo(+getUser))
    }
    
    if (!getUser) {
       return redirect('/login')
    }
    return null
}