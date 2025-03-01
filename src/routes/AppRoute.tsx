
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Subjects from '../pages/Subjects.js';
import Test from '../pages/Test.js';
import Result from '../pages/Result.js';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';


;
const route = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to = 'subjects'/>
  },
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: 'subjects',
        element: <Subjects/>
      },
      {
        path: 'test',
        element: <Test/>
      },
      {
        path: 'result',
        element: <Result/>
      }
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  }
])

const AppRoute = () => {
  return (
      <RouterProvider router={route}/>
  )
}

export default AppRoute