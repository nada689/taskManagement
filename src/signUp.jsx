import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Add_user } from "/services/users";
import Form from "react-bootstrap/Form";
import "./signUp.css";
import Alert from "react-bootstrap/Alert";
export default function SignUP() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      createUser();
    }
  };
  const createUser = () => {
    Add_user(user).then(() => {
      toggleShow();
      setTimeout(() => {
        setShow(false);
        navigate("/");
      }, 2000);
    });
  };

  return (
    <>
      <header
        className="my-5 container text-center 
            bg-gray w-50 mx-auto py-3 rounded-2"
      >
        <h2>Sign Up</h2>
      </header>

      <section className="my-5 w-50 container mx-auto">
        {show && (
          <Alert variant="success" onClose={toggleShow} dismissible>
            <Alert.Heading>Sign Up</Alert.Heading>
            <p>User Added Successfully</p>
          </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a First Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please choose a Last Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter an email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Form.Control.Feedback type="invalid">
              Please add a password.
            </Form.Control.Feedback>
          </Form.Group>
          <div
            className="text-center 
          mx-auto"
          >
            <input
              type="submit"
              value="Create user"
              className="btn btn-secondary w-100 my-4 text-center 
             mx-auto"
            />
          </div>
        </Form>
      </section>
    </>
  );
}
