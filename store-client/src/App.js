import React, { Suspense, lazy } from 'react';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Route, Routes } from 'react-router-dom';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css'; 
import { Provider } from 'react-redux';
import myStore from './myStore';
import Layout from './common/Layout';


const Register = lazy(() => import('./User/register'));
const Login = lazy(() => import('./User/login'));
const ProductList = lazy(() => import('./Product/productList'));
// const UpdateProd = lazy(() => import('./Product/updateProd'));
const ManageProd = lazy(() => import('./Product/manageProd'));
const Cart = lazy(() => import('./Product/cart'));
const AddProduct = lazy(() => import('./Product/addProduct'));

function App() {
  return (
    <>
      <Provider store={myStore}>
        <PrimeReactProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
              <Route path="/" element={<ProductList />}></Route>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/addProduct" element={<AddProduct />} />
                <Route path="/manage" element={<ManageProd />} />
                {/* <Route path="/list" element={<ProductList />} /> */}
                {/* <Route path="/update" element={<UpdateProd />} /> */}
              </Route>
            </Routes>
          </Suspense>
        </PrimeReactProvider>
      </Provider>
    </>
  );
}

export default App;
