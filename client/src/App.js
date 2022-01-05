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
    token: "",
  };

  componentDidMount() {
    if (!localStorage.getItem("state")) {
      localStorage.setItem("state", JSON.stringify(this.state));
    }

    const data = JSON.parse(localStorage.getItem("state"));
    if (data.token !== "") {
      this.setState({ token: data.token });
    }
  }
  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  handleToken = (data) => {
    this.setState({ token: data });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar token={this.state.token} handleToken={this.handleToken} />
          <div className="main">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/GetBugs" element={<GetBugs />}>
                <Route path=":id" element={<GetBugs />}></Route>
              </Route>
              <Route path="/PostBugs" element={<PostBugs />}></Route>
              <Route
                path="/Login"
                element={<Login handleToken={this.handleToken} />}
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
