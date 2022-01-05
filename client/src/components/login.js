import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
      .post("http://localhost:8080/api/login", { email, password })
      .then((res) => {
        const token = res.data.token;
        alert("Success: User Logged in, redirecting to home");
        this.props.handleToken(token);
        this.setState({ redirect: true });
      })
      .catch((error) => {
        alert("Error: Invalid email and password combo");
      });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to="/" />;
    }
    return (
      <div className="post-item">
        <h2>Login</h2>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="bob@gmail.com"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <label>Password:</label>
          <input
            type="text"
            name="password"
            placeholder="*******"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
