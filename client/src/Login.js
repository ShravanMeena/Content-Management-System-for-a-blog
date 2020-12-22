import React, { Component } from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import "./App.css";
import axios from "axios";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: false,
    };
  }

  submitForm = () => {
    if (!this.state.email && !this.state.password) {
      this.setState({
        error: true,
      });
      return;
    }
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios({
      method: "post",
      url: `https://lifestyleblogs.herokuapp.com/login`,
      data: data,
    })
      .then((res) => {
        this.props.history.push("/user/post");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div className='App'>
        <Alert color='warning'>No, Validation XXXXXXX!</Alert>

        <Container className='formContainer'>
          <h2>Sign In</h2>
          {this.state.error ? (
            <Alert color='danger'>Invalid password and email</Alert>
          ) : null}
          <Form className='form'>
            <Col>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type='email'
                  name='email'
                  onChange={this.handleChange}
                  id='exampleEmail'
                  placeholder='myemail@email.com'
                />
              </FormGroup>
              {/* <FormFeedback
              valid={this.state.validate.emailState === "has-success"}>
              That's a tasty looking email you've got there.
            </FormFeedback>
            <FormFeedback
              invalid={this.state.validate.emailState === "has-danger"}>
              Uh oh! Looks like there is an issue with your email. Please input
              a correct email.
            </FormFeedback> */}
            </Col>

            <Col>
              <FormGroup>
                <Label for='examplePassword'>Password</Label>
                <Input
                  type='password'
                  onChange={this.handleChange}
                  name='password'
                  id='examplePassword'
                  placeholder='********'
                />
              </FormGroup>
            </Col>
            <Button onClick={() => this.submitForm()}>Submit</Button>
            <p>
              Don’t have an account yet?{" "}
              <a onClick={() => this.props.history.push("/")} href=''>
                Register here.
              </a>
            </p>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Login;
