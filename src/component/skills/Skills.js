import { useInView } from "react-intersection-observer";
import "./skill.css";


const Skills = () => {
    const { ref: title, inView: myElementVisible } = useInView();
    const { ref: bar1_edduc, inView: myBarre1 } = useInView();
    const { ref: bar2_edduc, inView: myBarre2 } = useInView();
    const { ref: bar3_edduc, inView: myBarre3 } = useInView();
    const { ref: bar4_edduc, inView: myBarre4 } = useInView();
    const { ref: bar5_edduc, inView: myBarre5 } = useInView();
    const { ref: bar6_edduc, inView: myBarre6 } = useInView();
    const { ref: bar7_edduc, inView: myBarre7 } = useInView();
    const { ref: bar8_edduc, inView: myBarre8 } = useInView();
    const { ref: bar9_edduc, inView: myBarre9 } = useInView();
    const { ref: bar1_exp, inView: myBarre_exp1 } = useInView();
    const { ref: bar2_exp, inView: myBarre_exp2 } = useInView();
    const { ref: bar3_exp, inView: myBarre_exp3 } = useInView();

    return (
        <section className="skills" id="skills">
            <h2 ref={title} className={myElementVisible && "animate"}>
                Mes <span>compétences</span>
            </h2>
            <div className="skills-row">
                <div className="skills-column">
                    <h3 className="title">Compétences en code</h3>

                    <div className="skills-box">
                        <div className="skills-content">
                            <div
                                className={` progress ${myBarre1 && "animate"}`}
                                ref={bar1_edduc}
                            >
                                <h3>
                                    HTML <span>90%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre2 && "animate"}`}
                                ref={bar2_edduc}
                            >
                                <h3>
                                    CSS <span>75%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre3 && "animate"}`}
                                ref={bar3_edduc}
                            >
                                <h3>
                                    SCSS <span>70%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre4 && "animate"}`}
                                ref={bar4_edduc}
                            >
                                <h3>
                                    JAVASCRIPT <span>80%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre5 && "animate"}`}
                                ref={bar5_edduc}
                            >
                                <h3>
                                    REACT <span>75%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre6 && "animate"}`}
                                ref={bar6_edduc}
                            >
                                <h3>
                                    NODE.JS <span>65%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre7 && "animate"}`}
                                ref={bar7_edduc}
                            >
                                <h3>
                                    EXPRESS.JS <span>62%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre8 && "animate"}`}
                                ref={bar8_edduc}
                            >
                                <h3>
                                    MySQL <span>80%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${myBarre9 && "animate"}`}
                                ref={bar9_edduc}
                            >
                                <h3>
                                    PHP <span>60%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="skills-column">
                    <h3 className="title">Compétences Professional</h3>

                    <div className="skills-box">
                        <div className="skills-content">
                            <div
                                className={` progress ${
                                    myBarre_exp1 && "animate"
                                }`}
                                ref={bar1_exp}
                            >
                                <h3>
                                    Web Design <span  >60%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${
                                    myBarre_exp2 && "animate"
                                }`}
                                ref={bar2_exp}
                            >
                                <h3>
                                    Web Development <span>80%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                            <div
                                className={` progress ${
                                    myBarre_exp3 && "animate"
                                }`}
                                ref={bar3_exp}
                            >
                                <h3>
                                    Graphic Design<span>58%</span>
                                </h3>
                                <div className="bar">
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
