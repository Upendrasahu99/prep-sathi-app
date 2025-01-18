
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SelectTestMode from '../pages/SelectTestMode';
import TestPage from '../pages/TestPage';
import Result from '../pages/Result';
import Topic from '../pages/Topic';

const route = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" />, // Redirect root to /dashboard
  },
  {
    path: '/dashboard',
    element: <Dashboard/>,
    children: [
      {
        path: ':topic',
        element: <Topic/>,
        children:[
          {
            path: 'select-mode',
            element: <SelectTestMode/>
          },
          {
            path:'test',
            element: <TestPage/>
          },
          {
            path: 'result',
            element: <Result/>
          }
        ]
      }
    ]
  },
])

const AppRoute = () => {
  return (
    <RouterProvider router={route}/>
  )
}

export default AppRoute