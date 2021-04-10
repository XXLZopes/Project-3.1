import React, { useState } from 'react';
import {useMutation} from '@apollo/react-hooks';
import Auth from '../../utils/Auth';
import {LOGIN_USER} from '../../utils/mutations'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser] = useMutation(LOGIN_USER);

    async function login(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!email && !password) {
            console.log('missing email or password')
            return
        }
        try {
            const response = await loginUser({variables: {email: email, password: password}});
            console.log(response);
            if (response.errors && response.data.login) {
                throw new Error('something went wrong!');
            }
            const { token, user } = response.data.login;
            // console.log(user);
            console.log('Successfully Logged In')
            Auth.login(token);
        } catch (err) {
            console.log(err);
        }

    }

    return(
        <section>
            <form onSubmit={login} className="login">
                Email: <input type="text" id='emailInput' name='emailInput'
                value={email} onChange={(e) => setEmail(e.target.value)}/>
                Password: <input type="password" id='pwInput' name='pwInput'
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
        </section>
    )
}
export default Login;
