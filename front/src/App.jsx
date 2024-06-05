import { Routes, Route } from 'react-router-dom'
import {Header} from "./Header/Header";
import {Hero} from "./Hero/Hero";
import { Footer } from './Footer/footer';
import {Navbar} from "./Navbar/Navbar";
import Register from "./register/Register";
import Login from "./login/Login";


function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>
          <Route path='/' element={ 
              <>
                      <Hero/>
                      <Header/>
              </>
          } />
          <Route path='/register' element={ <Register />} />
          <Route path='/login' element={ <Login />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
