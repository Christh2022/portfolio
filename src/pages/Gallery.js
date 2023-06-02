import React, { useEffect, useState } from 'react';
import Header from '../component/Header/Header';
import Galleries from '../component/gallery/Galleries';
import Footer from '../component/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Gallery = ({active, setActive, img1,img2,img3,img4,img5,img6,img7,img8,img9,img10}) => {
    const [isGallery, setisGallery] = useState(true)
    useEffect(()=>{
        setisGallery(true)
    }, [])
    const navigate = useNavigate()
    const handleBack = ()=>{
        navigate('/')
    }
    return (
        <div className={active? 'unscroll' : undefined}>
            <section className='container gallery'>
                <div className="container-wrapper">
                    <Header active={active} setActive={setActive}/>
                    <Galleries img1={img1} img2={img2} img3={img3} img4={img4} img5={img5} img6={img6} img7={img7} img8={img8} img9={img9} img10={img10}/>
                </div>
                <button className='back' onClick={handleBack}>Retour</button>
            </section>
            <Footer isGallery={isGallery}/>
            <div className={active ? 'blur' : null}></div>
        </div>
    );
};

export default Gallery;