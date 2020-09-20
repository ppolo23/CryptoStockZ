import React, { Component } from "react";
import { Navbar, Nav, Button} from 'react-bootstrap';
import { withCookies } from 'react-cookie';

import SignInPopUp from '../Login/SignInPopUp';

class NavBar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      token: undefined,
      username: undefined
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    this.setState(
      {
        token: cookies.get('x-access-token'),
        username: cookies.get('username')
      }
    );
    console.log(cookies)
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  logout(){
    const { cookies } = this.props;
    cookies.remove('x-access-token');
    cookies.remove('username');
    cookies.remove('roles');
    window.location = "/home";
  }

  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="/home">CryptoStockZ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            {this.state.token !== undefined ? (
              <React.Fragment>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/products">Catalogue</Nav.Link>
                <Nav.Link href="/search">Search</Nav.Link>
              </React.Fragment>
            ) : null}
          </Nav>
          {this.state.token === undefined ? (
            <React.Fragment>
              <Button variant="outline-info" onClick={this.togglePopup.bind(this)}>Login</Button>
              {this.state.showPopup ? <SignInPopUp /> : null}
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Navbar.Brand>Hi, {this.state.username} !</Navbar.Brand>
                <Button variant="outline-info" onClick={this.logout.bind(this)}>Logout</Button>
              </React.Fragment>
            )}

        </Navbar.Collapse>
      </Navbar>
    );

  }
}

export default withCookies(NavBar);

/*closePopup={this.togglePopup.bind(this)} */