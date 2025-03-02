
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Subjects from '../pages/Subjects';
import Test from '../pages/Test';
import Result from '../pages/Result';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/subjects' replace />, // Redirect root to subjects
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />, // Catch errors simply
    children: [
      {
        path: 'subjects',
        element: <Subjects />
      },
      {
        path: 'test',
        element: <Test/>
      },
      {
        path: 'result',
        element: <Result />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const AppRoute = () => {
  return (
      <RouterProvider router={route}/>
  )
}
export default AppRoute;