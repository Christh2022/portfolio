import React from 'react';

const ImageFilter = ({tab}) => {
    return (
        <div className='gallery_wrapper'>
            {tab.map((value, index)=>
            <div className="image">
                <span key={index}>
                    {value.img && <img src={value.img} alt="/" />}
                    <div class='btn_gallery'><button>Voir le site</button></div>
                </span>
            </div>)}
        </div>
    );
};

export default ImageFilter;