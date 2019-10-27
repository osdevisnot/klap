import React from 'react'
import { render } from 'react-dom'
import { Button } from '../src'

render(<Button onClick={e => console.log(e)} />, document.getElementById('root'))
