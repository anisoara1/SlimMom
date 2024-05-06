import React, { useState } from 'react';
import css from '../Diary/Diary.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import {
  /* Typography, */
  Box,
  List,
  Fab,
  FormControl,
  TextField,
  MenuList,
  Autocomplete,
  /*  Button, */
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  saveProductData,
  /* clearMyProducts, */
  removeProduct,
} from '../../redux/myProducts/myProductsSlice';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const Diary = () => {
  const dispatch = useDispatch();
  const authState = useSelector(state => state.auth);
  const user = authState.user && authState.user.data;
  console.log('userState:', user);
  const allowedProductsAll = user?.infouser?.allowedProductsAll;

  const myProductsState = useSelector(state => state.myproducts);
  const dates = myProductsState.products && myProductsState.products.dates;
  const addProducts = dates ? dates.flatMap(date => date.products) : [];
  console.log('myProductsState:', myProductsState);
  console.log('addProducts:', addProducts);

  const currentDate = dayjs();
  console.log('currentDate:', currentDate);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  console.log('selectedDate:', selectedDate);

  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(saveProductData(formData));
    setFormData({ product: '', quantity: '' });
  };

  /*   const handleClearMyProducts = () => {
    dispatch(clearMyProducts());
  }; */

  const handleRemoveProduct = productId => {
    dispatch(removeProduct(productId));
  };

  const handleChangeDate = date => {
    setSelectedDate(date);
  };

  const selectedDateProducts =
    myProductsState.products && myProductsState.products.dates
      ? myProductsState.products.dates.find(date =>
          dayjs(date.date).isSame(selectedDate, 'day')
        )
      : null;

  const filteredProducts = selectedDateProducts
    ? selectedDateProducts.products
    : [];

  console.log(' filteredProducts:', filteredProducts);
  return (
    <div className={css.diary}>
      {/*     <Button
        sx={{
          width: '100px',
          fontSize: 'smaller',
          textTransform: 'lowercase',
          borderRadius: ' 50%',
          border: '1px solid #212121',

          color: '#212121',
        }}
        onClick={handleClearMyProducts}
      >
        Clear My Products State
      </Button> */}
      <Box
        sx={{
          padding: '40px 0 0 20px',
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          marginBottom: '-50px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            slotProps={{
              textField: {
                variant: 'standard',
                InputProps: { disableUnderline: true },
              },
            }}
            format="DD.MM.YYYY"
            value={selectedDate}
            onChange={handleChangeDate}
            sx={{
              width: '428px',
              '& input::placeholder': {
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '34px',
                textAlign: 'center',
                color: '#121212',
              },
              '& .MuiFormControl-root-MuiTextField-root': {
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '34px',
                textAlign: 'center',
                color: '#121212',
              },
              '& .MuiInputBase-root': {
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '34px',
                textAlign: 'center',
                color: '#121212',
              },
              '& .MuiTextField-root': {
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '700',
                fontSize: '34px',
                textAlign: 'center',
                color: '#121212',
              },
              '& .MuiSvgIcon-root': {
                fill: '#9B9FAA',
                fontSize: 'small',
              },
            }}
          />
        </LocalizationProvider>
      </Box>

      <MenuList
        sx={{
          padding: '0 20px 0 20px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '-30px',
          width: '680px',
        }}
      >
        <li>
          <Autocomplete
            id="products"
            sx={{
              width: '380px',
            }}
            options={allowedProductsAll}
            autoHighlight
            getOptionLabel={option =>
              option && option.title ? option.title : ''
            }
            onChange={(event, newValue) =>
              setFormData({
                ...formData,
                product: newValue ? newValue.title : '',
              })
            }
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: '#9B9FAA',
                  lineHeight: '0.4',
                }}
                {...props}
              >
                {option.title}
              </Box>
            )}
            renderInput={params => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Enter product name"
                autoComplete="off"
                sx={{
                  width: '428px',
                  '& input::placeholder': {
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#9B9FAA',
                    lineHeight: '0.4',
                  },

                  '& .MuiInput-underline:before': {
                    borderBottomColor: '#9B9FAA',
                    maxWidth: '428px',
                  },
                  '& .MuiSvgIcon-root': {
                    fill: '#9B9FAA',
                    fontSize: 'small',
                  },

                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                    borderBottomColor: '#9B9FAA',
                    maxWidth: '428px',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#FC842D',
                    maxWidth: '428px',
                  },
                }}
                disableunderline="true"
                inputProps={{
                  style: {
                    stoke: '#9B9FAA',
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: '700',
                    fontSize: '14px',
                    color: '#9B9FAA',
                    lineHeight: '0.4',
                  },
                  ...params.inputProps,
                  autoComplete: 'new-password',
                }}
              />
            )}
          />
        </li>
        <li className={css.gramsList}>
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
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              InputProps={{
                style: {
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: '#9B9FAA',
                  lineHeight: '0.4',
                },
              }}
              sx={{
                '& input::placeholder': {
                  fontFamily: 'Verdana, sans-serif',
                  fontWeight: '700',
                  fontSize: '14px',
                  color: '#9B9FAA',
                  lineHeight: '0.4',
                },
                maxWidth: '100px',
                direction: 'rtl',
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#9B9FAA',
                  maxWidth: '100px',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#9B9FAA',
                  maxWidth: '100px',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#FC842D',
                  maxWidth: '100px',
                },
              }}
            />
          </FormControl>
          <Fab
            type="submit"
            onClick={handleSubmit}
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
        </li>
      </MenuList>
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
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            overflow: 'auto',
            height: 250,
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
          {filteredProducts && filteredProducts.length > 0 ? (
            <MenuList
              sx={{
                marginLeft: '20px',
                maxWidth: '740px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                listStyle: 'none',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: '400',
                fontSize: '14px',
                letterSpacing: '0.04em',
                color: '#212121',
                marginRight: '30px',
              }}
            >
              {myProductsState.loading && (
                <CircularProgress sx={{ color: '#FC842D' }} />
              )}
              {filteredProducts?.map((product, index) => (
                <li key={`${product._id}-${index}`} className={css.productInfo}>
                  <p className={css.firstListStyle}>{product.product}</p>
                  <div className={css.list}>
                    <p className={css.listStyle}>{product.quantity} g</p>
                    <p className={css.listStyle}>{product.newCalories} kcal</p>
                    <CloseRoundedIcon
                      sx={{
                        color: '#9B9FAA',
                        fontSize: 'medium',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleRemoveProduct(product._id)}
                    />
                  </div>
                </li>
              ))}
            </MenuList>
          ) : (
            <li>No products for selected date</li>
          )}
        </List>
      </Box>
    </div>
  );
};
