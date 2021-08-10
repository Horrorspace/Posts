import {ActTypes} from '@redux/types/PostActTypes'

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
export const updatePosts = (): IreduxAction => {
    return {
        type: PostActTypes.updatePosts,
    }
};
