import { Navbar } from 'components/NavBar/NavBar';
import { Login } from 'components/Login/Login';
import React from 'react';
import css from '../HomePage/HomePage.module.css';

export const LoginPage = () => {
  return (
    <div className={css.home}>
      <Navbar />
      <Login />
    </div>
  );
};
