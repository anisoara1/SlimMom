import React from 'react';
import css from '../CalculatorPage/CalculatorPage.module.css';
import { Link } from 'react-router-dom';
import { Box, MenuList, Typography } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { IntakeCalc } from 'components/IntakeCalc/IntakeCalc';
import { Calculator } from 'components/Calculator/Calculator';

export const CalculatorPage = () => {
  return (
    <div className={css.calcPage}>
      <Box>
        <Box className={css.navbar}>
          <Box className={css.logo}>
            <Link to="/SlimMom">
              <Typography
                className={css.logoTitle}
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontSize: '24px',
                }}
              >
                Slim<span className={css.logoColor}>Mom</span>
              </Typography>
            </Link>
          </Box>
          <HorizontalRuleRoundedIcon
            sx={{
              marginLeft: '100px',
              fontSize: 'larger',
              transform: 'rotate(90deg)',
              color: '#21212133',
            }}
          />
          <MenuList
            sx={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              padding: '0',
            }}
          >
            <li>
              <Link to="/diary" className={css.link}>
                <Typography
                  sx={{
                    padding: '0',
                    fontWeight: '700',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: ' #9b9faa',
                  }}
                >
                  Diary
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/calc" className={css.link}>
                <Typography
                  sx={{
                    padding: '0',
                    fontWeight: '700',
                    fontSize: '14px',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: ' #9b9faa',
                  }}
                >
                  Calculator
                </Typography>
              </Link>
            </li>
          </MenuList>
        </Box>

        <IntakeCalc />
      </Box>
      <Box>
        <Calculator />
      </Box>
    </div>
  );
};
