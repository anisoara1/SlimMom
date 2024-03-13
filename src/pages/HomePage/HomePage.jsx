import { Navbar } from 'components/NavBar/NavBar';
import { IntakeCalc } from 'components/IntakeCalc/IntakeCalc';
import React from 'react';
import css from '../HomePage/HomePage.module.css';

export const HomePage = () => {
  return (
    <div className={css.home}>
      <Navbar />
      <IntakeCalc />
    </div>
  );
};
