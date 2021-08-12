import React from 'react'
import {Provider, useSelector, useStore} from 'react-redux'
import { from, Observable, Subscription } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import {IAction, IThunkAction, IreduxState} from '@redux/interfaces/IRedux'
import { filter, map, switchMap } from 'rxjs/operators'
import {store} from '@redux/store'

import { IPost, IPostData, IPostInstance, IPosts, INewPost } from '@core/interfaces/IPost'
import postCheck from '@core/functions/postCheck'
import Post from '@core/classes/Post'
import Posts from '@core/classes/Posts'
import { Store } from 'redux'
import {DataTest} from '@react/components/DataTest'




export const App: React.FC = () => {
    return (
        <Provider store={store}>
            <DataTest />
        </Provider>
    )
}