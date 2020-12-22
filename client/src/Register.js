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

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: false,
    };
  }

  submitForm = () => {
    if (!this.state.name && !this.state.email && !this.state.password) {
      this.setState({
        error: true,
      });
      return;
    }
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios({
      method: "post",
      url: `https://lifestyleblogs.herokuapp.com/register`,
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
          <h2>Register</h2>
          {this.state.error ? (
            <Alert color='danger'>
              Required! and at least 6 character long and provide valid email.
            </Alert>
          ) : null}

          <Form className='form'>
            <Col>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  type='name'
                  name='name'
                  onChange={this.handleChange}
                  id='name'
                  placeholder='Joe bae'
                />
              </FormGroup>
            </Col>

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
              Already have an account?{" "}
              <a onClick={() => this.props.history.push("/login/")} href=''>
                Login here.
              </a>
            </p>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Register;
