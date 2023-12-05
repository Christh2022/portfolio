import {AiFillCalendar} from 'react-icons/ai'
import './education.css'
import { useInView } from 'react-intersection-observer';

const Education = () => {
    const { ref: title, inView: isEducation} = useInView();
    const { ref: box_educ, inView: isBoxEduc } = useInView();
    const { ref: box_exp, inView: isBoxExp } = useInView();
    const { ref: box_educ1, inView: isBoxEduc1 } = useInView();
    const { ref: box_educ2, inView: isBoxEduc2 } = useInView();
    const { ref: box_expo1, inView: isBoxExp1 } = useInView();
    const { ref: box_expo2, inView: isBoxExp2 } = useInView();
    return (
        <section className={'education'} id='education'>
            <h2 ref={title} className={isEducation && 'title_show'}>Mon <span>Parcours</span></h2>
            <div className='education-row'>
                <div className='education-column'>
                    <h3  className={"title left"}>éducation</h3>
                    <div ref={box_educ} className={isBoxEduc ? "education-box show" : "hide"}>
                        <div  className={"education-content"}>
                            <div ref={box_educ1} className={isBoxEduc1 ? "content animate box1 educ": 'hide'}>
                                <div className="year"><AiFillCalendar/> 2020 - 2021</div>
                                <h3>Licence Mathématiques - Université Marien Ngouabi</h3>
                                <p>
                                    Au cours de cette formation, j&apos;ai pu acquérir une solide 
                                    base de connaissances en mathématiques pures et appliquées. 
                                    Les cours abordent des sujets tels que l&apos;algèbre, l&apos;analyse, 
                                    la géométrie, la statistique et la théorie des probabilités.
                                </p>
                            </div>
                        </div>
                        <div  className={ "education-content" }>
                            <div ref={box_educ2}  className={isBoxEduc2 ? "content animate box2 educ" : "hide"}>
                                <div className="year"><AiFillCalendar/> 2021 - Auj</div>
                                <h3>Bachelor Developpement web - Ecole Multimédia de paris</h3>
                                <p>
                                    Au cours de cette formation, j'ai pu acquérir une solide base de connaissances 
                                    en développement web, englobant à la fois les aspects théoriques et pratiques 
                                    de ce domaine en constante évolution.  je suis immergé dans un programme d'études 
                                    dynamique et axé sur la maîtrise 
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='education-column'>
                    <h3  className={"title right" }>expérience</h3>
                    <div ref={box_exp} className={isBoxExp ? "education-box show" : "hide"}>
                        <div  className={"education-content"}>
                            <div ref={box_expo1} className={isBoxExp1 ? "content animate box1 exp" : "hide"}>
                                <div className="year"><AiFillCalendar/> 2021 - 2021</div>
                                <h3>Developpeur Font-End - MCS international</h3>
                                <p>
                                    En tant que développeur web chez MCS International, j'ai géré la conception front-end en 
                                    utilisant HTML, CSS et JavaScript, créant des interfaces intuitives et responsives pour 
                                    améliorer l'expérience utilisateur.
                                </p>
                            </div>
                        </div>
                        <div  className={"education-content"}>
                            <div ref={box_expo2}  className={isBoxExp2 ? "content animate box1 exp" : "hide"}>
                                <div className="year"><AiFillCalendar/> 2022 - 2023</div>
                                <h3>Développeur FullStack - EASYSTUDY</h3>
                                <p>
                                    En tant que développeur chez EasyStudy, j'ai piloté simultanément le développement front-end et 
                                    back-end en utilisant des langages tels que HTML, CSS, React, Node.js et Express.js. Mon rôle 
                                    a également inclus la mise en place et la gestion du système de paiement MTN Mobile Money, 
                                    intégrant ainsi des fonctionnalités sécurisées et efficaces pour les transactions.
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