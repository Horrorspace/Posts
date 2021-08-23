import {combineReducers, Reducer} from 'redux'
import {postReducer} from '@redux/reducers/postReducer'
import {authReducer} from '@redux/reducers/authReducer'


export const rootReducer: Reducer = combineReducers({
    post: postReducer,
    auth: authReducer
});
