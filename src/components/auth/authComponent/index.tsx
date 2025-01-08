import React, { useEffect, useState } from 'react';
import { AuthHandler } from '../../../handlers/authHandlers';
import { User } from '../../../types/userModel';
import { useDispatch } from 'react-redux';
import { checkAuth, login, logout } from '../../../store/authSlice';

const AuthComponent: React.FC = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const authHandler = new AuthHandler();

  const handleRegister = async () => {
    const user: User = { email, password, displayName:userName };
      try {
        const userCredential = await authHandler.registerUser(user);
        
          if (userCredential && userCredential.userEmail) {
              dispatch(login({ userEmail: userCredential.userEmail, displayName: userCredential.displayName }));
          } else {
              console.error('User email is null or undefined');
          }
        
    } catch (error:any) {
        console.error('Error registering user:', error.message);
      }
  };

  const handleLogin = async () => {
    const user: User = { email, password, displayName:userName};
    await authHandler.loginUser(user);
  };

  useEffect(() => {
    // Checking the authorization status when loading a component
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="User Name"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button onClick={handleRegister}>Register</button>
    
    </div>
  );
};

export default AuthComponent;
