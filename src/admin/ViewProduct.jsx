import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import servicepro from '../service/Serviceproduct';

export default function ViewProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const result = await servicepro.getAllProduct();
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };

    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link to='/addproduct'>Add Product</Link></li>
                            <li className='li'><Link to='/adminhome'>Back</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <Grid container spacing={2} id='grid'>
                {products.map((product) => (
                    <Grid item xs={6} sm={9} md={3} key={product.productId}>
                        <Link to={`/vieweach/${product.productId}`} style={{ textDecoration: 'none' }}>
                            <Card id='card1'>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        src={`data:image/jpeg;base64,${product.productImage}`}
                                        // image={product.productImage} // Assuming product.image holds the URL of the product image
                                        alt={product.productName}
                                        style={{ objectFit: "contain" }}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.productName} {/* Assuming product.name holds the name of the product */}
                                        </Typography>
                                        <Typography variant="h6" color="text.dark">
                                            Rs.{product.price} {/* Assuming product.description holds the description of the product */}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}