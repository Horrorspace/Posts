import {takeEvery, put} from 'redux-saga/effects'
import {PostActTypes} from '@redux/types/PostActTypes'
import {sagaUpdate} from '@redux/saga/sagaUpdate'


export function* sagaWatcher() {
    yield takeEvery(PostActTypes.setUpdating, sagaUpdate);
}