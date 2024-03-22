import React from 'react';
import css from '../Diary/Diary.module.css';
import {
  Typography,
  Box,
  /* Button, */ List,
  Fab,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
/* import CloseRoundedIcon from '@mui/icons-material/CloseRounded'; */

export const Diary = () => {
  return (
    <div className={css.diary}>
      <Box
        sx={{
          padding: '40px 0 0 20px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontSize: '34px',
            textAlign: 'center',
            color: '#212121',
          }}
        >
          13.08.2023
        </Typography>
        <DateRangeIcon sx={{ color: '#9B9FAA', fontSize: 'medium' }} />
      </Box>
      <Box
        sx={{
          paddingLeft: '20px',
          display: 'flex',
          flexDirection: 'row',
          gap: '60px',
          alignItems: 'center',
          justifyContent: 'flex-start',
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
            placeholder="Enter product name"
            autoComplete="off"
            sx={{
              maxWidth: '200px',
              fontFamily: 'Verdana, sans-serif',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '0.4',
              textAlign: 'center',
              color: '#9B9FAA',

              '& .MuiInput-underline:before': {
                borderBottomColor: '#9B9FAA',
                maxWidth: '200px',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#9B9FAA',
                maxWidth: '200px',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#FC842D',
                maxWidth: '200px',
              },
            }}
            name="product"
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
            placeholder="Grams"
            autoComplete="off"
            sx={{
              maxWidth: '70px',
              fontFamily: 'Verdana, sans-serif',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '0.4',
              textAlign: 'end',
              color: '#9B9FAA',

              '& .MuiInput-underline:before': {
                borderBottomColor: '#9B9FAA',
                maxWidth: '70px',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#9B9FAA',
                maxWidth: '70px',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#FC842D',
                maxWidth: '70px',
              },
            }}
            name="grams"
            disableunderline="true"
          />
        </FormControl>
        <Fab
          size="small"
          className={css.mediaBtn}
          sx={{
            bgcolor: '#FC842D',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: '#FC842D',
              color: '#FFFFFF',
            },
          }}
        >
          <AddIcon fontSize="smaller" />
        </Fab>
      </Box>
      <Box
        sx={{
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '50px',
            background:
              'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1)) 80%',
            zIndex: 1,
          },
        }}
      >
        <List
          className={css.box}
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            overflow: 'auto',
            maxHeight: 220,
            position: 'relative',
            '&::-webkit-scrollbar': {
              width: '7px',
              backgroundColor: '#F0F1F3',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#264061',
              borderRadius: '10px',
            },
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => (
            <ListItem key={`item-${item}`}>
              <ListItemText primary={`Item ${item}`} />
            </ListItem>
          ))}
          {/*
          <li className={css.list}>
            <Typography
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#212121',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              product
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#212121',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              100g{' '}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#212121',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              ...kcal
            </Typography>
            <Button
              sx={{
                minWidth: 0,
                padding: 0,
                borderRadius: '50% ',
                width: '20px',
                height: '20px',
              }}
            >
              <CloseRoundedIcon sx={{ width: '18px', color: '#9B9FAA' }} />
            </Button>
          </li> */}
        </List>
      </Box>
    </div>
  );
};
