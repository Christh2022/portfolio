import React from 'react';
import {AiOutlineArrowUp} from 'react-icons/ai';
import './footer.css'
import { Link } from 'react-scroll';

const Footer = ({isGallery}) => {
    return (
        <footer className={`footer ${isGallery  && 'gallery'}`}>
            <div className="footer-text">
                <p>copyright &copy; 2023 par Christh Mampassi | Tous les droits Reservés </p>
            </div>

            <div className={`footer-icon ${isGallery  && 'gallery'}`}>
                <span>
                    <Link to='accueil' spy={true} smooth={true} offset={-75} duration={500}><AiOutlineArrowUp className='f-icon'/></Link>
                </span>
            </div>
        </footer>
    );
};

export default Footer;