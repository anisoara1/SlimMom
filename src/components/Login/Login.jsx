import React , { useState }  from 'react';
import css from '../IntakeCalc/IntakeCalc.module.css';
 import { useDispatch } from 'react-redux'; 
import { Box, FormControl, Typography, TextField, Button } from '@mui/material';
 import { loginUser , getCurrentUser} from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

export const Login = () => {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

const handleSubmit = async event => {
  event.preventDefault();

  setError(null);

  try {
    const loginData = await dispatch(loginUser({ email, password }));
    await dispatch(getCurrentUser()); // Get current user details including name
    const { token } = loginData.payload;

    localStorage.setItem('token', token);

    // Redirect to '/calc' and pass the token as a state
    navigate('/calc', { state: { token } });
  } catch (err) {
    console.error('Login Error:', err);
    setError(
      err.response?.data?.message || 'Login failed. Please try again.'
    );
  }
};
 
  return (
    <div className={css.intake}>
    {error && <p>Error: {error}</p>} 
      <Box
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
          Register
        </Typography>
       <form onSubmit={handleSubmit}> 
          <FormControl
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              paddingLeft: '20px',
              '@media screen and (max-width: 450px)': {
                maxWidth: '300px',
              },
            }}
          >
            <TextField
               onChange={handleChange} 
              required
              id="email"
              name="email"
               value={email} 
              variant="standard"
              placeholder="Email *"
              type="email"
              autoComplete="email"
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
            />
            <TextField
               onChange={handleChange} 
              required
              id="password"
              name="password"
               value={password} 
              variant="standard"
              placeholder="Password *"
              type="password"
              autoComplete="current-password"
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
            />
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
                style={{
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
                component={Link}
                to="/login"
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
                  Register
                </Typography>
              </Button>
            </Box>
          </FormControl>
          {error && <p style={{ color: 'red' }}>{error}</p>} 
        </form>
      </Box>
    </div>
  );
};
