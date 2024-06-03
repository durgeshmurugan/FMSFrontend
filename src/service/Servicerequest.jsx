import React from "react";
import axios from 'axios';

const GetAllRequest = "http://localhost:1111/getAll";

class Servicerequest extends React.Component{
    
    getAllRequest(){
        return axios.get(GetAllRequest);
    }

}
const servicerequest =   new Servicerequest();
export default servicerequest;