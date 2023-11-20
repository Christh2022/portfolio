import React from 'react';
import logo from '../../logo.svg'
import './abou.css'
import { useInView } from 'react-intersection-observer';

const About = () => {
    
    const { ref: title, inView: myElementVisible1} = useInView();
    const { ref: content, inView: myElementVisible2} = useInView();
    const { ref: btn, inView: myElementVisible} = useInView();
   


    return (
        <section className={ 'about' } id='apropos'>
            <h2 ref={title} className={myElementVisible1 ? "heading" : 'heading hide'}> A propos de <span>Moi</span></h2>
            <div className='about-img'>
                <img src={logo} alt="" />
                <span className="circle-spin"></span>
            </div>
            <div className="about-content">
                <h3>Développeurr Web & Mobile !</h3>
                <p ref={content} class={myElementVisible2 ? 'anime' : 'hide'}>
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
                <div ref={btn} className='btn-box box_center'>
                    <button className={myElementVisible ?  'btn btn1 anime' :"btn btn1"}>Télécharger CV</button>
                </div>
            </div>
        </section>
    );
};

export default About;