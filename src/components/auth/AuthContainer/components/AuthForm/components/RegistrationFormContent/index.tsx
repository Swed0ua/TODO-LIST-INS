import React, { useState } from 'react';
import AuthFormBtn from '../AuthFormBtn';
import Input from '../../../../../../shared/Input';
import { InputTypes, User } from '../../../../../../../types/userModel';
import { AuthHandlerInstance } from '../../../../../../../handlers/authHandlers';
import { useDispatch } from 'react-redux';
import { login } from '../../../../../../../store/authSlice';
import { useNavigate } from 'react-router-dom';


const RegistrationFormContent: React.FC<AuthFormContentProps> = ({ setErrorText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const user: User = { email, password, displayName: userName };
      try {
          const registerResponse = await AuthHandlerInstance.registerUser(user);
          if (registerResponse.success && registerResponse.data) {
              dispatch(login({ 
                  userEmail: registerResponse.data.userEmail, 
                  displayName: registerResponse.data.displayName,
                  uid: registerResponse.data.uid
              }));
              navigate('/');
          } else {
              if (registerResponse.error) {
                  setErrorText(registerResponse.error)
              }
          } 
      } catch (error: any) {
          console.error('Registration error:', error.message);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
        <Input type={InputTypes.Text} label='Name' idName='name' value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <Input type={InputTypes.Email} label='Email' idName='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input type={InputTypes.Password} label='Password' idName='password' value={password} onChange={(e) => setPassword(e.target.value)}/>

        <AuthFormBtn txt="Registration" />
    </form>
  );
};

export default RegistrationFormContent;