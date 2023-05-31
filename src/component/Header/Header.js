import React, { useEffect, useState } from 'react';
import './header.css';
import {BiMenu} from 'react-icons/bi';
import { Link } from 'react-scroll';


const Header = ({active, setActive}) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {

        const handleScroll = () => {
          setIsSticky(window.scrollY > 20);
        };
    
        handleScroll(); // Appel initial pour définir l'état initial
    
        // Utilisation de setInterval pour vérifier périodiquement la position de défilement
        const interval = setInterval(handleScroll, 100);
    
        return () => {
          clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
        };
    }, [])

    const handleMobile = ()=>{
        setIsMobile(!isMobile);
        setTimeout(()=>{
            setActive(!active);
        }, 300)
    }


    return (
        <>
        <header className={isSticky && 'sticky'}>
            <h2 className='logo' >Christh.</h2>
            <div id='menu-icon' onClick={handleMobile}><BiMenu/></div>
            <nav>
                <ul className='navigation'>
                    <li className='active'>
                        <Link to='accueil' spy={true} smooth={true} offset={-75} duration={500} >Accueil</Link>
                    </li> 
                    <li>
                        <Link to='apropos' spy={true} smooth={true} offset={-75} duration={500}>A propos</Link>
                    </li>
                    <li>
                        <Link to='education' spy={true} smooth={true} offset={-75} duration={500}>Education</Link>
                    </li>
                    <li>
                        <Link to='skills' spy={true} smooth={true} offset={-75} duration={500}>Skills</Link>
                    </li>
                    <li>
                        <Link to='portfolio' spy={true} smooth={true} offset={-75} duration={500}>Portfolio</Link>
                    </li>
                    <li>
                        <Link to='contact' spy={true} smooth={true} offset={-75} duration={500}>Contact</Link>
                    </li>
                </ul>
            </nav>
            
        </header>
        <div className={`mobile ${isMobile ? 'active'  : null}`}>
            <ul className='navigation'>
                <li>
                    <Link to='accueil' spy={true} smooth={true} offset={-75} duration={500} >Accueil</Link>
                </li> 
                <li>
                    <Link to='apropos' spy={true} smooth={true} offset={-75} duration={500}>A propos</Link>
                </li>
                <li>
                    <Link to='education' spy={true} smooth={true} offset={-75} duration={500}>Education</Link>
                </li>
                <li>
                    <Link to='skills' spy={true} smooth={true} offset={-75} duration={500}>Skills</Link>
                </li>
                <li>
                    <Link to='portfolio' spy={true} smooth={true} offset={-75} duration={500}>Portfolio</Link>
                </li>
                <li>
                    <Link to='contact' spy={true} smooth={true} offset={-75} duration={500}>Contact</Link>
                </li>
            </ul>
        </div>
        </>
    );
};

export default Header;