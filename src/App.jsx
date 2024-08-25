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
import Services from './Pages/Services/Services';
import ServicesCont from './Pages/Services/ServicesCont';
import AddService from './Pages/Services/AddService';
import UpdateService from './Pages/Services/UpdateService';
import Content from './Pages/Content/Content';

const routes = createBrowserRouter([

  {path : '/auth' , element : <Auth /> , children : [

    {path : '/auth/password' , element : <Password />},
    {path : '/auth/login' , element : <Login />},

  ]},

  {path : '/' , element : <LayoutAdmin /> , children : [

    {path : '/services' , element : <Services /> , children : [

      {path : '/services' , element : <ServicesCont />},
      {path : '/services/add' , element : <AddService />},
      {path : '/services/update/:id' , element : <UpdateService />},

    ]},

    {path : '/products' , element : <Products /> , children : [

      {path : '/products/' , element : <ProCont />},
      {path : '/products/add' , element : <AddPro />},
      {path : '/products/update/:id' , element : <UpdatePro />},

    ]},

    {path : '/content' , element : <Content />},

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
