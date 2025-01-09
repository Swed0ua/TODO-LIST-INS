import React, { useState } from 'react';
import RegistrationFormContent from './components/RegistrationFormContent';
import LoginFormContent from './components/LoginFormContent';

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  
  const [errorMessage, setErrMessage] = useState<string | null>(null)

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md min-w-96">
      <h2 className="text-2xl font-bold mb-6">{isLogin ? "Login" : "Registration"}</h2>
      {isLogin ? <LoginFormContent setErrorText={setErrMessage} /> : <RegistrationFormContent setErrorText={setErrMessage}/>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AuthForm;
