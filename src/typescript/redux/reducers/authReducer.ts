import {Reducer} from 'redux'
import {authActTypes} from '@redux/types/authActTypes'
import {IreduxAuthAction, IThunkAuthAction, IreduxAuthState, IThunkAuthState} from '@redux/interfaces/IReduxAuth'



const defaultState: IreduxAuthState = {
    token: '',
    userId: 0,
    message: '',
    isShow: false,
    isLogin: false
};

export const authReducer: Reducer = (state: IreduxAuthState = defaultState, action: IreduxAuthAction): IreduxAuthState => {
    switch (action.type) {
        case authActTypes.setLogin:
            if(action.token && action.userId) {
                return {
                    ...state,
                    token: action.token,
                    userId: action.userId,
                    isLogin: true
                }
            }
            else {
                return state
            }
        case authActTypes.clearLogin:
            return defaultState
        case authActTypes.setMessage:
            if(action.message) {
                return {
                    ...state,
                    message: action.message,
                }
            }
            else {
                return state
            }
        case authActTypes.toggleShow:
            if(state.isShow) {
                return {
                    ...state,
                    isShow: false,
                }
            }
            else {
                return {
                    ...state,
                    isShow: true
                }
            }
        default:
            return state
    }
}