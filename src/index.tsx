import '@scss/index.scss'
import React from 'react'
import {render} from 'react-dom'
import {App} from '@react/App'
import {saga} from '@redux/saga/saga'
import {sagaWatcher} from '@redux/saga/sagaWatcher'

saga.run(sagaWatcher);

render(<App />, document.getElementById('root'))