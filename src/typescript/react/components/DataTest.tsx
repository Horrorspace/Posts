import React from 'react'
import {IAction, IThunkAction, IreduxState, IRootReducer} from '@redux/interfaces/IRedux'
import {Provider, useSelector, useStore} from 'react-redux'
import { Store } from 'redux'
import {store} from '@redux/store'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import {downloadPosts, setDefault} from '@redux/actions/postActions'


const testData: IPostData = {
    id: 2,
    title: 'Hey',
    body: 'Test',
    userId: 7
};
const testPost: IPostInstance = new Post(testData);
const testPosts: IPosts = new Posts();
testPosts.addPost(testPost);



console.log(store.getState());
store.dispatch(downloadPosts());

// setTimeout(() => {
//     console.log(store.getState());
//     store.dispatch(setDefault());
//     console.log(store.getState());
// }, 5000);




export const DataTest: React.FC = () => {
    const posts = useSelector((state: IRootReducer) => state.post.posts.getAllPosts());
    const len: number = posts.length;
    console.log(posts);
    
    return (
            <div>
                {len > 0 ? posts[len-1].getBody() : 'Hello'}
            </div>
    )
}