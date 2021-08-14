import {Reducer} from 'redux'
import {PostActTypes} from '@redux/types/PostActTypes'
import {IreduxAction, IreduxState} from '@redux/interfaces/IRedux'
import Posts from '@core/classes/Posts'


const defaultState: IreduxState = {
    posts: new Posts(),
    isDataUpdating: false
};

export const postReducer: Reducer = (state: IreduxState = defaultState, action: IreduxAction): IreduxState => {
    switch (action.type) {
        case PostActTypes.updatePosts:
            if(action.posts) {
                return {
                    ...state,
                    posts: action.posts,
                    isDataUpdating: false
                }
            }
            else {
                return state
            }
        case PostActTypes.setDefault:
            return defaultState
        case PostActTypes.setUpdating:
                return {
                    ...state,
                    isDataUpdating: true
                }
        default:
            return state
    }
}
