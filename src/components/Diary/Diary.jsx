import React, { useState } from 'react';
import css from '../Diary/Diary.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Typography,
  Box,
  List,
  Fab,
  FormControl,
  TextField,
  MenuList,
  Autocomplete,
  /* Button, */
} from '@mui/material';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  saveProductData,
  /*   clearMyProducts, */
  removeProduct,
} from '../../redux/myProducts/myProductsSlice';

export const Diary = () => {
  const authState = useSelector(state => state.auth);
  const user = authState.user && authState.user.data;
  const allowedProductsAll = user?.infouser?.allowedProductsAll;
  const dispatch = useDispatch();

  const myProductsState = useSelector(state => state.myproducts);
  const addProducts =
    myProductsState.products && myProductsState.products.products;
  console.log('myProductsState:', myProductsState);
  const originalDate = user && user.currentDate;
  const formattedDate = new Date(originalDate)
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .split('/')
    .join('.');

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
  };
 */
  const handleRemoveProduct = productId => {
    dispatch(removeProduct(productId));
  };

  return (
    <div className={css.diary}>
      {/* <Button
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
        <Typography
          sx={{
            fontFamily: 'Verdana, sans-serif',
            fontWeight: '700',
            fontSize: '34px',
            textAlign: 'center',
            color: '#212121',
          }}
        >
          {formattedDate}
        </Typography>
        <DateRangeIcon sx={{ color: '#9B9FAA', fontSize: 'medium' }} />
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
          {addProducts && addProducts.length > 0 && (
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
              {addProducts?.map((product, index) => (
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
          )}
        </List>
      </Box>
    </div>
  );
};
