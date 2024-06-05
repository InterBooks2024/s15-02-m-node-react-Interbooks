import { Routes, Route } from 'react-router-dom'
// import {Header} from "./Header/Header";
// import {Hero} from "./Hero/Hero";
import { Footer } from './Footer/footer';
import {Navbar} from "./Navbar/Navbar";
import Register from "./register/Register";
import Login from "./login/Login";
import Banner from './components/Banner/Banner';
import FeaturedBooks from './components/featuredBooks/FeaturedBooks';


function App() {
  return (
    <>
      <Navbar/>
      
      <Routes>
          <Route path='/' element={ 
              <>    
                      <Banner/>
                      <FeaturedBooks/>
                      {/* <Hero/>
                      <Header/> */}
              </>
          } />
          <Route path='/register' element={ <Register />} />
          <Route path='/login' element={ <Login />} />
          <Route path='/banner' element={ <Banner />} />

      </Routes>
      <Footer/>
    </>
  );
}

export default App;
