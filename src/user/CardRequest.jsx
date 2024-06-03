import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
 
const defaultTheme = createTheme();
 
export default function CardRequest() {
 
    const [request, setRequest] = useState({
        expenses: '',
        user:
            {
                userId: sessionStorage.getItem("userId")
            }
 
    });
 
    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name]: e.target.value });
    };
 
    let navigate = useNavigate();
 
    const userId = sessionStorage.getItem("userId");
 
    console.log(userId);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            Swal.fire({
                title: "Error",
                text: "User is not logged in",
                icon: "error"
            });
            return;
        }
        await axios.post(`http://localhost:1111/cardRequest/${userId}`,{
            request: request
        });
        Swal.fire({
            title: "Request Sent Completed!",
            text: "You will receive a virtual card, once admin approved your request...",
            icon: "success"
        });
        navigate("/userhome");
    };
 
    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link href='/home' className='h4'><h4 >Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link href='/userhome'>Home</Link></li>
                            <li className='li'><Link href=''>View Card</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography component="h1" variant="h5">
                            Card Request Form
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="fullname"
                                        required
                                        fullWidth
                                        id="fullname"
                                        label="Full Name"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="occupation"
                                        label="Occupation"
                                        name="occupation"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="salary"
                                        label="Salary"
                                        name="salary"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="expenses"
                                        value={request.expenses}
                                        label="Monthly expense"
                                        type="text"
                                        id="expenses"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        text="email"
                                        label="Email ID"
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="phoneNumber"
                                        label="Phone Number"
                                        name="phoneNumber"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Send Request
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}