import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/store";
import { AuthHandlerInstance } from "../../../handlers/authHandlers";
import { logout } from '../../../store/authSlice';
import MainBtn from "../MainBtn";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const displayName = useSelector((state: RootState) => state.auth.user?.displayName);
  const userEmail = useSelector((state: RootState) => state.auth.user?.userEmail);
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
          {isAuthenticated &&
            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
              {displayName ? displayName : "user"} <span className="text-blue-400">[ {userEmail} ] </span>
            </a>
          }
      </nav>
      
      <div>
          {isAuthenticated ?
            <MainBtn onClick={logOutHandler} addClassName="bg-transparent hover:bg-slate-500">LogOut</MainBtn>:
            <MainBtn onClick={goToLogin}>LogIn</MainBtn> 
          }
      </div>
    </div>
    </header>
  );
};

export default Header;
