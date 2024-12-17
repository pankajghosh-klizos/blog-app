import { Container } from "../components";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Container>
      <div className="py-5">
        <h1 className="display-1 fw-semibold mb-5 lh-1 playfair">
          404 <span className="d-block lh-1">{error.statusText}</span>
        </h1>
        <button
          type="button"
          className="btn btn-primary btn-lg rounded-pill bg-dark border-0 px-5"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </Container>
  );
};

export default ErrorPage;
