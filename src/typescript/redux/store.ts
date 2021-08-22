import {createStore, applyMiddleware, compose, Store, Middleware, AnyAction} from 'redux'
import {saga} from '@redux/saga/saga'
import thunk from 'redux-thunk'
import {rootReducer} from '@redux/reducers/rootReducer'
import {IAction, IRootReducer, IreduxState} from '@redux/interfaces/IRedux'
import {sagaWatcher} from '@redux/saga/sagaWatcher'

const middleware = [saga, thunk];
const Middleware = applyMiddleware(...middleware);

export const store: Store<IRootReducer, any> = createStore(rootReducer, compose(Middleware));