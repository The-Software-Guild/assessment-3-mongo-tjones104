import axios from "axios";
import React, { Component } from "react";

class PutBugs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      description: props.description,
      time: props.time,
      date: props.date,
      assignee: props.assignee,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/bugsIntake/${this.props.id}`, this.state)
      .then((res) => {
        if (res.status === 201) {
          alert("Succuss: Item updated");
          this.props.onClose();
          this.props.submit(e);
        } else {
          alert("Error: This Id was not found");
        }
      })
      .catch((error) => {
        alert("Error: Could not update");
      });
  };

  render() {
    return (
      <div className="put-item">
        <div>
          <h2>Update a Bug</h2>
          <form onSubmit={this.handleSubmit}>
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
            <input
              type="time"
              name="time"
              value={this.state.time}
              onChange={this.handleChange}
              required
            />
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              required
            />
            <label>Assignee:</label>
            <input
              type="text"
              name="assignee"
              value={this.state.assignee}
              onChange={this.handleChange}
              required
            />
            <button>Submit Edit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PutBugs;
