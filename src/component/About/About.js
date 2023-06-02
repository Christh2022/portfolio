import React, { useEffect, useState } from 'react';
import logo from '../../logo.svg'
import './abou.css'

const About = () => {
    const [isAbout, setIsAbout] = useState(false);
    useEffect(()=>{
        const handleScroll = ()=>{
            setIsAbout(window.scrollY > window.innerHeight - 580)
        }

        //Appel initial pour définir l'état initial
        handleScroll()
        console.log(window.scrollY > 2*window.innerHeight);
        //utilisation de setInterval pour vérifier périodiquement la position de défilement
        const interval = setInterval(handleScroll, 100)

        return ()=>{
            //Nettoyage de l'interval lors du démontage du composant
            clearTimeout(interval)
        }
    }, [])
    return (
        <section className={isAbout ? 'about anime' : 'about'} id='apropos'>
            <h2 className="heading"> A propos de <span>Moi</span></h2>
            <div className='about-img'>
                <img src={logo} alt="" />
                <span className="circle-spin"></span>
            </div>
            <div className="about-content">
                <h3>Développeurr Web & Mobile !</h3>
                <p>
                    Actuellement en 2e année, je suis un étudiant passionné par le développement web 
                    et mobile. j'ai choisi ce domaine en raison de mon intérêt pour les technologies 
                    de l'information et la manière dont elles peuvent être utilisées pour résoudre 
                    des problèmes et améliorer la vie des gens. je suis constamment à la recherche 
                    de nouvelles compétences et de nouvelles technologies à apprendre, et je suis 
                    motivé à travailler dur pour atteindre mes objectifs. je suis également capable 
                    de travailler en équipe et de collaborer efficacement avec les autres pour créer 
                    des solutions innovantes. En tant qu'étudiant en développement web et mobile, 
                    je suis bien équipé pour réussir dans un monde numérique en constante évolution.
                </p>
                <div className='btn-box box_center'>
                    <button className="btn btn1">Télécharger CV</button>
                </div>
            </div>
        </section>
    );
};

export default About;