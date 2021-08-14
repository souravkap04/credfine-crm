import React, { useState } from "react";
import axios from 'axios';
import baseUrl from '../../global/api';
import { Form, Button, Card, Alert } from "react-bootstrap";
import style from "./UserCreate.module.css";
import PageLayerSection from '../PageLayerSection/PageLayerSection';
export default function UserCreate() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [productType, setProductType] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [validated, setValidated] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isDisplay, setIsDisplay] = useState(false);

  const userCteateHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    let item = {
      username: userName, first_name: firstName, last_name: lastName, email, role,
      product_type: productType, phone_no: phoneNo, gender
    };

    axios.post(`${baseUrl}/user/userRegistration/`, item)
      .then((response) => {
        setAlertMessage(response.data['data']);
        setIsDisplay(true);
      }).catch((error) => {
        setAlertMessage('something wrong');
        setIsDisplay(true);
      })


  }
  return (
    <PageLayerSection>
      <div className={style.CreateUser}>
        <Form noValidate validated={validated} onSubmit={userCteateHandler}>
          <Card className={style.UserCreateCard}>
            {isDisplay ? <Alert className={style.alertBox}>{alertMessage}</Alert> : null}
            <Form.Label className={style.UserCreateText}>
              User Create
              <hr className={style.UserCreateBar} />
            </Form.Label>
            <Form.Group size="lg" controlId="userName">
              <Form.Label className={style.InputBox}>User Name</Form.Label>
              <Form.Control
                required
                autoFocus
                type="text"
                value={userName}
                onChange={(e) => setUserName((e.target.value).toLowerCase().trim())} />
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size="lg" controlId="firstName">
              <Form.Label className={style.InputBox}>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName((e.target.value).toLowerCase().trim())} />
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size="lg" controlId="lastName">
              <Form.Label className={style.InputBox}>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName((e.target.value).toLowerCase().trim())} />
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size="lg" controlId="email">
              <Form.Label className={style.InputBox}>Email Id</Form.Label>
              <Form.Control
                required
                type="email"
                value={email}
                onChange={(e) => setEmail((e.target.value).toLowerCase())}
              />
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="role">
              <Form.Label className={style.InputBox}>Role</Form.Label>
              <Form.Control required as="select"
                value={role} onChange={(e) => setRole(e.target.value)}>
                <option value=''>Select One</option>
                <option value="1">Admin</option>
                <option value="2">Manager</option>
                <option value="3">Agent</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="productType">
              <Form.Label className={style.InputBox}>Product Type</Form.Label>
              <Form.Control required as="select"
                value={productType} onChange={(e) => setProductType(e.target.value)}>
                <option value=''>Select One</option>
                <option value="PL">Personal Loan</option>
                <option value="BL">Business Loan</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size="lg" controlId="phoneNo">
              <Form.Label className={style.InputBox}>Phone No</Form.Label>
              <Form.Control
                required
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <Form.Control.Feedback type="invalid"> This field is required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label className={style.InputBox}>Gender</Form.Label>
              <Form.Control required as="select"
                value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value=''>Select One</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid"> Select at least one</Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit" >CREATE</Button>
          </Card>
        </Form>

      </div>
    </PageLayerSection>
  );
}
