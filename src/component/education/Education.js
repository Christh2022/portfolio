import React from 'react';
import {AiFillCalendar} from 'react-icons/ai'
import './education.css'

const Education = () => {
    return (
        <section className='education' id='education'>
            <h2>Mon <span>Parcours</span></h2>
            <div className='education-row'>
                <div className='education-column'>
                    <h3 className="title">éducation</h3>
                    <div className="education-box">
                        <div className="education-content">
                            <div className="content">
                                <div className="year"><AiFillCalendar/> 2020 - 2021</div>
                                <h3>Licence Mathématiques - Université Marien Ngouabi</h3>
                                <p>
                                    Au cours de cette formation, j'ai pu acquérir une solide 
                                    base de connaissances en mathématiques pures et appliquées. 
                                    Les cours abordent des sujets tels que l'algèbre, l'analyse, 
                                    la géométrie, la statistique et la théorie des probabilités.
                                </p>
                            </div>
                        </div>
                        <div className="education-content">
                            <div className="content">
                                <div className="year"><AiFillCalendar/> 2021 - Auj</div>
                                <h3>Bachelor Developpement web - Ecole Multimédia de paris</h3>
                                <p>
                                    Au cours de cette formation, j'ai pu acquérir une solide 
                                    base de connaissances en mathématiques pures et appliquées. 
                                    Les cours abordent des sujets tels que l'algèbre, l'analyse, 
                                    la géométrie, la statistique et la théorie des probabilités.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='education-column'>
                    <h3 className="title">expérience</h3>
                    <div className="education-box">
                        <div className="education-content">
                            <div className="content">
                                <div className="year"><AiFillCalendar/> 2021 - 2021</div>
                                <h3>Developpeur Font-End - MCS international</h3>
                                <p>
                                    Au cours de cette formation, j'ai pu acquérir une solide 
                                    base de connaissances en mathématiques pures et appliquées. 
                                    Les cours abordent des sujets tels que l'algèbre, l'analyse, 
                                    la géométrie, la statistique et la théorie des probabilités.
                                </p>
                            </div>
                        </div>
                        <div className="education-content">
                            <div className="content">
                                <div className="year"><AiFillCalendar/> 2021 - 2022</div>
                                <h3>Développeur FullStack - EASYSTUDY</h3>
                                <p>
                                    Au cours de cette formation, j'ai pu acquérir une solide 
                                    base de connaissances en mathématiques pures et appliquées. 
                                    Les cours abordent des sujets tels que l'algèbre, l'analyse, 
                                    la géométrie, la statistique et la théorie des probabilités.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;