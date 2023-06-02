import React from 'react';
import Header from '../component/Header/Header';
import Intro from '../component/Intro/Intro';
import '../component/style.css'
import About from '../component/About/About';
import Education from '../component/education/Education';
import Skills from '../component/skills/Skills';
import Portfolio from '../component/Portfolio/Portfolio';
import Contact from '../component/Contact/Contact';
import Footer from '../component/Footer/Footer';

const Home = ({active, setActive, img1,img2,img3,img4,img5,img6,img7,img8,img9,img10}) => {
    return (
        <div className={active? 'unscroll' : null}>
            <section className='container'>
                <div className="container-wrapper">
                    <Header active={active} setActive={setActive}/>
                    <Intro/>
                </div>
            </section>
            <About/>
            <Education/>
            <Skills/>
            <Portfolio img1={img1} img2={img2} img3={img3} img4={img4} img5={img5} img6={img6} img7={img7} img8={img8} img9={img9} img10={img10}/>
            <Contact/>
            <Footer/>
            <div className={active ? 'blur' : undefined}></div>
        </div>
    );
};

export default Home;