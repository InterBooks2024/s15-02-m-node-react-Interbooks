import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext';
import { Home } from './views/home/Home';
import { RegisterView } from './views/register/RegisterView';
import { LoginView } from './views/login/LoginView';
import { Footer, Navbar } from './components';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={ <RegisterView />} />
            <Route path='/login' element={ <LoginView />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
