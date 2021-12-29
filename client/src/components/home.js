const Home = (props) => {
  return props.state.LoggedIn ? (
    <div className="home">
      <h1>Welcome to the Bug Tracker!</h1>
      <h2>Currently logged in: {props.state.user.name}</h2>
      <h2>To see get started, click on the links above!</h2>
    </div>
  ) : (
    <div className="home">
      <h1>Welcome to the Bug Tracker!</h1>
      <h2>To see get started, go login or register</h2>
    </div>
  );
};
export default Home;
