import React from 'react';
import './contact.css'

const Contact = () => {
    return (
        <section class='contact' id='contact'>
            <h2>Me <span>Contacter</span></h2>
            <form>
                <div class="input-box">
                    <div class="input-field">
                        <input type="text" placeholder='Nom' required />
                        <span class='focus'></span>
                    </div>
                    <div class="input-field">
                        <input type="email" placeholder='Adresse Mail' required />
                        <span class='focus'></span>
                    </div>
                </div>

                <div class="input-box">
                    <div class="input-field">
                        <input type="number" placeholder='Numéro de Téléphone' required />
                        <span class='focus'></span>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder='Objet' required />
                        <span class='focus'></span>
                    </div>
                </div>

                <div class="textarea-field">
                    <textarea cols="30" rows="10" placeholder='Votre Message' required/>
                    <span class='focus'></span>
                </div>
                <div class="btn-box btns">
                    <button class='btn' type='submit'>Envoyez</button>
                </div>
            </form>
        </section>
    );
};

export default Contact;