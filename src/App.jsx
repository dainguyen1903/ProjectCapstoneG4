import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DatePicker } from 'antd';
import HeaderPage from './component/layout/header';
import LayOutPage from './component/layout';
import Login from './page/login/login';
import Register from './page/register/register';
import RouterConfig from './component/router/routerConfig';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <RouterConfig/>
       {/* <Login /> */}
       {/* <Register /> */}
    </>
  )
}

export default App
