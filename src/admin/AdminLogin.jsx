import * as React from 'react';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function SignIn() {
    const [credentials, setCredentials] = React.useState({ username: '', password: '' });
    const [usernameError, setUsernameError] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        if (usernameError) {
            setUsernameError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hardcodedUsername = 'lathamohan12@gmail.com';
        const hardcodedPassword = 'latha123';

        const usernameInput = credentials.username.trim();
        const passwordInput = credentials.password.trim();

        // Email validation function
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        }

        // Check if username and password are not empty
        if (!usernameInput || !passwordInput) {
            alert('Please enter both username and password');
            return;
        }

        // Check if the email format is valid
        if (!validateEmail(usernameInput)) {
            alert('Please enter a valid email address');
            return;
        }

        if (usernameInput === hardcodedUsername && passwordInput === hardcodedPassword) {
            Swal.fire({
                title: "Login success!",
                text: "You Logged in Successfully",
                icon: "success"
            });
            navigate('/adminhome');
        } else {
            setUsernameError(true);
            alert('Invalid credentials');
        }
    };

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
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5"> Sign in </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="username" label="Username" name="username" text="email" autoComplete="username" onChange={handleChange} autoFocus error={usernameError} helperText={usernameError ? 'Invalid username' : ''} />
                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" onChange={handleChange} autoComplete="current-password" />
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} > Sign In </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2"> Forgot password? </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}