
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Subjects from '../pages/Subjects';
import Test from '../pages/Test';
import Result from '../pages/Result';
import OneByOneTest from '../pages/OneByOneTest';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />, // Catch errors simply
    children: [
      {
        index: true,
        element: <Subjects />
      },
      {
        path: 'test',
        element: <Test />
      },
      {
        path: 'test-one-by-one',
        element: <OneByOneTest/>
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