import {call, put, put as putUntyped} from 'redux-saga/effects'
import {toggleShow} from '@redux/actions/authActions'
import { delay } from 'rxjs'


export function* sagaShowMessage()
{
    yield put(toggleShow());
    yield call(delay, 3000);
    yield put(toggleShow());
}