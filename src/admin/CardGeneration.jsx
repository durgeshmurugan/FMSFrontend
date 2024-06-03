import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';

export default function CardGeneration() {
  const [card, setCard] = useState({
    cardType: '',
    limit: '',
    cardNumber: '',
    balance: '',
    cvv: '',
    userId: '',
    month: '',
    year: '',
  });
  const { userId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handleDateChange = (field, value) => {
    setCard((prevCard) => ({ ...prevCard, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:1111/cardGeneration/${userId}`,
      card
    );
    Swal.fire({
      title: 'Card Generated Successfully!',
      icon: 'success',
    })
      .then(() => {
        console.log('Card generated successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was an error generating the card!', error);
      });
  };

  return (
    <div>
      <div className='div1'>
        <nav className='homenav'>
          <Link to='/home' className='h4'>
            <h4>Finance Management System</h4>
          </Link>
          <div>
            <ul className='ul'>
              <li className='li'>
                <Link to='/addproduct'>Manage Product</Link>
              </li>
              <li className='li'>
                <Link to='/approvecard'>Manage Card Request</Link>
              </li>
              <li className='li'>
                <Link to='/admin'>Logout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <p className='title'>Card Generation Form</p>
          <Grid item xs={6} sm={6} id='cardgengrid'>
            <TextField
              name='cardType'
              label='Card Type'
              value={card.cardType}
              onChange={handleChange}
              fullWidth
              select
              sx={{ marginBottom: 2 }}>
              <MenuItem value="gold">Gold Card</MenuItem>
              <MenuItem value="titanium">Titanium</MenuItem>
            </TextField>
            <TextField
              name='limit'
              label='Card Limit'
              value={card.limit}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label='Card Number'
              name='cardNumber'
              value={card.cardNumber}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              inputProps={{ inputMode: 'numeric' }}
            />
            <TextField
              label='CVV'
              name='cvv'
              value={card.cvv}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              inputProps={{ inputMode: 'numeric' }}
            />
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={6}>
                <TextField
                  type='text'
                  label='Month (MM)'
                  name='month'
                  value={card.month}
                  onChange={(e) => handleDateChange('month', e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  inputProps={{ inputMode: 'numeric', maxLength: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type='text'
                  label='Year (YYYY)'
                  name='year'
                  value={card.year}
                  onChange={(e) => handleDateChange('year', e.target.value)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  inputProps={{ inputMode: 'numeric', maxLength: 4 }}
                />
              </Grid>
            </Grid>
            <TextField
              label='User Id'
              value={userId}
              disabled
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div id='buttoncard' sx={{ marginTop: 2 }}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{ marginRight: 1 }}
              >
                Submit
              </Button>
              <Button
                type='reset'
                variant='contained'
                onClick={() =>
                  setCard({
                    cardType: '',
                    limit: '',
                    cardNumber: '',
                    balance: '',
                    validity: '',
                    cvv: '',
                  })
                }
              >
                Reset
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}