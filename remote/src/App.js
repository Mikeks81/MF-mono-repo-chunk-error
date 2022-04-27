import { Component } from 'react'

import Logo from './assets/altafino.svg'
import './app.styles.scss'

class App extends Component {
  render() {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-black font-bold rounded-lg border shadow-lg p-10 m-20'>
          <h1>HELLO</h1>
        </div>
      </div>
    )
  }
}

export default App
