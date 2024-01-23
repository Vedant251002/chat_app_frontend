import './App.css';
import Login from './login';
import Main from './main';
import Chat from './chat'
import {Navigate, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {checkAuth, checkLogin} from './token'
const router = createBrowserRouter([
  {
    path : '/',
    element : <Navigate to='/login' />
  },
  {path : '/login',
  element : <Login />,
  loader: checkLogin
  },
  {
    path : '/home',
    element : <Main />,
    loader:checkAuth,
    children : [{
      path : '/home/:id',
      element : <Chat />
    }]
  }
])

function App() {
  return(
        <RouterProvider router={router}/>
    )
}

export default App;
