import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LayoutAdmin from './Layout/LayoutAdmin';

import './App.css';

const routes = createBrowserRouter([

  {path : '/' , element : <LayoutAdmin />}

])

export default function App() {
  return <React.Fragment>

    <RouterProvider router={routes} />

  </React.Fragment>
}
