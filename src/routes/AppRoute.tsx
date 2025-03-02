
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Subjects from '../pages/Subjects';
import SubjectTopics from '../pages/SubjectTopics';
import SelectMode from '../pages/SelectMode';
import Topics from '../pages/Topics';
import Test from '../pages/Test';
import Result from '../pages/Result';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';
import SingleQuestionTest from '../pages/SingleQuestionTest';
import AllQuestionTest from '../pages/AllQuestionTest';
import MainContextProvider,{MainContext} from '../contexts/MainContextProvider';
import { useContext } from 'react';

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
        path: 'test-all-questions',
        element: <AllQuestionTest/>
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
      <RouterProvider router={route}/>
    </MainContextProvider>
  )
}

export default AppRoute;