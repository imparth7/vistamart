import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css'
import App from './App';
import PrivateComponent from './components/PrivateComponent';
import New from './components/New';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AddProduct from './pages/AddProduct';
import Shop from './pages/Shop';
import UpdateProduct from './pages/UpdateProduct';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <NextUIProvider>
      <main
        className="dark text-foreground bg-[#070707]"
      >

        <BrowserRouter>
          <Routes>

            {/** Check user auth */}
            <Route element={<PrivateComponent />}>
              <Route path='/' element={<App />} />
              <Route path='/addProduct' element={<AddProduct />} />
              <Route path='/updateProduct/:id' element={<UpdateProduct />} />
              <Route path='/products' element={<Shop />} />
              <Route path='/customers' element={<New name="customers" />} />
              <Route path='/shop' element={<New name="shop" />} />
            </Route>

            <Route path='/*' element={<App />} /> {/*404*/}
            {/** Routes that don't require authentication */}
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>

      </main>
    </NextUIProvider>
  </React.Fragment>,
)
