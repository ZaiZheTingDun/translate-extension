import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'
import { initializeIcons } from '@fluentui/react/lib/Icons'

initializeIcons()
ReactDOM.render(<App />, document.getElementById('options-root'))