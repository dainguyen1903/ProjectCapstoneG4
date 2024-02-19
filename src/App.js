import './App.scss';
// react router v6
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// pages
import {Home, CategoryProduct, ProductSingle, Cart, Search} from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import {Provider} from "react-redux";
import Blog from "./pages/Blog/Blog";
import Login from "./pages/Login/Login";

import Profile from "./pages/UpdateProfiles/Profile";
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <BrowserRouter>
       
           <Routes>
          {/* Home page route */}
          <Route path="/" element={<>
            <Header />
            <Sidebar />
            <Home />
            <Footer />
          </>} />

          {/* Single product route */}
          <Route path="/product/:id" element={<>
            <Header />
            <Sidebar />
            <ProductSingle />
            <Footer />
          </>} />

          {/* Category wise product listing route */}
          <Route path="/category/:category" element={<>
            <Header />
            <Sidebar />
            <CategoryProduct />
            <Footer />
          </>} />

          {/* Cart */}
          <Route path="/cart" element={<>
            <Header />
            <Sidebar />
            <Cart />
            <Footer />
          </>} />

          {/* Searched products */}
          <Route path="/search/:searchTerm" element={<>
            <Header />
            <Sidebar />
            <Search />
            <Footer />
          </>} />


          <Route path="/profile" element={<>
            <Header />
            <Sidebar />
            <Profile />
            <Footer />
          </>} />

          <Route path="/blog" element={<>
            <Header />
            <Sidebar />
            <Blog/>
            <Footer />
          </>} />
          {/* Login route */}
          <Route path="/login" element={<Login />} />

        </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
