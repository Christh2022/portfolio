import React from 'react';
import './skill.css'

const Skills = () => {
    return (
        <section className='skills' id='skills'>
            <h2>My <span>Skills</span></h2>
            <div className="skills-row">
                <div className="skills-column">
                    <h3 className="title">Coding Skills</h3>

                    <div className="skills-box">
                        <div className="skills-content">
                            <div className="progress">
                                <h3>HTML <span>90%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>CSS <span>75%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>SCSS <span>70%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>JAVASCRIPT <span>80%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>REACT <span>75%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>NODE.JS <span>65%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>EXPRESS.JS <span>62%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>MySQL <span>80%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>PHP <span>60%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="skills-column">
                    <h3 className="title">Professional Skills</h3>

                    <div className="skills-box">
                        <div className="skills-content">
                            <div className="progress">
                                <h3>Web Design <span>60%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>Web Development <span>80%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                            <div className="progress">
                                <h3>Graphic Design<span>58%</span></h3>
                                <div className="bar"><span></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;