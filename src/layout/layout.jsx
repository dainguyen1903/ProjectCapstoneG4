import Sidebar from "../components/Sidebar/Sidebar"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import { Outlet } from "react-router-dom"

const LayOut = () => {
    return (
       <>
        <Header />
        <Sidebar />
        <Outlet />
        <Footer /></>
    )
}
export default LayOut;