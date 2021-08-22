import {put, put as putUntyped} from 'redux-saga/effects'
import {downloadPosts, setDefault} from '@redux/actions/postActions'
import {IAction} from '@redux/interfaces/IRedux'
import { SimpleEffect } from '@redux-saga/types'


interface PutEffectDescriptor<A extends IAction> {
  action: A
  channel: null
  resolve?: boolean
}
type PutEffect<A extends IAction> = SimpleEffect<'PUT', PutEffectDescriptor<A>>
type putSaga = (action: IAction) => PutEffect<IAction>

const thunkPut = putUntyped as putSaga;

export function* sagaUpdate()
{
  yield thunkPut(downloadPosts());
}