import React  from 'react';
import {AiFillCalendar} from 'react-icons/ai'
import './education.css'
import { useInView } from 'react-intersection-observer';

const Education = () => {
    const { ref: title, inView: isEducation} = useInView();
    const { ref: education, inView: isEducate} = useInView();
    const { ref: box, inView: isBox} = useInView();
    const { ref: educ_box1, inView: isEducate_box1} = useInView();
    const {  ref: educ_box2, inView: isEducate_box2} = useInView();
    const { ref: experience, inView: isExpert } = useInView();
    const { ref: exp_box1, inView: isExpert_box1} = useInView();
    const {  ref: exp_box2, inView: isExpert_box2} = useInView();
    return (
        <section className={'education'} id='education'>
            <h2 ref={title} className={isEducation && 'title_show'}>Mon <span>Parcours</span></h2>
            <div className='education-row'>
                <div className='education-column'>
                    <h3 ref={education} className={isEducate ? "title left" : 'hide'}>éducation</h3>
                    <div ref={box} className={isBox ? "education-box" : 'hide'}>
                        <div ref={educ_box1} className={isEducate_box1 ? "education-content animate box1" : 'hide'}>
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
                        <div ref={educ_box2} className={isEducate_box2 ? "education-content animate box2" : 'hide'}>
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
                    <h3 ref={experience} className={isExpert ? "title right" : 'hide'}>expérience</h3>
                    <div ref={box} className={isBox ? "education-box" : 'hide'}>
                        <div ref={exp_box1} className={isExpert_box1 ? "education-content animate box1" : 'hide'}>
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
                        <div ref={exp_box2} className={isExpert_box2 ? "education-content animate box1" : 'hide'}>
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