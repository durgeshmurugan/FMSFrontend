import React, { useEffect, useState } from 'react';
import servicepro from '../service/Serviceproduct';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { Button, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'monospace',
        fontSize: 18,
    },
});
export default function ViewEach() {
    const [product, setProduct] = useState({
        productName: "",
        price: "",
        description: "",
        category: "",
        productImage: ""
    });

    const { productId } = useParams();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const result = await servicepro.getProductById(productId);
        setProduct(result.data);
    }


    return (

        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link to='/adminhome'>Back</Link></li>
                            <li className='li'><Link to='/signin'>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className='box1'>
                <ThemeProvider theme={theme}>
                    <Box display="flex" justifyContent="center" mt={5}>
                        <Card className='procard' sx={{ maxWidth: 800 }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={`data:image/jpeg;base64,${product.productImage}`}
                                alt={product.productName}
                                style={{objectFit: "contain"}}
                            />

                            <CardContent>

                                <Typography gutterBottom variant="h5" component="div">
                                    {product.productName}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" mb={2}>
                                    {product.description}
                                </Typography>

                                <Typography variant="h6" color="primary">
                                    Rs. {product.price}
                                </Typography>

                                <Typography variant="body1" color="text.dark" mt={1}>
                                    Category: {product.category}
                                </Typography>

                                <CardActions>
                                    <Link to={`/edit/${product.productId}`} size="large" color="primary">
                                        Edit
                                    </Link>
                                </CardActions>

                            

                            </CardContent>
                        </Card>
                    </Box>
                </ThemeProvider>
            </div>
        </div>

    );

}
