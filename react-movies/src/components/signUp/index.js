import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const { login } = useContext(AuthContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',},
                body: JSON.stringify({ username, password }),
            });

   
const data = await response.json();
        if (response.ok) {
            const loginResponse = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',},
                    body: JSON.stringify({ username, password }),
                });

                const loginData = await loginResponse.json();

                if (loginResponse.ok) {
                    login(loginData.token);
                    history.push('/'); 
                } else {
                    setError(loginData.msg || 'login failed after registration.');}
            } else {
                setError(data.msg || 'Registration failed.');
            }
        } catch (err) {
            setError('error occurred. try again.');}
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={onChange}
                        required/></div>
                
                <div><label htmlFor="password">Password:</label> <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>);
};

export default Signup;