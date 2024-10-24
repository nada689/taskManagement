import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../services/users";

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const user_data = JSON.parse(localStorage.getItem("user"));
  const handleLogin = (event) => {
    event.preventDefault();
    let User = fetch(login(user));
    User.then((response) => {
      if (
        response.ok === true &&
        user.email === user_data.email &&
        user.password === user_data.password
      ) {
        navigate("/");
      }
    });
  };
  return (
    <>
      <div className="my-5 p-5 w-50 container mx-auto bg-white">
        <h2 className="text-center mb-4">Log In</h2>
        {/* {error && <Alert variant="danger"></Alert>} */}
        <Form onSubmit={handleLogin}>
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
          <button
            className="btn btn-warning w-100 my-4 text-center  mx-auto"
            type="submit"
          >
            Log In
          </button>
          {/* <p className="form__error">{error}</p> */}
        </Form>
        <div className="w-100 text-center mt-2">
        Need an account? <Link to="/Signup">Sign Up</Link>
      </div>
      </div>

    </>
  );
}
