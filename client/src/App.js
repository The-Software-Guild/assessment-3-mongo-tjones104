import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./components/home";
import GetBugs from "./components/getBugs";
import PostBugs from "./components/postBugs";
import Register from "./components/register";
import Login from "./components/login";
import UnknownPage from "./components/UnknownPage";
import { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    LoggedIn: false,
    user: {},
  };

  componentDidMount() {
    if (!localStorage.getItem("state")) {
      localStorage.setItem("state", JSON.stringify(this.state));
    }

    const data = JSON.parse(localStorage.getItem("state"));
    if (data.LoggedIn === true) {
      this.setState({ LoggedIn: data.LoggedIn, user: data.user });
    }
  }
  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

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
              <Route path="/GetBugs" element={<GetBugs />}>
                <Route path=":id" element={<GetBugs />}></Route>
              </Route>
              <Route
                path="/PostBugs"
                element={<PostBugs user={this.state.user} />}
              ></Route>
              <Route
                path="/Login"
                element={<Login login={this.login} user={this.handleUser} />}
              ></Route>
              <Route path="/Register" element={<Register />}></Route>
              <Route
                path="*"
                element={<UnknownPage state={this.state} />}
              ></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
