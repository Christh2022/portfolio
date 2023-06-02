import React from 'react';
import './contact.css'

const Contact = () => {
    return (
        <section className='contact' id='contact'>
            <h2>Me <span>Contacter</span></h2>
            <form>
                <div className="input-box">
                    <div className="input-field">
                        <input type="text" placeholder='Nom' required />
                        <span className='focus'></span>
                    </div>
                    <div className="input-field">
                        <input type="email" placeholder='Adresse Mail' required />
                        <span className='focus'></span>
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-field">
                        <input type="number" placeholder='Numéro de Téléphone' required />
                        <span className='focus'></span>
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder='Objet' required />
                        <span className='focus'></span>
                    </div>
                </div>

                <div className="textarea-field">
                    <textarea cols="30" rows="10" placeholder='Votre Message' required/>
                    <span className='focus'></span>
                </div>
                <div className="btn-box btns">
                    <button className='btn' type='submit'>Envoyez</button>
                </div>
            </form>
        </section>
    );
};

export default Contact;