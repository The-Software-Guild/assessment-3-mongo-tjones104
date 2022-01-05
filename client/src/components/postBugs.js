import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

class PostBugs extends Component {
  constructor() {
    super();

    // System date and time
    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        today.getMonth().toString().padStart(1, "0") +
        1 +
        "-" +
        today.getDate().toString().padStart(2, "0"),
      time =
        today.getHours().toString().padStart(2, "0") +
        ":" +
        today.getMinutes().toString().padStart(2, "0");

    this.state = {
      title: "",
      description: "",
      time: time,
      date: date,
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
    const data = JSON.parse(localStorage.getItem("state"));
    const { title, description, time, date } = this.state;
    axios
      .post(
        "http://localhost:8080/api/bugs",
        { title, description, time, date },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((res) => {
        alert("Succuss: Item added");
        this.setState({ redirect: true });
      })
      .catch((error) => {
        alert("Error: Could not post");
      });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Navigate to="/getBugs" />;
    }
    return (
      <div className="post-item">
        <h2>Post a new Bug</h2>
        <form className="post-form" onSubmit={this.handleSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <label>Time:</label>
          <input type="time" name="time" value={this.state.time} disabled />
          <label>Date:</label>
          <input type="date" name="date" value={this.state.date} disabled />
          <button>Post Bug</button>
        </form>
      </div>
    );
  }
}

export default PostBugs;
