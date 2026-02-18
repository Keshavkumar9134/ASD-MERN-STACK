import { BrowserRouter,Routes,Route } from 'react-router-dom';

import './App.css'
import Header from "./components/Header";
import Navbardata from "./components/Navbardata";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Service from './components/Service';
const App = ()=>{
  //here will be logic
  let name = 'virat kohli'
  let number = 1;


  return <>
  {/* ---here will be html code---  */}

  {/* <div>
    {name} is world no {number} cricketer.
  </div> */}

  {/* <div>
    <Header/>
    <Navbardata/>
  </div> */}

    <BrowserRouter>
    <Header/>
    <Navbardata/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About name="jwt vtk" location="Kolkata"/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/service' element={<Service/>}></Route>

    </Routes>
    </BrowserRouter>


  </>
}

export default App;