import React from 'react';
import Modal from '../components/Nav/landingNav'

function Landing() {

    
    return (
        <section>
             <Modal/>
        
            
           
            <div id="loginModal" className="modal">
                <h1>login in below</h1>
            </div>
            <footer className="footer">
                <h6>made with ❥ by the MYLITICS team</h6>
            </footer>
        </section>
    );
}

function Login() {
    console.log('login')
    // return LoginModal;
}

function SignUp() {
    console.log('sign up')
}
export default Landing;