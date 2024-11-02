import * as React from 'react';
import * as ReactDom from 'react-dom';
import {createBrowserRouter,Router,RouterProvider} from "react-router-dom"; 
import Home from './pages/Home/Home';
import './index.css'
 

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home />,
  },
]);

 ReactDom.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
); 