import axios from "axios";
import { Component } from "react";

const AddUser = "http://localhost:1111/addUsers";

class Serviceuser extends Component{

    addUser(user){
        return axios.post(AddUser, user)
    } 
    
}
const serviceuser = new Serviceuser();
export default serviceuser;