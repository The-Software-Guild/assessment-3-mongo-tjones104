import React, { Component } from "react";
import axios from "axios";
import DeleteBugs from "./deleteBugs";
import PutBugs from "./putBugs";
import Modal from "./modal";
import withRouter from "./withRouter";

class GetBugs extends Component {
  constructor() {
    super();
    let today = new Date(),
      date =
        today.getFullYear() +
        "-" +
        today.getMonth().toString().padStart(1, "0") +
        1 +
        "-" +
        (today.getDate() - 3).toString().padStart(2, "0"),
      time =
        today.getHours().toString().padStart(2, "0") +
        ":" +
        today.getMinutes().toString().padStart(2, "0");

    this.state = {
      bugs: [],
      searchQuery: "",
      searchBy: "_id",
      ToggleModal: false,
      deadlineDate: date,
      deadlineTime: time,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleReset(e) {
    e.preventDefault();
    this.componentDidMount();
    this.setState({ searchQuery: "" });
  }

  handleToggle(id) {
    if (this.state.ToggleModal === true) {
      this.setState({ ToggleModal: { [id]: false } });
    } else {
      this.setState({ ToggleModal: { [id]: true } });
    }
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("state"));
    if (this.props.params.id) {
      axios
        .get("http://localhost:8080/api/bugs/" + this.props.params.id, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((res) => {
          const bugs = [];
          bugs.push(res.data);
          this.setState({ bugs });
        })
        .catch((error) => {
          alert("Error: Could not fetch");
        });
    } else if (this.props.search) {
      axios
        .get("http://localhost:8080/api/bugs" + this.props.search, {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((res) => {
          const bugs = res.data;
          this.setState({ bugs });
        })
        .catch((error) => {
          alert("Error: Could not fetch query");
        });
    } else {
      axios
        .get("http://localhost:8080/api/bugs", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
        .then((res) => {
          const bugs = res.data;
          this.setState({ bugs });
        })
        .catch((error) => {
          alert("Error: Could not fetch");
        });
    }
  }

  handleSubmit = (e) => {
    const data = JSON.parse(localStorage.getItem("state"));
    e.preventDefault();
    axios
      .get(
        "http://localhost:8080/api/bugs?" +
          this.state.searchBy +
          "=" +
          this.state.searchQuery,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((res) => {
        const bugs = res.data;
        this.setState({ bugs });
      })
      .catch((error) => {
        alert("Error: Could not fetch query");
      });
  };

  render() {
    return (
      <div className="get-list">
        <h2>Bug List</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div className="search-title">
              <label>Search by:</label>
              <select
                className="search-by"
                value={this.state.searchBy}
                name="searchBy"
                onChange={this.handleChange}
              >
                <option value="_id">Id</option>
                <option value="title">Title</option>
                <option value="description">Description</option>
                <option value="time">Time</option>
                <option value="date">Date</option>
                <option value="assignee">Assignee</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                placeholder="Ex: Bug 1, Bob"
                name="searchQuery"
                value={this.state.searchQuery}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <button className="search-button">Search</button>
              <button className="red-button" onClick={this.handleReset}>
                Reset
              </button>
            </div>
          </div>
        </form>
        <table className="show-list">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
              <th>Date</th>
              <th>Assignee</th>
              <th>Id</th>
              <th>Days Left</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bugs.map((items) => (
              <tr
                style={
                  items.date < this.state.deadlineDate ||
                  (items.date === this.state.deadlineDate &&
                    items.time < this.state.deadlineTime)
                    ? { backgroundColor: "rgba(255, 38, 0, 0.301)" }
                    : {}
                }
                key={items._id}
              >
                <td className="name">{items.title}</td>
                <td>{items.description}</td>
                <td>{items.time}</td>
                <td>{items.date}</td>
                <td>{items.assignee.name}</td>
                <td>{items._id}</td>
                {items.date.slice(0, 4) !== "2022" ? (
                  <td>
                    {items.date.slice(8, 10) -
                      31 -
                      this.state.deadlineDate.slice(8, 10)}
                  </td>
                ) : (
                  <td>
                    {items.date.slice(8, 10) -
                      this.state.deadlineDate.slice(8, 10)}
                  </td>
                )}
                <td>
                  <button
                    className="edit-button"
                    onClick={this.handleToggle.bind(this, items._id)}
                  >
                    Edit
                  </button>
                  <Modal
                    open={this.state.ToggleModal[items._id]}
                    onClose={this.handleToggle}
                  >
                    <PutBugs
                      onClose={this.handleToggle}
                      submit={this.handleReset}
                      id={items._id}
                      title={items.title}
                      description={items.description}
                      time={items.time}
                      date={items.date}
                      assignee={items.assignee}
                    />
                  </Modal>
                </td>
                <td>
                  <DeleteBugs submit={this.handleReset} id={items._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.bugs.length === 0 ? (
          <p className="noItems">No bugs found</p>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default withRouter(GetBugs);
