import React, { Component } from 'react';
import { Button, Navbar, NavItem, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import xpLogo from './xp-logo.png';
import './App.css';
import './Navbar.css';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

class Logo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      small: false
    }
    this._onPositionChange = this._onPositionChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this._onPositionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onPositionChange);
  }

  _onPositionChange(event) {
    console.log('On position change');
    if (window.scrollY >= 100) {
      console.log('setting small=true');
      this.setState({small: true});
    } else {
      console.log('setting small=false');
      this.setState({small: false});
    }
  }

  render () {
    return (
      <div>
        <img alt="XP 2017 logo" className={this.state.small ? 'logo small-logo' : 'logo large-logo'} src={xpLogo} />
      </div>
    )
  }
}

class Navigation extends Component {
  render () {
    return (
      <Navbar fixedTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Logo/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={{ pathname: '/about'}}>
              <NavItem eventKey="{1}">About</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/program'}}>
              <NavItem eventKey="{2}">Program</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/venue'}}>
              <NavItem eventKey="{3}">Venue</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/sponsors'}}>
              <NavItem eventKey="{4}">Sponsors</NavItem>
            </LinkContainer>
            <LinkContainer to={{ pathname: '/tickets'}}>
              <NavItem eventKey="{5}">Tickets</NavItem>
            </LinkContainer>
            <NavItem eventKey="{6}">
              <Button bsStyle="danger">Get your ticket</Button>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}


class Index extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Home</h2>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Index}>
          <IndexRoute component={Home} />
          <Route path="about" getComponent={(location, callback) => {
            require.ensure([], require => {
              callback(null, require('./About').default)
            }, 'About')
          }} />
          <Route path="program" getComponent={(location, callback) => {
            require.ensure([], require => {
              callback(null, require('./Program').default)
            }, 'Program')
          }} />
          <Route path="venue" getComponent={(location, callback) => {
            require.ensure([], require => {
              callback(null, require('./Venue').default)
            }, 'Venue')
          }} />
          <Route path="sponsors" getComponent={(location, callback) => {
            require.ensure([], require => {
              callback(null, require('./Sponsors').default)
            }, 'Sponsors')
          }} />
          <Route path="tickets" getComponent={(location, callback) => {
            require.ensure([], require => {
              callback(null, require('./Tickets').default)
            }, 'Tickets')
          }} />
        </Route>
      </Router>
    );
  }
}


export default App;
