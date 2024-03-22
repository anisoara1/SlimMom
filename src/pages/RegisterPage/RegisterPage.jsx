import { Navbar } from 'components/NavBar/NavBar';
import { Register } from 'components/Register/Register';
import React from 'react';
import css from '../HomePage/HomePage.module.css';

export const RegisterPage = () => {
  return (
    <div className={css.home}>
      <Navbar />
      <Register />
    </div>
  );
};
