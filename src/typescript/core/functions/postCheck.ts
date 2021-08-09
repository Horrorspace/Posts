import { postKeys, types } from '@core/constants/postConst'

export default function postCheck(post: Object): boolean {
    if(postKeys.every(key => post.hasOwnProperty(key))) {
        return postKeys.every((key, i) => typeof(post[key]) === types[i]);
    }
    else {
        return false
    }
}