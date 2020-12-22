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
} from "reactstrap";
import axios from "axios";

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      post_details: [],
      post_details_show: false,
    };
  }
  getPosts = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/user/post`,
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

  componentDidMount() {
    this.getPosts();
  }

  createLike = (id) => {
    axios({
      method: "patch",
      url: `http://localhost:8000/user/post/like/${id}`,
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
      url: `http://localhost:8000/user/post/comment/${id}`,
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
      url: `http://localhost:8000/user/post/${id}`,
      //   headers: {
      //     Authorization: `Bearer ${this.props.getUserData.data.token}`,
      //   },
    })
      .then((res) => {
        this.setState({
          post_details: res.data,
          post_details_show: true,
        });
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
      </div>
    );
  }
}
