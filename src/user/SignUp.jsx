import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import serviceuser from '../service/Serviceuser';

const defaultTheme = createTheme();

export default function SignUp() {
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        salary: '',
        expenses:'',
        phoneNumber: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await serviceuser.addUser(user);
        Swal.fire({
            title: "Registration Completed!",
            text: "You have registered successfully, now you can apply for your EMI card and start your purchase",
            icon: "success"
          });
        navigate("/home");
    }

    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link href='/home' className='h4'><h4 >Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link href='/home'>Home</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
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
                                        id="expenses"
                                        label="Monthly Expenses"
                                        name="expenses"
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
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="username"
                                        label="Username"
                                        type="text"
                                        id="username"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
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
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}