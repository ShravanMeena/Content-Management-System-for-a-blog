import React, { Component } from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import axios from "axios";

import "./App.css";

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      post_details: [],
      post_details_show: false,
      edit_post: [],
      title: "",
      creator: "",
      message: "",
      comment: "",
      tags: [],
      color: "",
      alert: false,
    };
  }
  getPosts = () => {
    axios({
      method: "get",
      url: `https://lifestyleblogs.herokuapp.com/user/post`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
    })
      .then((res) => {
        this.setState({
          posts: res.data,
        });
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  editPosts = (id) => {
    alert("Working on it!!!!");
    const data = {
      title: this.state.title,
      creator: this.state.creator,
      message: this.state.message,
      comment: this.state.comment,
      tags: this.state.tags,
      color: this.state.color,
    };
    axios({
      method: "patch",
      url: `https://lifestyleblogs.herokuapp.com/user/post/${id}/`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
      data: data,
    })
      .then((res) => {
        this.getSinglePostDetails();
        this.setState({
          edit: false,
        });
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  componentDidMount() {
    this.getPosts();
    this.setState({
      title: this.state.edit_post.title,
      creator: this.state.edit_post.creator,
      message: this.state.edit_post.message,
      comment: this.state.edit_post.comment,
      tags: this.state.edit_post.tags,
      color: this.state.edit_post.color,
    });
  }

  createLike = (id) => {
    axios({
      method: "patch",
      url: `https://lifestyleblogs.herokuapp.com/user/post/like/${id}`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
    })
      .then((res) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  createComment = (id) => {
    axios({
      method: "patch",
      url: `https://lifestyleblogs.herokuapp.com/user/post/comment/${id}`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
    })
      .then((res) => {
        this.getPosts();
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  getSinglePostDetails = (id) => {
    axios({
      method: "get",
      url: `https://lifestyleblogs.herokuapp.com/user/post/${id}`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
    })
      .then((res) => {
        this.setState({
          post_details: res.data,
          post_details_show: true,
          edit_post: res.data,
        });
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  // shouldComponentUpdate() {
  //   if (!(this.state.edit_post.length === 0)) {
  //     this.setState({
  //       title: this.state.edit_post.title,
  //       message: this.state.edit_post.message,
  //       creator: this.state.edit_post.creator,
  //     });
  //   }
  //   return true;
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  delete = (id) => {
    axios({
      method: "delete",
      url: `https://lifestyleblogs.herokuapp.com/user/post/${id}`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
    })
      .then((res) => {
        this.setState({
          alert: true,
        });
        this.getPosts();
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  render() {
    const post = this.state.post_details;

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        {!this.state.post_details_show ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              // padding: 20,
            }}>
            {this.state.posts.reverse().map((post, index) => {
              return (
                <Card
                  key={index}
                  style={{
                    //   minWidth: "20%",
                    //   maxWidth: "30%",
                    width: "30%",
                    marginBottom: 30,
                    height: "auto",
                    background: post.color,
                    marginLeft: 20,

                    boxShadow:
                      "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                  }}>
                  <CardBody>
                    <CardTitle tag='h5'>{post.title}</CardTitle>
                    <CardSubtitle tag='h6' className='mb-2 text-muted'>
                      {post.creator}
                      {post.color}
                    </CardSubtitle>
                    <CardText>{post.message}</CardText>
                    <Button onClick={() => this.createLike(post._id)}>
                      {post.likeCount} Likes
                    </Button>

                    <Button onClick={() => this.getSinglePostDetails(post._id)}>
                      Details
                    </Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card
            style={{
              //   minWidth: "20%",
              //   maxWidth: "30%",
              width: "100%",
              marginTop: 30,
              height: "auto",
              background: post.color,
              padding: 20,
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
            }}>
            {this.state.alert ? (
              <Alert color='success'>Deleted! refresh</Alert>
            ) : null}

            <CardBody>
              <Button
                color='info'
                onClick={() => this.setState({ edit: true })}>
                Edit
              </Button>

              <Button color='danger' onClick={() => this.delete(post._id)}>
                Delete
              </Button>
              <CardTitle tag='h5'>{post.title}</CardTitle>
              <CardSubtitle tag='h6' className='mb-2 text-muted'>
                {post.creator}
                {post.color}
              </CardSubtitle>
              <CardText>{post.message}</CardText>
              <Button onClick={() => this.createLike(post._id)}>
                {post.likeCount} Likes
              </Button>

              <Button
                onClick={() => this.setState({ post_details_show: false })}>
                CLose
              </Button>
            </CardBody>
            <InputGroup>
              <Input />
              <InputGroupAddon addonType='append'>
                <Button onClick={() => this.createComment(post._id)}>
                  Comment
                </Button>
              </InputGroupAddon>
            </InputGroup>

            <CardText>Comments</CardText>
            <CardText>{post.comment}</CardText>
          </Card>
        )}

        {this.state.edit ? (
          <div className='App'>
            <Container className='formContainer'>
              <h2>Create new post</h2>

              <Form className='form'>
                <Col>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input
                      type='text'
                      name='title'
                      onChange={this.handleChange}
                      id='title'
                      placeholder={post.title}
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
                      placeholder={post.creator}
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
                      placeholder={post.comment}
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
                      placeholder={post.color}
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
                      placeholder={post.tags}
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
                      placeholder={post.message}
                    />
                  </FormGroup>
                </Col>

                <Button onClick={() => this.editPosts(post._id)}>Update</Button>
              </Form>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}
