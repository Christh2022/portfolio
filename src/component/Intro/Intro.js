import React, { useEffect, useState } from 'react';
import './intro.css';
import {AiFillInstagram,AiFillGithub,AiFillLinkedin} from 'react-icons/ai'

const Intro = () => {
    const [onload , setOnload] = useState(true)
    const [onload1 , setOnload1] = useState(true)
    const [onload2 , setOnload2] = useState(true)
    const [onload3 , setOnload3] = useState(true)
    const [onload4 , setOnload4] = useState(true)

    useEffect(()=>{
        onload && setTimeout(()=>{
            setOnload(false)
        }, 800);

        onload1 && setTimeout(()=>{
            setOnload1(false)
        }, 1000)

        onload2 && setTimeout(()=>{
            setOnload2(false)
        }, 1400)

        onload3 && setTimeout(()=>{
            setOnload3(false)
        }, 1400)

        onload4 && setTimeout(()=>{
            setOnload4(false)
        }, 1600)
    }, [setOnload, onload, onload1, onload2, onload3, onload4])

    return (
        <div className='home' id='accueil'>
            <div className={`home-content ${onload && 'intro'}` }>
                <h1>Hey, Je suis <span>Roldi Christh</span> </h1>
                <div className="text-nimate">
                    <h3>Développeur Web & mobile</h3>
                </div>
                <p className={onload1 && 'p_intro'}>Bienvenue sur mon portfolio ! Je suis un développeur web passionné par la 
                    création d'applications et de sites web innovants, efficaces et esthétiques. 
                </p>
                <div className={`btn-box ${onload2 && 'intro'}`}>
                    <button className="btn">M'embaucher</button>
                    <button className="btn">Discutons</button>
                </div>
            </div>
            <div class={`animation_earth ${onload3 && 'intro'}`}>
                <div className="container">
                    <div class="sun"></div>
                    <div class="earth">
                        <div class="moon"></div>
                    </div>
                </div>
            </div>
            <div className={`home-sci ${onload4 && 'intro'}`}>
                <span><AiFillLinkedin/></span>
                <span><AiFillGithub/></span>
                <span><AiFillInstagram/></span>
            </div>
        </div>
    );
};

export default Intro;