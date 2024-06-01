
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
      
      <Hero/>
      
      <Header/>

      <Footer/>

      <Register />

      <Login />
    </>
  );
}

export default App;
