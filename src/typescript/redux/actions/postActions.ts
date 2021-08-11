import {PostActTypes} from '@redux/types/PostActTypes'
import {IreduxAction} from '@redux/interfaces/IRedux'

export const downloadPosts = (): IreduxAction => {
    return {
        type: PostActTypes.downloadPosts,
    }
};
export const sendNewPost = (): IreduxAction => {
    return {
        type: PostActTypes.sendNewPost,
    }
};
export const putPost = (): IreduxAction => {
    return {
        type: PostActTypes.putPost,
    }
};