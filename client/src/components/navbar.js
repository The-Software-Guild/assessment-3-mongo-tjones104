import { Link } from "react-router-dom";

const Navbar = (props) => {
  return props.LoggedIn ? (
    <nav className="navbar">
      <Link to="/">
        <h1>Bug Tracker</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/getBugs">Bugs List</Link>
        <Link to="/postBugs">Post Bug</Link>
        <Link to="/" onClick={() => props.login().then(props.user({}))}>
          Logout
        </Link>
      </div>
    </nav>
  ) : (
    <nav className="navbar">
      <Link to="/">
        <h1>Bug Tracker</h1>
      </Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
