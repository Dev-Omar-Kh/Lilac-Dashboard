import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutAdmin from './Layout/LayoutAdmin';
import Auth from './Pages/Auth/Auth';
import Password from './Pages/Auth/Password';
import Login from './Pages/Auth/Login';
import { QueryClient, QueryClientProvider } from 'react-query';

import './App.css';
import Products from './Pages/Products/Products';
import ProCont from './Pages/Products/ProCont';
import AddPro from './Pages/Products/AddPro';
import UpdatePro from './Pages/Products/UpdatePro';

const routes = createBrowserRouter([

  {path : '/auth' , element : <Auth /> , children : [

    {path : '/auth/password' , element : <Password />},
    {path : '/auth/login' , element : <Login />},

  ]},

  {path : '/' , element : <LayoutAdmin /> , children : [

    {path : '/products' , element : <Products /> , children : [

      {path : '/products/' , element : <ProCont />},
      {path : '/products/add' , element : <AddPro />},
      {path : '/products/update/:id' , element : <UpdatePro />},

    ]}

  ]}

])

export default function App() {

  let clientQuery = new QueryClient();

  return <React.Fragment>

    <QueryClientProvider client={clientQuery}>

      <RouterProvider router={routes} />

    </QueryClientProvider>

  </React.Fragment>

}
