
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Subjects from '../pages/Subjects';
import SubjectTopics from '../pages/SubjectTopics';
import SelectMode from '../pages/SelectMode';
import Topic from '../pages/Topic';
import Test from '../pages/Test';
import Result from '../pages/Result';
import MainLayout from '../layouts/MainLayout';
import NotFound from '../pages/NotFound';


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
        path: ':subjectName',
        element: <SubjectTopics/>,
        children: [
          {
            path: ':topicName',
            element: <Topic/>,
            children:[
              {
                path: 'select-mode',
                element: <SelectMode/>
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
          }
        ]
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