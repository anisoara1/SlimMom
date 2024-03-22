import React /*  ,{ useState } */ from 'react';
import css from '../IntakeCalc/IntakeCalc.module.css';
import { Box, FormControl, Typography, TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
/* import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
 */
export const Login = () => {
  /* const dispatch = useDispatch();
  const history = useNavigate();

  const [error, setError] = useState(null);
  const handleLogin = async formData => {
    try {
      await dispatch(loginUser(formData));

      history.push('/calc');
    } catch (error) {
      setError(error.message);
    }
  };
 */
  return (
    <div className={css.intake}>
      {/*  {error && <p>Error: {error}</p>} */}
      <Box
        /* onSubmit={handleLogin} */
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        <Typography
          sx={{
            paddingLeft: '20px',
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontSize: '14px',
            lineHeight: '0.4',
            textTransform: 'uppercase',
            color: '#FC842D',
          }}
        >
          Log In
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            paddingLeft: '20px',
          }}
        >
          <FormControl
            sx={{
              '@media screen and (max-width: 450px)': {
                maxWidth: '300px',
              },
            }}
          >
            <TextField
              variant="standard"
              placeholder="Email *"
              autoComplete="off"
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#9b9faa',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                },
              }}
              name="height"
              disableunderline="true"
            />
          </FormControl>
          <FormControl
            sx={{
              '@media screen and (max-width: 450px)': {
                maxWidth: '300px',
              },
            }}
          >
            <TextField
              variant="standard"
              placeholder="Password *"
              autoComplete="off"
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#9B9FAA',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                },
              }}
              name="age"
              disableunderline="true"
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            paddingLeft: '20px',
          }}
        >
          <Button
            type="submit"
            sx={{
              boxShadow: '0 4px 10px 0 rgba(252, 132, 45, 0.5)',
              background: ' #fc842d',
              borderRadius: '30px',
              width: '181px',
              height: '43px',
              '&:hover': {
                backgroundColor: '#fc842d',
              },
              '&:active': {
                backgroundColor: '#fc842d',
              },
            }}
          >
            <Typography
              sx={{
                textTransform: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: ' 700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              Log in
            </Typography>
          </Button>
          <Button
            sx={{
              boxShadow: '0 4px 10px 0 rgba(252, 132, 45, 0.5)',
              background: ' #fc842d',
              borderRadius: '30px',
              width: '181px',
              height: '43px',
              '&:hover': {
                backgroundColor: '#fc842d',
              },
              '&:active': {
                backgroundColor: '#fc842d',
              },
            }}
          >
            <Typography
              sx={{
                textTransform: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: ' 700',
                fontSize: '14px',
                letterSpacing: '0.04em',
                textAlign: 'center',
                color: '#fff',
              }}
              component={Link}
              to="/register"
            >
              Register
            </Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};
