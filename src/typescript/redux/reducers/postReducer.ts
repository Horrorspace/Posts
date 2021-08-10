import {Reducer} from 'redux'
import {PostActTypes} from '@redux/types/PostActTypes'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'


const defaultState: IreduxState = {
    posts: [],
    isDataLoaded: true,
    isDataUpdating: false
};

export const calcReducer: Reducer = (state: IreduxState = defaultState, action: IreduxAction): IreduxState => {
    switch (action.type) {
        case PostActTypes.downloadPosts:
            return {
                ...state
            }
    }
}
