import {createStore, applyMiddleware, compose, Store, Middleware, AnyAction} from 'redux'
import {saga} from '@redux/saga/saga'
import thunk from 'redux-thunk'
import {rootReducer} from '@redux/reducers/rootReducer'
import {IAction, IRootReducer, IreduxState} from '@redux/interfaces/IRedux'


const Middleware = applyMiddleware(saga, thunk);

export const store: Store<IRootReducer, any> = createStore(rootReducer, compose(Middleware));