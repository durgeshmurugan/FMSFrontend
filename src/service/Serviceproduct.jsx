import React from "react";
import axios from 'axios';

const AddProduct = "http://localhost:1111/addProduct"
const GetProduct = "http://localhost:1111/getAllProduct";
const GetProductById = "http://localhost:1111/getProductById/";

class Serviceproduct extends React.Component{

    addProduct(product){
        return axios.post(AddProduct, product);
    }

    getAllProduct(){
        return axios.get(GetProduct)
    }

    getProductById(productId){
        return axios.get(GetProductById + productId)
    }

}
const servicepro =   new Serviceproduct();
export default servicepro;