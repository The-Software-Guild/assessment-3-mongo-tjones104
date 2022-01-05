import React, { Component } from "react";
import axios from "axios";

class DeleteBugs extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("state"));
    axios
      .delete(`http://localhost:8080/api/bugs/${this.props.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Succuss: Item deleted");
          this.props.submit(e);
        } else {
          alert("Error: This Id was not found");
        }
      })
      .catch((error) => {
        alert("Error: Could not delete");
      });
  };

  render() {
    return (
      <button className="red-button" onClick={this.handleSubmit}>
        Delete
      </button>
    );
  }
}

export default DeleteBugs;
