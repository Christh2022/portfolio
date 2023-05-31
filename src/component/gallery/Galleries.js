import React, { useEffect, useState } from 'react';
import './galleries.css';
import ImageFilter from './Image_Filter';

const Galleries = ({img1,img2,img3,img4,img5,img6,img7,img8,img9,img10}) => {
    const [list, setList] = useState([
        {img: img1,description :'frontend'}, 
        {img: img2,description :'jeux'},
        {img: img3,description :'jeux'},
        {img: img4,description :'backend'},
        {img: img5,description :'frontend'},
        {img: img6,description :'jeux'},
        {img: img7,description :'jeux'},
        {img: img8,description :'framework'},
        {img: img9,description :'jeux'},
        {img: img10,description :'jeux'}
    ])
    const [tab, setTab] = useState([...list])
    useEffect(()=>{
        console.log(setList);
    }, [])


    const All = ()=> setTab([...list])
    const Framework = () => {
        const newTab = list.filter(el =>  el.description.toLowerCase().indexOf('framework'.toLowerCase()) !== -1)
        setTab([...newTab])
    }
    const frontEnd = () =>{
        const newTab = list.filter(el =>  el.description.toLowerCase().indexOf('frontend'.toLowerCase()) !== -1)
        setTab([...newTab])
    }

    const BackEnd = () => {
        const newTab =  list.filter(el =>  el.description.toLowerCase().indexOf('backend'.toLowerCase()) !== -1)
        setTab([...newTab]);
    }
    const Game = () => {
        const newTab = list.filter(el =>  el.description.toLowerCase().indexOf('jeux'.toLowerCase()) !== -1)
        setTab([...newTab]);
    }
    return (
        <div className="wrapper">
            <div className="wrapper_content_nav">
                <div className="items">
                    <span className="item active" onClick={All}>Tout</span>
                    <span className="item" onClick={Framework}>Framework</span>
                    <span className="item" onClick={frontEnd}>Font-End</span>
                    <span className="item" onClick={BackEnd}>Back-End</span>
                    <span className="item" onClick={Game}>jeux</span>
                </div>
            </div>
            <ImageFilter tab={tab} setTab={setTab}/>
        </div>
    );
};

export default Galleries;