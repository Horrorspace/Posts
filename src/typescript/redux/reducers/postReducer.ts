import {Reducer} from 'redux'
import {PostActTypes} from '@redux/types/PostActTypes'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import downloadPosts from '@core/functions/downloadPosts'
import sendNewPost from '@core/functions/sendNewPost'


const defaultState: IreduxState = {
    posts: [],
    isDataUpdating: false
};

export const postReducer: Reducer = (state: IreduxState = defaultState, action: IreduxAction): IreduxState => {
    switch (action.type) {
        case PostActTypes.downloadPosts:
            downloadPosts();
            return {
                ...state,
                isDataUpdating: true
            }
        case PostActTypes.sendNewPost:
            sendNewPost(action.post);
            return {
                ...state,
                isDataUpdating: true
            }
        case PostActTypes.putPost:
            return {
                ...state,
                isDataUpdating: true
            }
        case PostActTypes.updatePosts:
            return {
                ...state,
                posts: action.posts,
                isDataUpdating: false
            }
    }
}
