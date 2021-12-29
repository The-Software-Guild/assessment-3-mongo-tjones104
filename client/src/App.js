import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import GetBugs from "./components/getBugs";
import PostBugs from "./components/postBugs";
import Register from "./components/register";
import Login from "./components/login";
import UnknownPage from "./components/UnknownPage";
import "./App.css";
import { Component } from "react";

class App extends Component {
  state = {
    LoggedIn: false,
    user: {},
  };

  login = () => {
    if (this.state.LoggedIn === false) {
      this.setState({ LoggedIn: true });
    } else {
      this.setState({ LoggedIn: false });
    }
  };

  handleUser = (data) => {
    this.setState({ user: data });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar
            LoggedIn={this.state.LoggedIn}
            user={this.handleUser}
            login={this.login}
          />
          <div className="main">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home state={this.state} />}
              ></Route>
              <Route path="/GetBugs" element={<GetBugs />}></Route>
              <Route
                path="/PostBugs"
                element={<PostBugs user={this.state.user} />}
              ></Route>
              <Route
                path="/Login"
                element={<Login login={this.login} user={this.handleUser} />}
              ></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route path="*" element={<UnknownPage />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
