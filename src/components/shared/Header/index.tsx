import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { AuthHandlerInstance } from "../../../handlers/authHandlers";
import { logout } from '../../../store/authSlice';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch( )

  const goToLogin = () => {
    navigate('/login');
  };

  const goToMain = () => {
    navigate('/');
  };

  const logOutHandler = async () => {
    try {
      await AuthHandlerInstance.logoutUser()
      dispatch(logout());
      goToLogin()
    } catch (error: any) {
        console.error('Unlogin error:', error.message);
    }
  }

  return (
    <header className="bg-gray-800 text-white">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div onClick={goToMain} className="text-2xl font-bold">
        To-Do App
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">
          Головна
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">
          Про нас
        </a>
        <a href="#" className="hover:text-gray-300 transition-colors duration-200">
          Контакти
        </a>
      </nav>
      
      <div>
          {isAuthenticated ?
            <button onClick={logOutHandler} className="hover:bg-slate-500 text-white font-medium py-2 px-4 rounded transition-all duration-200">LogOut</button>:
            <button onClick={goToLogin} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-all duration-200">LogIn</button> 
          }
      </div>
    </div>
    </header>
  );
};

export default Header;
