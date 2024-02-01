import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DatePicker } from 'antd';
import HeaderPage from './component/layout/header';
import LayOutPage from './component/layout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <LayOutPage/>
    </>
  )
}

export default App
