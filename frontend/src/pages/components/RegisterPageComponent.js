import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';


const RegisterPageComponent = ({ registerUserApiRequest, reduxDispatch, setReduxUserState }) => {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
  const [registerUserResponseState, setRegisteruserResponseState]=useState({
    success: "", error: "", loading: false
  });
  const onChange = () => {
    const password = document.querySelector("input[name=password]");
    const confirm = document.querySelector("input[name=confirmPassword]");
    if (confirm.value === password.value) {
      confirm.setCustomValidity("");
    } else {
      confirm.setCustomValidity("Passwords do not match");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const password = form.password.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const phoneNumber = form.phoneNumber.value;

    if (form.checkValidity() === true && firstname && lastname && password
      && email && gender && phoneNumber && form.password.value === form.confirmPassword.value) {
      setRegisteruserResponseState({ loading: true });
      try {
        const data = await registerUserApiRequest(firstname, lastname, password, email, gender, phoneNumber);

        setRegisteruserResponseState({ success: data.success, loading: false });
        reduxDispatch(setReduxUserState(data.userCreated));
        sessionStorage.setItem("userInfo", JSON.stringify(data.userCreater));

        if (data.success === "User Created") {
            window.location.href = '/login'
          }
          else window.location.href = '/'
          
      } catch (er) {
        setRegisteruserResponseState({ error: er.response.data.message || er.response.data });
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Your first name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your first name"
                name="firstname"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a first name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Your last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastname"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
              <Form.Label>Your Phone number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your phone number"
                name="phoneNumber"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your phone number
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid password
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Password should have at least 6 characters
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Repeat Password"
                minLength={6}
                onChange={onChange}
              />
              <Form.Control.Feedback type="invalid">
                Both passwords should match
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Male"
                  type="radio"
                  name="gender"
                  id="male"
                  required
                />
                <Form.Check
                  inline
                  label="Female"
                  type="radio"
                  name="gender"
                  id="female"
                  required
                />
                <Form.Check
                  inline
                  label="Others"
                  type="radio"
                  name="gender"
                  id="others"
                  required
                />
              </div>
            </Form.Group>

            <Row className="pb-2">
              <Col>
                Do you have an account already?
                <Link to={"/login"}> Login </Link>
              </Col>
            </Row>

            <Button type="submit">
                {
                    registerUserResponseState && registerUserResponseState.loading=== true
                     ? (
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                     ):("")
                }
              Submit
            </Button>
            
            <Alert show={registerUserResponseState
            && registerUserResponseState.error === "User exists"} variant="danger">
              User with that email already exists!
            </Alert>
            <Alert show={registerUserResponseState && registerUserResponseState.success
            === "User created"} variant="info">
              User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPageComponent;
