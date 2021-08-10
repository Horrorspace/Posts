import {combineReducers, Reducer} from 'redux'
import {postReducer} from '@redux/reducers/postReducer'


export const rootReducer: Reducer = combineReducers({
    post: postReducer,
});
