import React, { Component } from "react";
import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Register from "./Register";
import Card from "./Card";
import PostCreate from "./PostCreate";
import { Container, Row } from "reactstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      form: false,
    };
  }

  createPost = () => {
    this.setState({
      form: !this.state.form,
    });
  };
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Register} />
            <Route exact strict path='/login/' component={Login} />

            <Route path='/user/post'>
              <Header createPost={this.createPost} />
              <Container>
                {this.state.form ? (
                  <Row>
                    <PostCreate createPost={this.createPost} />
                  </Row>
                ) : (
                  <Row>
                    <Card />
                  </Row>
                )}
              </Container>
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
