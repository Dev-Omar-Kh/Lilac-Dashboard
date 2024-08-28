import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutAdmin from './Layout/LayoutAdmin';
import Auth from './Pages/Auth/Auth';
import Password from './Pages/Auth/Password';
import Login from './Pages/Auth/Login';
import { QueryClient, QueryClientProvider } from 'react-query';
import Products from './Pages/Products/Products';
import ProCont from './Pages/Products/ProCont';
import AddPro from './Pages/Products/AddPro';
import UpdatePro from './Pages/Products/UpdatePro';
import Services from './Pages/Services/Services';
import ServicesCont from './Pages/Services/ServicesCont';
import AddService from './Pages/Services/AddService';
import UpdateService from './Pages/Services/UpdateService';
import Content from './Pages/Content/Content';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';

import './App.css';
import OwnerRoute from './Protected-Route/OwnerRoute';
import ResetPass from './Pages/Reset-Pass/ResetPass';
import { Provider } from 'react-redux';
import { Store } from './Redux/Store';

const routes = createBrowserRouter([

  {path : '/' , element : <Auth /> , children : [

    {path : '/' , element : <Password />},
    {path : '/login' , element : <OwnerRoute><Login /></OwnerRoute>},

  ]},

  {path : '/dashboard' , element : <OwnerRoute><LayoutAdmin /></OwnerRoute> , children : [

    {path : '/dashboard/services' , element : <Services /> , children : [

      {path : '/dashboard/services' , element : <ServicesCont />},
      {path : '/dashboard/services/add' , element : <AddService />},
      {path : '/dashboard/services/update/:id' , element : <UpdateService />},

    ]},

    {path : '/dashboard/products' , element : <Products /> , children : [

      {path : '/dashboard/products/' , element : <ProCont />},
      {path : '/dashboard/products/add' , element : <AddPro />},
      {path : '/dashboard/products/update/:id' , element : <UpdatePro />},

    ]},

    {path : '/dashboard/content' , element : <Content />},

    {path : '/dashboard/about' , element : <About />},

    {path : '/dashboard/contact' , element : <Contact />},

    {path : '/dashboard/reset' , element : <ResetPass />},

  ]}

])

export default function App() {

  let clientQuery = new QueryClient();

  return <React.Fragment>

    <Provider store={Store}>

      <QueryClientProvider client={clientQuery}>

        <RouterProvider router={routes} />

      </QueryClientProvider>

    </Provider>

  </React.Fragment>

}
