import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Add_user } from "../services/users";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

// Define the type for the user object
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [show, setShow] = useState<boolean>(false);
  const toggleShow = () => setShow(!show);
  
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
      <section className="mb-4 w-50 container mx-auto p-5 bg-white mt-4">
        <h2 className="text-center">Sign Up</h2>
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
          <div className="text-center mx-auto">
            <input
              type="submit"
              value="Create user"
              className="btn btn-warning w-100 my-4 text-center mx-auto"
            />
          </div>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">LogIn</Link>
          </div>
        </Form>
      </section>
    </>
  );
}

