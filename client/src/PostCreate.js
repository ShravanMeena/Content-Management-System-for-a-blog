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

class PostCreate extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      creator: "",
      message: "",
      comment: "",
      tags: [],
      color: "",
      error: false,
    };
  }

  submitForm = () => {
    if (!this.state.title && !this.state.message) {
      this.setState({
        error: true,
      });
      return;
    }

    const data = {
      title: this.state.title,
      creator: this.state.creator,
      message: this.state.message,
      comment: this.state.comment,
      tags: this.state.tags,
      color: this.state.color,
    };
    axios({
      method: "post",
      url: `https://lifestyleblogs.herokuapp.com/user/post`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
      data: data,
    })
      .then((res) => {
        this.setState({
          posts: res.data,
        });
        this.props.createPost();
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
        <Container className='formContainer'>
          <h2>Create new post</h2>
          {this.state.error ? <Alert color='danger'>Required!</Alert> : null}
          <Form className='form'>
            <Col>
              <FormGroup>
                <Label>Title</Label>
                <Input
                  type='text'
                  name='title'
                  onChange={this.handleChange}
                  id='title'
                  placeholder='Enter post title'
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Creator</Label>
                <Input
                  type='text'
                  name='creator'
                  onChange={this.handleChange}
                  id='creator'
                  placeholder='Enter your name'
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Comment</Label>
                <Input
                  type='text'
                  name='comment'
                  onChange={this.handleChange}
                  id='comment'
                  placeholder='Enter post first comment'
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Color</Label>
                <Input
                  type='text'
                  name='color'
                  onChange={this.handleChange}
                  id='color'
                  placeholder='Your post color'
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label>Tags</Label>
                <Input
                  type='text'
                  name='tags'
                  onChange={this.handleChange}
                  id='tags'
                  placeholder='Enter tags'
                />
              </FormGroup>
            </Col>

            <Col>
              <FormGroup>
                <Label for='examplePassword'>Message</Label>
                <Input
                  type='text'
                  onChange={this.handleChange}
                  name='message'
                  id='examplePassword'
                  placeholder='Enter your message'
                />
              </FormGroup>
            </Col>

            <Button onClick={() => this.submitForm()}>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default PostCreate;
