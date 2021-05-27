import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  Alert,
} from "react-bootstrap";
import style from "./Remarks.module.css";
import baseUrl from "../../../global/api";
export default function RemarkForm(props) {
  const [input, setInput] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [isDisplay, setIsDisplay] = useState(false);
  console.log("tttttttttt:"+props.leadId)
  const remarksHandler = async (event,id) => {
    event.preventDefault();
    console.log(id);
    let item = { remark: input };
    let headers = {
      Authorization: "Token e9f8746ae94a00aa6526122f2db67e081ca10f54",
    };
    if (input !== "") {
      await axios
        .post(`${baseUrl}/leads/lead_remark/${id}`, item, { headers })
        .then((response) => {
          console.log(response.data);
          setAlertMessage(response.data.msg);
          setIsDisplay(true);
        })
        .catch((error) => {
          setAlertMessage("Something Wrong ");
          setIsDisplay(true);
        });
    }
  };
  useEffect(() => {
    const fetchRemarks = async () => {
      console.log("fetchremarks:"+props.leadId)
      console.log("fetchremarks:"+`${baseUrl}/leads/lead_remark/${props.leadId}`)
      let headers = {
        Authorization: "Token e9f8746ae94a00aa6526122f2db67e081ca10f54",
      };
      await axios
        .get(`${baseUrl}/leads/lead_remark/${props.leadId}`, { headers })
        .then((response) => {
          console.log(response.data);
          setRemarks(response.data.remarks);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchRemarks();
  }, []);
  return (
    <Form onSubmit={()=>remarksHandler(props.leadId)}>
      <Card className={style.RemarksCard}>
        <Row>
          {isDisplay ? <Alert variant="primary">{alertMessage}</Alert> : null}
          <Col md={11}>
            <InputGroup className={style.Remarks}>
              <InputGroup.Prepend>
                <InputGroup.Text>Add Remarks</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={1}>
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
        <div className={style.RemarksContainer}>
          {remarks.map((item) => (
            <Card className={style.RemarksListCard} key={item.id}>
              <Row>
                <Col><p>{item.lead}</p></Col>
                <Col><p> Updated By:{item.updated_by}</p></Col>
                <Col>
                <p>{new Date(item.updated_date).toLocaleString()}</p>
                </Col>
              </Row>
              <Row>
              <Col><p>{item.remark}</p></Col>
              </Row>
            </Card>
          ))}
        </div>
      </Card>
    </Form>
  );
}
