import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";
import { Table, Container } from "react-bootstrap";
export default function ShowData() {
  //--------------------/States
  const [users, setUsers] = useState([]),
    [modalDeleteShow, setModalDeleteShow] = useState(false),
    [modalEditShow, setModalEditShow] = useState(false),
    [userID, setUserID] = useState(""),
    [getData, setGetData] = useState(false),
    [editUser, setEditUser] = useState({
      fullName: "",
      password: "",
    });

  //-----------------Mount And update
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://members-5c873-default-rtdb.firebaseio.com/users.json"
      );
      const newData = await response.json();
      setUsers(Object.entries(newData));
    };
    fetchData();
  }, [getData]);

  useEffect(() => {
    let mainUser = users.find((user) => user[0] == userID);

    if (mainUser) {
      setEditUser({
        fullName: mainUser[1].fullName,
        password: mainUser[1].password,
      });
    }
  }, [userID]);
  //-----------------------Functions
  const removeHandler = async () => {
    await fetch(
      `https://members-5c873-default-rtdb.firebaseio.com/users/${userID}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    setModalDeleteShow(false);
    setGetData((prev) => !prev);
  };
  const editHandler = async () => {
    await fetch(
      `https://members-5c873-default-rtdb.firebaseio.com/users/${userID}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...editUser }),
      }
    ).then((response) => console.log(response));
    setModalEditShow(false);
    setGetData((prev) => !prev);

    setEditUser({
      fullName: "",
      password: "",
    });
  };
  //--------------------JSX

  return (
    <Container className="mt-5">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>fullName</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index) => (
            <tr key={index+1}>
              <td >{user[1].fullName}</td>
              <td>{user[1].password}</td>
              <td style={{ textAlign: "center" }}>
                <AiTwotoneDelete
                  onClick={() => {
                    setModalDeleteShow(true);
                    setUserID(user[0]);
                  }}
                />
                <AiTwotoneEdit
                  onClick={() => {
                    setModalEditShow(true);
                    setUserID(user[0]);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/*Delete modal */}
      <Modal
        show={modalDeleteShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4> Delete Confirm</h4>
          <p>are you sure delete user ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalDeleteShow(false)}>Close</Button>
          <Button variant="danger" onClick={() => removeHandler()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}

      <Modal
        show={modalEditShow}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>FullName</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={editUser.fullName}
                onChange={(e) =>
                  setEditUser({ ...editUser, fullName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Password"
                value={editUser.password}
                onChange={(e) =>
                  setEditUser({ ...editUser, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalEditShow(false)}>Close</Button>
          <Button onClick={() => editHandler()}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
