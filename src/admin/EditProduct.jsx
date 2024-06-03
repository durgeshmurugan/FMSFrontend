import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';

const defaultTheme = createTheme();

export default function EditProduct() {

    let productId = useParams();

    console.log(productId);

    productId = parseInt(productId.productId);

    console.log(productId)



    const [product, setProduct] = useState({
        productId: productId,
        productName: '',
        price: '',
        category: '',
        description: '',
        productImage: null
    });
    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'productImage') {
            setProduct({
                ...product,
                productImage: files[0]
            });
        } else {
            setProduct({
                ...product,
                [name]: value
            });
        }
    };

    const loadProduct = async (e) => {
        await axios
            .get(`http://localhost:1111/getProductById/${product.productId}`)
            .then((response) => {
                console.log(response.data);
                setProduct(response.data);
            })
            .catch((error) => {
            });
    };
    useEffect(() => {
        loadProduct(productId);
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productId', product.productId)
        formData.append('productName', product.productName);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('description', product.description);
        formData.append('productImage', product.productImage);
        try {
            const response = await axios.put(`http://localhost:1111/updateproduct/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                title: "Good job!",
                text: "Product Updated Successfully",
                icon: "success"
            });
            console.log('Product Updated successfully:', response.data);
            setProduct({
                productId: '',
                productName: '',
                price: '',
                category: '',
                description: '',
                productImage: null
            });
            navigate('/viewproduct');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link to='/adminhome'>Home</Link></li>
                            <li className='li'><Link to='/viewproduct'>All Product</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Update Product
                        </Typography>
                        <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="productName"
                                label="Product Name"
                                name="productName"
                                type='text'
                                value={product.productName}
                                onChange={(e) => handleChange(e)}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required

                                fullWidth
                                name="price"
                                label="Price"

                                type="number"
                                id="price"
                                value={product.price}

                                onChange={(e) => handleChange(e)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="category"
                                label="Category"
                                type="text"
                                id="category"
                                value={product.category}
                                onChange={(e) => handleChange(e)}
                                select
                            >
                                
                                <MenuItem value={product.category}>{product.category}</MenuItem>
                                <MenuItem value="Smart phone">Smart Phone</MenuItem>
                                <MenuItem value="Home appliances">Home Appliances</MenuItem>
                                <MenuItem value="Electronics">Electronics</MenuItem>
                            </TextField>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                type="text"
                                id="description"
                                value={product.description}
                                onChange={(e) => handleChange(e)}
                            />
                            <Grid item xs={12} sm={6} md={4} lg={3}>
                                <img
                                    src={`data:image/jpeg;base64,${product.productImage}`}
                                    alt={product.productName}
                                    style={{ height: 150, objectFit: "contain" }}
                                />
                            </Grid>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="productImage"
                                type="file"
                                id="productImage"
                                onChange={(e) => handleChange(e)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
