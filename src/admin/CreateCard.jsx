import React, { useState } from 'react';
import { Button, Form, Alert, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Cards from "react-credit-cards-2";
import Swal from 'sweetalert2';
import axios from 'axios';

export default function CreateCard() {

    const [values, setValues] = useState({
        cardName: ''
    })

    const [card, setCard] = useState({
        cardType: '',
        limit: '',
        cardNumber: '',
        balance: '',
        validity: '',
        cvv: '',
        userId: '',
        month: '',
        year: '',
      });
      const { userId } = useParams();
     
      const handleChange = (e) => {
        const { name, card } = e.target;
        setCard((prevCard) => ({ ...prevCard, [name]: card }));
      };

      const handleChanges = (e) => {
        const { name, values } = e.target;
        setValues((valuespre) => ({ ...valuespre, [name]: values }));
      };
     
      const handleDateChange = (field, card) => {
        setCard((prevCard) => ({ ...prevCard, [field]: card }));
      };
     
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
          `http://localhost:1111/cardGeneration/${userId}`,
          card
        );
        Swal.fire({
          title: 'Card Generated Successfully!',
          icon: 'success',
        })
          .then(() => {
            console.log('Card generated successfully:', response.data);
          })
          .catch((error) => {
            console.error('There was an error generating the card!', error);
          });
      };
      const handleFocus = (e) => {
        const { name } = e.target;
        setCard((prevCard) => ({...prevCard, focus: name }));
      };
    return (
        <div>
            <div className="container" id='container1'>
                <div className="box justify-content-center align-items-center">
                    <div className="formDiv">
                        <div className="creditCard">
                            <Cards
                                expiry={card.month / card.year}
                                name={values.cardName}
                                number={card.cardNumber}
                                type={card.cardType}
                            />
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    id="cardName"
                                    data-testid="cardName"
                                    name="cardName"
                                    placeholder="Card Number"
                                    value={values.cardName}
                                    onChange={handleChange}
                                    onFocus={handleFocus}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    id="cardNumber"
                                    data-testid="cardNumber"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={card.cardNumber}
                                    onChange={handleChanges}
                                    onFocus={handleFocus}
                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            name="cardType"
                                            id="cardType"
                                            data-testid="cardType"
                                            placeholder="Card Type"
                                            value={card.cardType}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            id="expiry"
                                            data-testid="expiry"
                                            name="expiry"
                                            placeholder="Expiration Date"
                                            value={card.month / card.year}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Control
                                            type="number"
                                            id="balance"
                                            data-testid="balance"
                                            name="balance"
                                            placeholder="Balance"
                                            value={card.balance}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            id="cvv"
                                            data-testid="cvv"
                                            name="cvv"
                                            placeholder="Security code"
                                            value={card.cvv}
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                size={"block"}
                                data-testid="validateButton"
                                id="validateButton"
                                type="submit"
                            >
                                Validate
                            </Button>
                        </Form>
                    </div>
                    <Alert
                        id="alertMessage"
                        data-testid="alertMessage"
                    >
                    </Alert>{" "}
                </div>
            </div>
        </div>
    )
}
