import React, { ReactElement, useState, MouseEvent } from 'react'
import {IAction, IThunkAction, IreduxState, IRootReducer} from '@redux/interfaces/IRedux'
import {Provider, useSelector, useStore} from 'react-redux'
import { Store } from 'redux'
import {store} from '@redux/store'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import {downloadPosts, setDefault, sendNewPost} from '@redux/actions/postActions'
import {Modal, Button, Container} from 'react-bootstrap'



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
    const idArr: number[] = posts.map((val: IPostInstance) => val.getId());
    const [show, setShow] = useState(false);
    const [activeId, setActiveId] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const id: number = parseInt(target.id, 10);
        setActiveId(id);
        setShow(true);
    };
    
    const postTitleList: ReactElement[] = posts.map(
        (post: IPostInstance): ReactElement => {
            return (
                <Container fluid="sm" className="d-flex flex-column justify-content-center">
                    <Button variant="primary" onClick={handleShow} id={`${post.getId()}`}>
                        {post.getTitle()}
                    </Button>
                </Container>
            )
        }
    );
    const postList: ReactElement[] = posts.map(
        (post: IPostInstance): ReactElement => {
            return (
                <Modal show={show && activeId == post.getId()} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{post.getTitle()}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{post.getBody()}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    );
    
    return (
            <Container fluid>
                {postTitleList}
                {postList}
            </Container>
    )
}