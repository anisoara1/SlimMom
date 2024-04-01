import React from 'react';
import css from '../Calculator/Calculator.module.css';
import { Typography, Box, MenuList, Button } from '@mui/material';
import HorizontalRuleRoundedIcon from '@mui/icons-material/HorizontalRuleRounded';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* import { logoutUser } from '../../redux/auth/authSlice'; */

export const Calculator = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const authState = useSelector(state => state.auth);
  const handleLogout = () => {
    console.log('Logout button clicked');
    console.log('State before logout:', authState);
    dispatch(/* logoutUser() */);
    history('/SlimMom');
  };

  return (
    <div className={css.calculator}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontize: '14px',
            lineHeight: '1.4',
            textAlign: 'right',
            color: '#212121',
          }}
        >
          {}
        </Typography>
        <HorizontalRuleRoundedIcon
          sx={{
            fontSize: 'larger',
            transform: 'rotate(90deg)',
            color: '#9b9faa',
          }}
        />
        <Button onClick={handleLogout}>
          <Typography
            sx={{
              fontFamily: 'Verdana, sans-serif',
              fontWeight: '700',
              fontSize: '14px',
              letterSpacing: '0.04em',
              color: '#9b9faa',
            }}
          >
            Exit
          </Typography>
        </Button>
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontize: '26px',
            lineHeight: '1.4',
            textAlign: 'center',
            color: '#212121',
          }}
        >
          Summary for 13.08.2023
        </Typography>
        <MenuList
          sx={{
            width: '330px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <li>
            <Typography
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#9b9faa',
              }}
            >
              1. Foods you should not eat<span> kcal</span>
            </Typography>
          </li>
          <Typography
            sx={{
              fontFamily: 'Verdana, sans-serif',
              fontWeight: '400',
              fontSize: '14px',
              letterSpacing: '0.04em',
              color: '#9b9faa',
            }}
          >
            2. Consumed<span> kcal</span>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Verdana, sans-serif',
              fontWeight: '400',
              fontSize: '14px',
              letterSpacing: '0.04em',
              color: '#9b9faa',
            }}
          >
            3. Daily rate<span> kcal</span>
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Verdana, sans-serif',
              fontWeight: '400',
              fontSize: '14px',
              letterSpacing: '0.04em',
              color: '#9b9faa',
            }}
          >
            4. n% of normal<span> kcal</span>
          </Typography>
        </MenuList>
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontize: '26px',
            lineHeight: '1.4',
            textAlign: 'center',
            color: '#212121',
          }}
        >
          Food not recommended
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '400',
            fontSize: '14px',
            letterSpacing: '0.04em',
            color: '#9b9faa',
          }}
        >
          Your diet will be displayed here
        </Typography>
      </Box>
    </div>
  );
};
