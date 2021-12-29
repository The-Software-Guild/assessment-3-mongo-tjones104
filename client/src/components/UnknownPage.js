import { Link } from "react-router-dom";

const UnknownPage = () => {
  return (
    <div className="not-found">
      <h2>Sorry...</h2>
      <h2>That page cannot be found</h2>
      <Link to="/">Click here to go back home</Link>
    </div>
  );
};

export default UnknownPage;
