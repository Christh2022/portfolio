import React from 'react';

const ImageFilter = ({tab}) => {
    const seeWebsite = (url)=>{
        if(url !=='') window.open(url, "_blank")
    }
    return (
        <div className='gallery_wrapper'>
            {tab.map((value, index)=>
            <div className="image">
                <span key={index}>
                    {value.img && <img src={value.img} alt="/" />}
                    <div className='btn_gallery'><button onClick={()=>seeWebsite(value.url)}>Voir le site</button></div>
                </span>
            </div>)}
        </div>
    );
};

export default ImageFilter;