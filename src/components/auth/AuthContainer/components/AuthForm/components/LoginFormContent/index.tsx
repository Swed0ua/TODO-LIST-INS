import React, { useState } from 'react';
import AuthFormBtn from '../AuthFormBtn';
import Input from '../../../../../../shared/Input';
import { InputTypes, LoginData, } from '../../../../../../../types/userModel';
import { AuthHandlerInstance } from '../../../../../../../handlers/authHandlers';
import { useDispatch } from 'react-redux';
import { login } from '../../../../../../../store/authSlice';
import { useNavigate } from 'react-router-dom';


const LoginFormContent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: LoginData = { email, password};
        try {
            const registerResponse = await AuthHandlerInstance.loginUser(user);
            if (registerResponse) {
                dispatch(login({ 
                    userEmail: registerResponse.userEmail, 
                    displayName: registerResponse.displayName 
                }));
                navigate('/');
            }  
        } catch (error: any) {
            console.error('Registration error:', error.message);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <Input type={InputTypes.Email} label='Email' idName='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type={InputTypes.Password} label='Password' idName='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

        <AuthFormBtn txt="SingIn" />
    </form>
  );
};

export default LoginFormContent;
