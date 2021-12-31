import { useParams, useLocation } from "react-router-dom";

const withRouter = (WrappedComponent) => (props) => {
  const params = useParams();
  const search = useLocation().search;

  return <WrappedComponent {...props} params={params} search={search} />;
};

export default withRouter;
