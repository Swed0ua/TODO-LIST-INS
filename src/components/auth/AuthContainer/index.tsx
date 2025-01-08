import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

const AuthContainer: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
      if (isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated]);

  const isLogin = location.pathname === '/login';

  return (
    <div className="authContainer">
      <AuthForm isLogin={isLogin}/>
    </div>
  );
};

export default AuthContainer
