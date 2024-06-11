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
import { ProfileProvider } from './context/ProfileContext';


function App() {
  return (
    <UserProvider>
      <BookProvider>
        <ProfileProvider>
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
          </ProfileProvider>
      </BookProvider>
    </UserProvider>
  );
}

export default App;
