import axios from "axios";
import { useState } from "react";
import { Form, Button, Container,Alert } from "react-bootstrap";
export default function SendData() {
  const [newUser, setNewUser] = useState({
    fullName: "",
    password: "",
  });


  let sendUser = (e) => {
  
  /*  fetch("https://members-5c873-default-rtdb.firebaseio.com/users.json",{
    method:"POST",
    body:JSON.stringify({...newUser})
   }).then(response=>console.log(response)) */

axios({
  method:'POST',
  url:'https://members-5c873-default-rtdb.firebaseio.com/users.json',
  data:JSON.stringify(newUser)
  
}).then(response=>console.log(response))
.catch(err=>console.log(err))



setNewUser({
  fullName: "",
    password: "",
})
  };

  return (
    <>
      <Container className="mt-5">
      
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </Form.Group>

          <Button onClick={sendUser} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
       
      </Container>
    </>
  );
}
