import React, { ReactElement } from 'react'
import {IAction, IThunkAction, IreduxState, IRootReducer} from '@redux/interfaces/IRedux'
import {Provider, useSelector, useStore} from 'react-redux'
import { Store } from 'redux'
import {store} from '@redux/store'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import {downloadPosts, setDefault, sendNewPost} from '@redux/actions/postActions'



const testData: IPostData = {
    id: 2,
    title: 'Hey',
    body: 'Test',
    userId: 7
};
const newPost: INewPost = {
    title: 'Hey',
    body: 'Test',
    userId: 7
};
const testPost: IPostInstance = new Post(testData);
const testPosts: IPosts = new Posts();
testPosts.addPost(testPost);




store.dispatch(downloadPosts());

setTimeout(() => {
    store.dispatch(setDefault());
    store.dispatch(sendNewPost(newPost))
}, 3000)





export const DataTest: React.FC = () => {
    const posts: IPostInstance[] = useSelector((state: IRootReducer) => state.post.posts.getAllPosts());

    
    const postList = posts.map(
        (post: IPostInstance): ReactElement => {
            return (
                <li>{post.getTitle()}</li>
            )
        }
    );
    
    return (
            <div>
                {postList}
            </div>
    )
}