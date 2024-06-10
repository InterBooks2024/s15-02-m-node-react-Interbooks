import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import { Home } from './views/home/Home';
import { RegisterView } from './views/register/RegisterView';
import { LoginView } from './views/login/LoginView';
import { Footer, Navbar } from './components';
import { BookProvider } from './context/BookContext';
import { NewBook } from './views/new-book/NewBook';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Profile } from './components/profile/Profile';


function App() {
  return (
    <UserProvider>
      <BookProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/register' element={ <RegisterView />} />
              <Route path='/new-book' element={
                <ProtectedRoute>
                  <NewBook/>
                </ProtectedRoute> 
              }/>
              <Route path='/profile/*' element={
                <ProtectedRoute>
                  <Profile/>
                </ProtectedRoute> 
              }/>
              <Route path='/login' element={ <LoginView />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </BookProvider>
    </UserProvider>
  );
}

export default App;
