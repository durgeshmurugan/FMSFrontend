import React from "react";
import axios from 'axios';

const AddCardDetail = "http://localhost:1111/addCard";
const GetAllCardDetail = "http:localhost:1111/getAllCard";

class Servicecarddetail extends React.Component{

    addCardDetail(card){
        return axios.post(AddCardDetail, card);
    }

    getAllCardDetail(){
        return axios.get(GetAllCardDetail);
    }

}
const servicecarddet =   new Servicecarddetail();
export default servicecarddet;