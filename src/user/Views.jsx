import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import servicepro from '../service/Serviceproduct';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'monospace',
        fontSize: 12,
    },
});

export default function Views() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const getUserIdFromSession = () => {
            const userIdFromSession = sessionStorage.getItem('userId');
            setUserId(userIdFromSession);
        };
        getUserIdFromSession();
    }, []);

    console.log(userId);

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

    const filterproducts = products.filter((product) => {
        return search.toLowerCase() === ""
          ? product
          : product.productName.toLowerCase().includes(search);
      });

    return (
        <div>
            <div className='div1'>
                <nav className='homenav'>
                    <Link to='/home' className='h4'><h4>Finance Management System</h4></Link>
                    <div>
                        <ul className='ul'>
                            <li className='li'><Link to={`/yourcard`}>Manage Card</Link></li>
                            <li className='li'><Link to={`/order/${userId}`}>Your orders</Link></li>
                            <li className='li'><Link to='/signin'>Logout</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div
                class="active-grey-2 mb-4 d-flex justify-content-center "
                style={{ marginTop: "30px" }}
            >
                <input
                    class="form-control"
                    type="text"
                    placeholder="Search by Name"
                    aria-label="Search"
                    style={{ width: "50%", borderRadius: "15px" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <ThemeProvider theme={theme}>
                <Grid container spacing={4} id='grid'>
                    {filterproducts.map((product) => (
                        <Grid className='grid-container' item xs={12} sm={9} md={3} key={product.productId}>
                            <Link to={`/eachproduct/${product.productId}`} style={{ textDecoration: 'none' }}>
                                <Card id='card1'>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="250"
                                            src={`data:image/jpeg;base64,${product.productImage}`}
                                            // image={product.productImage} // Assuming product.image holds the URL of the product image
                                            alt={product.productName} // Assuming product.name holds the name of the product
                                            style={{ objectFit: "contain" }}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {product.productName} {/* Assuming product.name holds the name of the product */}
                                            </Typography>
                                            <Typography variant="h6" color="text.dark">
                                                Rs. {product.price} {/* Assuming product.description holds the description of the product */}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Link>

                        </Grid>
                    ))}
                </Grid>

            </ThemeProvider>
        </div>
    );
}