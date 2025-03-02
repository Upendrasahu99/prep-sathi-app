import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Subjects from '../pages/Subjects';
import Test from '../pages/Test';
import Result from '../pages/Result';
import OneByOneTest from '../pages/OneByOneTest';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import MainContextProvider from '../contexts/MainContextProvider';

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
    <MainContextProvider>
      <RouterProvider router={route} />
    </MainContextProvider>
  );
};

export default AppRoute;