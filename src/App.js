import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Gallery from './pages/Gallery';
import img1 from './assets/1.png';
import img2 from './assets/2.jpg';
import img3 from './assets/3.webp';
import img4 from './assets/4.webp';
import img5 from './assets/5.jpg';
import img6 from './assets/6.webp';
import img7 from './assets/7.jpg';
import img8 from './assets/8.jpg';
import img9 from './assets/9.jpg';
import img10 from './assets/10.jpg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [active, setActive] =  useState(false);
  return (
    <div>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home active={active} setActive={setActive} img1={img1} img2={img2} img3={img3} img4={img4} img5={img5} img6={img6} img7={img7} img8={img8} img9={img9} img10={img10}/>}/>
          <Route path='/portfolio' element={<Gallery active={active} setActive={setActive} img1={img1} img2={img2} img3={img3} img4={img4} img5={img5} img6={img6} img7={img7} img8={img8} img9={img9} img10={img10}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
