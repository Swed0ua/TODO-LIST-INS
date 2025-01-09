import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/shared/Header';
import AuthContainer from './components/auth/AuthContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { checkAuth } from './store/authSlice';
import TodosContainer from './components/todos/TodosContainer';
import WelcomeContainer from './components/welcomePage/WelcomeContainer';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="wrapper min-h-screen flex flex-col">
        <Header />
        <div className="p-4 flex-1 flex justify-center items-center">
          <Routes>
            {isAuthenticated ? (<Route path="/" element={<TodosContainer />} />) : (<Route path="/" element={<WelcomeContainer />} />)}
            <Route path="/registration" element={<AuthContainer />} />
            <Route path="/login" element={<AuthContainer />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App