import React, { useState } from 'react';
import AuthFormBtn from '../AuthFormBtn';
import Input from '../../../../../../shared/Input';
import { InputTypes, LoginData, } from '../../../../../../../types/userModel';
import { AuthHandlerInstance } from '../../../../../../../handlers/authHandlers';
import { useDispatch } from 'react-redux';
import { login } from '../../../../../../../store/authSlice';
import { useNavigate } from 'react-router-dom';


const LoginFormContent: React.FC<AuthFormContentProps> = ({ setErrorText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user: LoginData = { email, password};
        try {
            const loginResponse = await AuthHandlerInstance.loginUser(user);
            console.log("loginResponse", loginResponse)
            if (loginResponse.success && loginResponse.data) {
                dispatch(login({ 
                    userEmail: loginResponse.data.userEmail, 
                    displayName: loginResponse.data.displayName,
                    uid: loginResponse.data.uid
                }));
                navigate('/');
            } else {
                if (loginResponse.error) {
                    setErrorText(loginResponse.error)
                }
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
