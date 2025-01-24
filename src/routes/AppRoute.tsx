
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
        path: 'subjects/:subjectName',
        element: <SubjectTopics/>,
      },
      // {
      //   path: 'topic/:subjectName/:topicName',
      //   element: <Topics/>,
      // },
      {
        path: 'select-mode/:subjectName/:topicName',
        element: <SelectMode/>
      },
      {
        path: 'test-single-question/:subjectName/:topicName',
        element: <SingleQuestionTest/>
      },
      {
        path: 'test-all-questions/:subjectName/:topicName',
        element: <AllQuestionTest/>
      },
      {
        path: 'result/:subjectName/:topicName',
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