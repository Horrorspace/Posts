import '@scss/index.scss'
import React from 'react'
import {render} from 'react-dom'
import {App} from '@react/App'
import {saga} from '@redux/saga/saga'
import {sagaWatcher} from '@redux/saga/sagaWatcher'
import register from '@core/functions/register'
import login from '@core/functions/login'
import { IUser } from '@core/interfaces/IUser'


const testuser: IUser = {
    email: 'test@test.com',
    password: '237598327623'
}


saga.run(sagaWatcher);

render(<App />, document.getElementById('root'))