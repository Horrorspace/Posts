import React, { ReactElement, useState, MouseEvent, ChangeEvent } from 'react'
import {IAction, IThunkAction, IreduxState, IRootReducer} from '@redux/interfaces/IRedux'
import {useSelector, useDispatch} from 'react-redux'
import {store} from '@redux/store'
import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import {Modal, Button, Container, Form, Row, Col} from 'react-bootstrap'
import {delPost, putPost, sendNewPost, downloadPosts} from '@redux/actions/postActions'



export const DataTest: React.FC = () => {
    const posts: IPosts = useSelector((state: IRootReducer) => state.post.posts);
    const postsList: IPostInstance[] = posts.getAllPosts();
    const idArr: number[] = postsList.map((val: IPostInstance) => val.getId());
    const [show, setShow] = useState(false);
    const [showEditor, setShowEditor] = useState(false);
    const [activeId, setActiveId] = useState(0);
    const [editorTitle, setEditTitle] = useState('');
    const [editorBody, setEditBody] = useState('');
    const [showNew, setShowNew] = useState(false);
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
        setShowEditor(false);
        setShowNew(false);
    };
    const handleShow = (e: MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLButtonElement;
        const id: number = parseInt(target.id, 10);
        setActiveId(id);
        setShow(true);
    };
    const handleDel = () => {
        const id: number = activeId;
        const postToDel: IPostInstance = posts.getPostById(id);
        setShow(false);
        dispatch(delPost(postToDel));
    };
    const handeEdit = () => {
        const id: number = activeId;
        const post: IPostInstance = posts.getPostById(id);
        const title: string = post.getTitle();
        const body: string = post.getBody();
        setEditTitle(title);
        setEditBody(body);
        setShowEditor(true);
    };
    const handleSave = () => {
        const id: number = activeId;
        const postToPut: IPostInstance = posts.getPostById(id);
        postToPut.setBody(editorBody);
        postToPut.setTitle(editorTitle);
        dispatch(putPost(postToPut));
        setShow(false);
        setShowEditor(false);
    };
    const handleSend = () => {
        const newPost: INewPost = {
            title: editorTitle,
            body: editorBody,
            userId: 1
        }
        if(newPost.title.length > 0 && newPost.body.length > 0) {
            dispatch(sendNewPost(newPost));
        }
        setShowNew(false);
    };
    const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const value: string = target.value;
        setEditBody(value);
    };
    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const value: string = target.value;
        setEditTitle(value);
    };
    const handeUpdate = () => {
        dispatch(downloadPosts());
    };
    const handeAddPost = () => {
        setEditTitle('');
        setEditBody('');
        setShowNew(true);
    };

    const newPostEditor: ReactElement = 
        <Modal show={showNew} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <Form.Control as="textarea" rows={1} value={editorTitle} onChange={handleTitleChange} /> 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control as="textarea" rows={3} value={editorBody} onChange={handleBodyChange} /> 
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSend}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    
    const postTitleList: ReactElement[] = postsList.map(
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
    const postList: ReactElement[] = postsList.map(
        (post: IPostInstance): ReactElement => {
            
            const buttons = (): ReactElement => {
                if(showEditor) {
                    return (
                        <>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={handleDel}>
                                Delete
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save
                            </Button>
                        </>
                        )
                }
                else {
                    return (
                        <>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={handleDel}>
                                Delete
                            </Button>
                            <Button variant="primary" onClick={handeEdit}>
                                Edit
                            </Button>
                        </>
                    )
                }

            }

            const title = (): ReactElement => {
                if(showEditor) {
                    return (
                        <>
                           <Form.Control as="textarea" rows={1} value={editorTitle} onChange={handleTitleChange} /> 
                        </>
                    )
                }
                else {
                    return (
                        <>
                           {post.getTitle()}
                        </>
                    )
                }
            }

            const body = (): ReactElement => {
                if(showEditor) {
                    return (
                        <>
                           <Form.Control as="textarea" rows={3} value={editorBody} onChange={handleBodyChange} /> 
                        </>
                    )
                }
                else {
                    return (
                        <>
                           {post.getBody()}
                        </>
                    )
                }
            }
            
            return (
                <Modal show={show && activeId == post.getId()} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>
                            {title()}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {body()}
                    </Modal.Body>
                    <Modal.Footer>
                        {buttons()}
                    </Modal.Footer>
                </Modal>
            )
        }
    );
    
    return (
            <Container fluid>
                <Row>
                    <Col>
                        <Button variant="primary" onClick={handeUpdate}>
                            Update posts
                        </Button> 
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handeAddPost}>
                            Add new post
                        </Button> 
                    </Col>
                </Row>
                {postTitleList}
                {newPostEditor}
                {postList}
            </Container>
    )
}