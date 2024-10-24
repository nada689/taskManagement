import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { login } from "../../services/users";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  // State for user login input
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  // Retrieve user data from localStorage
  const user_data: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Call the login function and handle the response
    let User = fetch(login(user));
    User.then((response) => {
      if (
        response.ok === true &&
        user_data && // Ensure user_data exists
        user.email === user_data.email &&
        user.password === user_data.password
      ) {
        navigate("/");
      }
    }).catch((error) => {
      console.error("Login error: ", error);
    });
  };

  return (
    <>
      <div className="my-5 p-5 w-50 container mx-auto bg-white">
        <h2 className="text-center mb-4">Log In</h2>
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
            className="btn btn-warning w-100 my-4 text-center mx-auto"
            type="submit"
          >
            Log In
          </button>
        </Form>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/Signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}