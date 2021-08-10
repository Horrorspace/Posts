import {createStore, applyMiddleware, compose, Store} from 'redux'
import {saga} from '@redux/saga/saga'
import {rootReducer} from '@redux/reducers/rootReducer'


export const store: Store = createStore(rootReducer, compose(applyMiddleware(saga)));
