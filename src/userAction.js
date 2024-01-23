import store from "./store/store"
import { userAction } from "./userSlice"

export const getMyInfo = (id)=>{
    return async(dispatch)=>{
        try {
            const response = await fetch(`http://localhost:6001/user/me/${id}`)
            if (!response.ok) {
                throw new Error('Could not fetch User')
            }

            const data = await response.json()
            store.dispatch(userAction.setUser(data[0]))
        } catch (error) {
            console.log(error);
        }
    }
}