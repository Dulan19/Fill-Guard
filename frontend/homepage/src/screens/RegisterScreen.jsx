// //src/screens/RegisterScreen.jsx
// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
// import { useRegisterMutation } from '../slices/usersApiSlice';
// import { setCredentials } from "../slices/authSlice";
// import { toast } from "react-toastify";
// import "../styles/RegisterScreen.css";


// const RegisterScreen = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [register, { isLoading }] = useRegisterMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//     } else {
//       try {
//         const res = await register({ name, email, password }).unwrap();
//         dispatch(setCredentials({ ...res }));
//         navigate(redirect);
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <div className="form-box">
   
//       <h1>Register</h1>
    
//       <Form onSubmit={submitHandler}>
//         <Form.Group className="my-2" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="name"
//             placeholder="Enter name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className="my-2" controlId="email">
//           <Form.Label>Email Address</Form.Label>
//           <Form.Control
//             type="email"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Form.Group className="my-2" controlId="password">
//           <Form.Label>Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className="my-2" controlId="confirmPassword">
//           <Form.Label>Confirm Password</Form.Label>
//           <Form.Control
//             type="password"
//             placeholder="Confirm password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button className="button" disabled={isLoading} type="submit" variant="primary">
//           Register
//         </Button>

//         {isLoading && <Loader />}
//       </Form>
   

//       <Row className="py-3">
//         <Col>
//           Already have an account?{" "}
//           <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
//             Login
//           </Link>
//         </Col>
//       </Row>
//       </div>
  
//   );
// };

// export default RegisterScreen;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainerNew";
import "../styles/RegisterScreen.css"; 

import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation(); // Removed isLoading to avoid warning

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <Card className="shadow-lg p-4 modern-register-card">
        <Card.Body>
          <h1 className="text-center mb-4">Create an Account</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="form-floating mb-3" controlId="name">
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Label>Name</Form.Label>
            </Form.Group>

            <Form.Group className="form-floating mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Label>Email Address</Form.Label>
            </Form.Group>

            <Form.Group className="form-floating mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Form.Label>Password</Form.Label>
            </Form.Group>

            <Form.Group className="form-floating mb-3" controlId="confirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Form.Label>Confirm Password</Form.Label>
            </Form.Group>

            <Button type="submit" className="w-100 modern-register-btn">
              Register
            </Button>
          </Form>

          <Row className="py-3">
            <Col className="text-center">
              Already have an account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default RegisterScreen;