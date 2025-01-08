import React from 'react';
import RegistrationFormContent from './components/RegistrationFormContent';
import LoginFormContent from './components/LoginFormContent';

interface AuthFormProps { isLogin: boolean; }

const AuthForm: React.FC<AuthFormProps> = ({isLogin}) => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md min-w-96">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Registration"}</h2>
      {isLogin?<LoginFormContent/>:<RegistrationFormContent/>}
    </div>
  );
};

export default AuthForm;
