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

        const time = (a)=>{
            if(a === 0) return 800
            if(a === 1) return 1000; 
            if(a === 2 || a === 3) return 1000 + (( 2*a === 6 || 3*a === 6)  - 2)*100 
            if(a === 4) return 1000 + (a -1)*200 
        }

        for(let i = 0; i<5; ++i){
           ( onload+i) && setTimeout(()=>{
                if(i === 0) setOnload(false)
                if(i === 1) setOnload1(false)
                if(i === 2) setOnload2(false)
                if(i === 3) setOnload3(false)
                if(i === 4) setOnload4(false)
            }, time(i)); 
        }
        
    }, [setOnload, onload]);
    

    return (
        <div className='home' id='accueil'>
            <div className={`home-content ${onload ? 'intro' : undefined}` }>
                <h1>Hey, Je suis <span>Roldi Christh</span> </h1>
                <div className="text-nimate">
                    <h3>Développeur Web & mobile</h3>
                </div>
                <p className={onload1 ? 'p_intro' : undefined}>Bienvenue sur mon portfolio ! Je suis un développeur web passionné par la 
                    création d'applications et de sites web innovants, efficaces et esthétiques. 
                </p>
                <div className={`btn-box ${onload2 ? 'intro' : undefined}`}>
                    <button className="btn">M'embaucher</button>
                    <button className="btn">Discutons</button>
                </div>
            </div>
            <div className={`animation_earth ${onload3 ? 'intro' : undefined}`}>
                <div className="container">
                    <div className="sun"></div>
                    <div className="earth">
                        <div className="moon"></div>
                    </div>
                </div>
            </div>
            <div className={`home-sci ${onload4 ? 'intro' : undefined}`}>
                <span><AiFillLinkedin/></span>
                <span><AiFillGithub/></span>
                <span><AiFillInstagram/></span>
            </div>
        </div>
    );
};

export default Intro;