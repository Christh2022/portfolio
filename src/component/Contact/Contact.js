import React, { useState } from 'react';
import './contact.css'
import { toast } from 'react-toastify';

const Contact = () => {
    const [nom, setNom] = useState()
    const [email, setEmail] = useState()
    const [number, setNumber] = useState()
    const [object, setObject] = useState()
    const [message, setMessage] = useState()
    const sendEmail = (e)=>{
        e.preventDefault();
        if(nom && email && number && object && message ) toast.success("Votre message a été bien envoyé ")
        else toast.error("une erreur c'est produite lors de l'envoie veuillez réesayer ")
    }
    return (
        <section className='contact' id='contact'>
            <h2>Me <span>Contacter</span></h2>
            <form onSubmit={sendEmail}>
                <div className="input-box">
                    <div className="input-field">
                        <input type="text" placeholder='Nom' required onChange={(e)=>setNom(e.target.value)} />
                        <span className='focus'></span>
                    </div>
                    <div className="input-field">
                        <input type="email" placeholder='Adresse Mail' required onChange={(e)=>setEmail(e.target.value)} />
                        <span className='focus'></span>
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-field">
                        <input type="number" placeholder='Numéro de Téléphone' onChange={(e)=>setNumber(e.target.value)} required />
                        <span className='focus'></span>
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder='Objet' onChange={(e)=>setObject(e.target.value)} required />
                        <span className='focus'></span>
                    </div>
                </div>

                <div className="textarea-field">
                    <textarea cols="30" rows="10" placeholder='Votre Message' onChange={(e)=>setMessage(e.target.value)} required/>
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