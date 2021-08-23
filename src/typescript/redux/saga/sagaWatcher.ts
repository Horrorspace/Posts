import {takeEvery} from 'redux-saga/effects'
import {PostActTypes} from '@redux/types/PostActTypes'
import {authActTypes} from '@redux/types/authActTypes'
import {sagaUpdate} from '@redux/saga/sagaUpdate'
import {sagaShowMessage} from '@redux/saga/sagaShowMessage'


export function* sagaWatcher() {
    yield takeEvery(PostActTypes.setUpdating, sagaUpdate);
    yield takeEvery(authActTypes.setMessage, sagaShowMessage);
}