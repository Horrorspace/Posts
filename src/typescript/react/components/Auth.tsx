import React, { ReactElement, useState, MouseEvent, ChangeEvent } from 'react'
import {IRootReducer} from '@redux/interfaces/IRedux'
import { IreduxAuthState } from '@redux/interfaces/IReduxAuth'
import {useSelector, useDispatch} from 'react-redux'
import {IUser} from '@core/interfaces/IUser'
import {Modal, Button, Container, Form, Row, Col, Alert} from 'react-bootstrap'
import { toLogin, toRegister } from '@redux/actions/authActions'


export const Auth: React.FC = () => {
    const authState: IreduxAuthState = useSelector((state: IRootReducer) => state.auth);
    const dispatch = useDispatch();

    const [email, setEmail] = useState('') ;
    const [password, setPassword] = useState('') ;

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value: string = target.value;
        setEmail(value);
    };
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const value: string = target.value;
        setPassword(value);
    };

    const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user: IUser = {
            email,
            password
        }
        setEmail('');
        setPassword('');
        dispatch(toLogin(user))
    }
    const handleRegisterClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user: IUser = {
            email,
            password
        }
        setEmail('');
        setPassword('');
        dispatch(toRegister(user))
    }

    return (
        <Container fluid>
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange}  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleLoginClick}>
                    Login
                </Button>

                <Button variant="primary" type="submit" onClick={handleRegisterClick}>
                    Register
                </Button>
            </Form>

            <Alert show={authState.isLogin}>
                {`You are login ${authState.isLogin}`}
            </Alert>
        </Container>
    )
}