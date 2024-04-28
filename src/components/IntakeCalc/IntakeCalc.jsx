import React, { useState } from 'react';
import css from '../IntakeCalc/IntakeCalc.module.css';
import { useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
} from '@mui/material';
import { IntakeModal } from 'components/Modal/Modal';
import {
  updateUser,
  fetchGetProducts,
  getName,
} from '../../redux/auth/authSlice';

export const IntakeCalc = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    height: '',
    age: '',
    currentWeight: '',
    desiredWeight: '',
    bloodType: '',
  });

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeRadio = e => {
    setFormData({ ...formData, bloodType: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(updateUser(formData));

    await dispatch(fetchGetProducts());
    await dispatch(getName());
    setOpen(false);
    setFormData({
      height: '',
      age: '',
      currentWeight: '',
      desiredWeight: '',
      bloodType: '',
    });
  };

  return (
    <form className={css.intake} onSubmit={handleSubmit}>
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-evenly',
          gap: '15px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontSize: '34px',
            lineHeight: '1.4',
            color: '#212121',
            marginRight: '10px',
          }}
        >
          Calculate your daily calorie <br /> intake right now
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '30px',
          }}
        >
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
                onChange={handleChange}
                variant="standard"
                placeholder="Height *"
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
                value={formData.height}
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
                onChange={handleChange}
                variant="standard"
                placeholder="Age *"
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
                name="age"
                disableunderline="true"
                value={formData.age}
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
                onChange={handleChange}
                variant="standard"
                placeholder="Current weight *"
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
                name="currentWeight"
                disableunderline="true"
                value={formData.currentWeight}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: '40px',
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
                onChange={handleChange}
                variant="standard"
                placeholder="Desired weight *"
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
                name="desiredWeight"
                disableunderline="true"
                value={formData.desiredWeight}
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
                onChange={handleChangeRadio}
                variant="standard"
                placeholder="Blood type *"
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
                aria-labelledby="demo-radio-buttons-group-label"
                name="bloodType"
                value={formData.bloodType}
              />

              <RadioGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyItems: 'flex-start',
                  gap: '10px',
                }}
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChangeRadio}
              >
                <FormControlLabel
                  value="1"
                  control={
                    <Radio
                      sx={{
                        color: '#E0E0E0',
                        '&.Mui-checked': {
                          color: '#fc842d',
                        },
                        padding: '5px',
                        fontSize: 'smaller',
                      }}
                    />
                  }
                  label={<Typography sx={{ color: '#9B9FAA' }}>1</Typography>}
                />
                <FormControlLabel
                  value="2"
                  control={
                    <Radio
                      sx={{
                        color: '#E0E0E0',
                        '&.Mui-checked': {
                          color: '#fc842d',
                        },
                        padding: '5px',
                        fontSize: 'smaller',
                      }}
                    />
                  }
                  label={<Typography sx={{ color: '#9B9FAA' }}>2</Typography>}
                />
                <FormControlLabel
                  value="3"
                  control={
                    <Radio
                      sx={{
                        color: '#E0E0E0',
                        '&.Mui-checked': {
                          color: '#fc842d',
                        },
                        padding: '5px',
                        fontSize: 'smaller',
                      }}
                    />
                  }
                  label={<Typography sx={{ color: '#9B9FAA' }}>3</Typography>}
                />
                <FormControlLabel
                  value="4"
                  control={
                    <Radio
                      sx={{
                        color: '#E0E0E0',
                        '&.Mui-checked': {
                          color: '#fc842d',
                        },
                        padding: '5px',
                        fontSize: 'smaller',
                      }}
                    />
                  }
                  label={<Typography sx={{ color: '#9B9FAA' }}>4</Typography>}
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Button
          type="submit"
          onClick={handleOpen}
          sx={{
            boxShadow: '0 4px 10px 0 rgba(252, 132, 45, 0.5)',
            background: ' #fc842d',
            borderRadius: '30px',
            width: '210px',
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
            Start losing weight
          </Typography>
        </Button>
        <IntakeModal open={open} handleClose={() => setOpen(false)} />
      </Box>
    </form>
  );
};
