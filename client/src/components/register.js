import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
      email: "",
      admin: false,
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
    let { name, password, email, admin } = this.state;
    axios
      .post("http://localhost:8080/api/users", { name, password, email, admin })
      .then((res) => {
        alert("Succuss: User Registered, redirecting to Login");
        this.setState({ redirect: true });
      })
      .catch((error) => {
        alert("Error: Could not register");
      });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="post-item">
        <h2>Register</h2>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Bob"
            value={this.state.name}
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
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="bob@gmail.com"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <label>Admin:</label>
          <select
            value={this.state.admin}
            name="admin"
            onChange={this.handleChange}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
